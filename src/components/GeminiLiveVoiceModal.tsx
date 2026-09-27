import { useState, useRef, useEffect } from 'react';
import { X, Mic, MicOff, Radio, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { PORTFOLIO_ASSETS } from '../data/portfolioData';

interface GeminiLiveVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GeminiLiveVoiceModal({ isOpen, onClose }: GeminiLiveVoiceModalProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  const pcmToBase64 = (channelData: Float32Array): string => {
    const l = channelData.length;
    const arrayBuffer = new ArrayBuffer(l * 2);
    const view = new DataView(arrayBuffer);
    for (let i = 0; i < l; i++) {
      let s = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const playAudioChunk = (audioCtx: AudioContext, base64Audio: string) => {
    try {
      if (audioCtx.state === 'closed') return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }

      const binary = atob(base64Audio);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
      }

      const audioBuffer = audioCtx.createBuffer(1, float32Array.length, 24000);
      audioBuffer.getChannelData(0).set(float32Array);

      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();

      setIsSpeaking(true);
      source.onended = () => {
        setIsSpeaking(false);
      };
    } catch (err) {
      console.error('Audio playback error:', err);
    }
  };

  const startSession = async () => {
    stopSession();
    setErrorMessage(null);
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      const inputAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = inputAudioCtx;
      outputAudioContextRef.current = outputAudioCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      ws.onopen = () => {
        setIsConnected(true);
        if (inputAudioCtx.state === 'closed') return;
        const source = inputAudioCtx.createMediaStreamSource(stream);
        const processor = inputAudioCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;
        source.connect(processor);
        processor.connect(inputAudioCtx.destination);

        processor.onaudioprocess = (e) => {
          if (ws.readyState === WebSocket.OPEN) {
            const base64 = pcmToBase64(e.inputBuffer.getChannelData(0));
            ws.send(JSON.stringify({ audio: base64 }));
          }
        };
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.audio && outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
            playAudioChunk(outputAudioContextRef.current, msg.audio);
          }
          if (msg.error) {
            setErrorMessage(msg.error);
          }
        } catch (e) {
          console.error('WS parse error:', e);
        }
      };

      ws.onerror = (err) => {
        console.error('WS Error:', err);
        setErrorMessage('Failed to connect to Live API session');
        stopSession();
      };

      ws.onclose = () => {
        setIsConnected(false);
      };
    } catch (err: any) {
      setErrorMessage(err.message || 'Microphone access required for Live conversation');
      stopSession();
    }
  };

  const stopSession = () => {
    if (processorRef.current) {
      try {
        processorRef.current.disconnect();
        processorRef.current.onaudioprocess = null;
      } catch {
        // ignore
      }
      processorRef.current = null;
    }

    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach((t) => {
          try {
            t.stop();
          } catch {
            // ignore
          }
        });
      } catch {
        // ignore
      }
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
      const ctx = audioContextRef.current;
      audioContextRef.current = null;
      if (ctx.state !== 'closed') {
        try {
          ctx.close().catch(() => {});
        } catch {
          // ignore
        }
      }
    }

    if (outputAudioContextRef.current) {
      const ctx = outputAudioContextRef.current;
      outputAudioContextRef.current = null;
      if (ctx.state !== 'closed') {
        try {
          ctx.close().catch(() => {});
        } catch {
          // ignore
        }
      }
    }

    if (wsRef.current) {
      const ws = wsRef.current;
      wsRef.current = null;
      try {
        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
          ws.close();
        }
      } catch {
        // ignore
      }
    }

    setIsConnected(false);
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (!isOpen) {
      stopSession();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
      onClick={() => {
        stopSession();
        onClose();
      }}
    >
      <div
        className="glass-card rounded-[36px] p-6 sm:p-10 max-w-md w-full bg-white relative shadow-2xl flex flex-col items-center text-center border border-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            stopSession();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Live Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase mb-4">
          <Radio className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          <span>REAL-TIME VOICE CONVERSATION</span>
        </div>

        <h3 className="text-xl font-bold text-[#0f172a] mb-1">
          Gemini 3.8 Live API
        </h3>
        <p className="text-xs text-slate-500 mb-8 max-w-xs">
          Speak naturally into your microphone and receive real-time, low-latency vocal responses.
        </p>

        {/* Central Audio Orb Visualizer */}
        <div className="relative w-40 h-40 flex items-center justify-center mb-8">
          {/* Animated glow rings */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              isSpeaking
                ? 'bg-purple-200/60 animate-ping'
                : isConnected
                ? 'bg-indigo-100/80 animate-pulse'
                : 'bg-slate-100'
            }`}
          />
          <div
            className={`absolute inset-3 rounded-full transition-all duration-300 ${
              isSpeaking
                ? 'bg-gradient-to-tr from-purple-500 to-indigo-600 shadow-xl'
                : isConnected
                ? 'bg-gradient-to-tr from-indigo-500 to-sky-400 shadow-md'
                : 'bg-slate-200'
            }`}
          />

          <div className="relative z-10 text-white flex flex-col items-center">
            {isConnected ? (
              isSpeaking ? (
                <Volume2 className="w-10 h-10 animate-bounce" />
              ) : (
                <Mic className="w-10 h-10 animate-pulse" />
              )
            ) : (
              <MicOff className="w-10 h-10 text-slate-400" />
            )}
          </div>
        </div>

        {/* Status indicator */}
        <div className="mb-6 font-mono text-xs">
          {isConnected ? (
            <span className="text-emerald-600 font-semibold flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              {isSpeaking ? 'Model Speaking (24kHz Live)' : 'Listening for your voice...'}
            </span>
          ) : (
            <span className="text-slate-400">Microphone session inactive</span>
          )}
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2 border border-rose-100">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Button */}
        {isConnected ? (
          <button
            onClick={stopSession}
            className="w-full py-3 px-6 rounded-full text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm"
          >
            End Voice Call
          </button>
        ) : (
          <button
            onClick={startSession}
            className="w-full py-3 px-6 rounded-full text-xs font-semibold text-white bg-[#0f172a] hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/10 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Start Live Conversation</span>
          </button>
        )}
      </div>
    </div>
  );
}
