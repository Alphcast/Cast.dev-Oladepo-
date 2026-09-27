import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Mic, MicOff, RefreshCw, Copy, Check, Terminal, Cpu } from 'lucide-react';

interface GeminiChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
  onOpenLiveVoice?: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  timestamp: string;
}

export function GeminiChatbotModal({ isOpen, onClose, initialMessage, onOpenLiveVoice }: GeminiChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I am Oladepo's AI Technical Assistant and Senior Solutions Architect. Ask me anything about his 86+ GitHub projects, CBT biometric examination platform, full-stack architecture, AI agent workflows, or technical consulting.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: 'gemini-3.8-flash',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.8-flash' | 'gemini-3.1-flash-lite'>('gemini-3.8-flash');
  const [selectedRole, setSelectedRole] = useState<string>('architect');
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const roles: Record<string, { name: string; instruction: string }> = {
    architect: {
      name: 'Senior Architect',
      instruction:
        "You are Oladepo Rokeeb Olayinka's AI Technical Assistant and Senior Software Engineering Consultant. You have deep expertise in full-stack architecture (React, Next.js, Node.js, PostgreSQL), computer-based testing (CBT) systems with biometric face capturing, LLM orchestration, and AI video creation. Answer questions about Oladepo's engineering background, projects, system architectures, or solve technical problems with clarity, precision, and code examples when appropriate.",
    },
    cbt: {
      name: 'CBT Proctor Specialist',
      instruction:
        "You are the specialist architect for Oladepo's Smart Computer-Based Testing (CBT) Suite. Focus on biometric face verification, WebRTC proctoring, synchronized exam timers, anti-cheat detection, and high-concurrency exam submissions.",
    },
    video: {
      name: 'AI Video Director',
      instruction:
        "You are Oladepo's AI Creative Studio Director. Discuss commercial AI video generation, prompt engineering for Runway and Veo, 3D product commercials, aspect ratio framing (16:9 vs 9:16), and video retention tactics.",
    },
    coder: {
      name: 'Principal Coder',
      instruction:
        "You are a Principal Software Engineer with 30 years of computational experience. Provide mathematically rigorous, elegant, and performance-optimized code in TypeScript, Node.js, and SQL.",
    },
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          systemInstruction: roles[selectedRole].instruction,
          model: selectedModel,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Server error');
      }

      const data = await res.json();
      const botMsg: Message = {
        role: 'assistant',
        content: data.text || 'No response generated.',
        model: data.model || selectedModel,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Unable to complete request: ${err.message}. Please check your connection or try again.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Audio Transcription with gemini-3.5-transcribe
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Data = (reader.result as string).split(',')[1];
          if (!base64Data) return;

          setIsTranscribing(true);
          try {
            const res = await fetch('/api/gemini/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                audioBase64: base64Data,
                mimeType: 'audio/webm',
              }),
            });
            if (res.ok) {
              const data = await res.json();
              if (data.transcription) {
                setInput((prev) => (prev ? `${prev} ${data.transcription}` : data.transcription));
              }
            }
          } catch (err) {
            console.error('Transcription error:', err);
          } finally {
            setIsTranscribing(false);
          }
        };

        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access denied:', err);
      alert('Microphone access is required to transcribe audio.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl h-[88vh] glass-card rounded-[32px] shadow-2xl flex flex-col overflow-hidden text-left bg-white border border-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#0f172a]">
                  Oladepo AI Technical Assistant
                </h3>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Powered by Gemini multi-turn reasoning with audio transcription
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenLiveVoice && (
              <button
                onClick={() => {
                  onClose();
                  onOpenLiveVoice();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                title="Start real-time two-way voice with Gemini Live"
              >
                <Mic className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                <span>Live Voice</span>
              </button>
            )}

            <button
              onClick={() => {
                setMessages([
                  {
                    role: 'assistant',
                    content: 'Chat session reset. What technical challenge or architectural topic shall we explore?',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    model: selectedModel,
                  },
                ]);
              }}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              title="Reset Conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Model & Persona Selection Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Persona selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-slate-400 text-[11px] font-medium mr-1">Role:</span>
            {Object.entries(roles).map(([key, role]) => (
              <button
                key={key}
                onClick={() => setSelectedRole(key)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors ${
                  selectedRole === key
                    ? 'bg-[#0f172a] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {role.name}
              </button>
            ))}
          </div>

          {/* Model selector matching specification */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-medium">Model:</span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as any)}
              className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-semibold text-indigo-700 focus:outline-none cursor-pointer"
            >
              <option value="gemini-3.8-flash">gemini-3.8-flash (Standard & Recommended)</option>
              <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Ultra Low Latency)</option>
            </select>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#f8f9fe]">
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={index}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-[#0f172a] text-white shadow-xs'
                      : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xs'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="flex flex-col">
                  <div
                    className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed relative group ${
                      isUser
                        ? 'bg-[#0f172a] text-white rounded-tr-xs shadow-xs'
                        : 'bg-white text-slate-800 rounded-tl-xs border border-slate-100 shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    {!isUser && (
                      <button
                        onClick={() => copyToClipboard(msg.content, index)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-800 rounded-md transition-opacity"
                        title="Copy message"
                      >
                        {copiedIndex === index ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>

                  <div className={`flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 px-1 font-mono ${isUser ? 'justify-end' : ''}`}>
                    <span>{msg.timestamp}</span>
                    {msg.model && <span>· {msg.model}</span>}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-xs p-4 border border-slate-100 shadow-sm flex items-center gap-2 text-xs text-slate-500">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></div>
                <span>Reasoning with {selectedModel}...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar with Audio Transcription Microphone */}
        <div className="p-4 bg-white border-t border-slate-100">
          {isTranscribing && (
            <div className="flex items-center gap-2 mb-2 text-xs text-indigo-600 font-medium">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
              <span>Transcribing audio with gemini-3.5-transcribe...</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Microphone transcription button */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-3 rounded-full transition-all ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title={isRecording ? 'Stop Recording' : 'Speak to Transcribe (gemini-3.5-transcribe)'}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isRecording ? 'Listening... click mic to stop and transcribe' : 'Ask about architecture, CBT, AI, or full-stack code...'}
              className="flex-1 px-4 py-3 rounded-full glass-input text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />

            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="px-5 py-3 rounded-full text-xs font-semibold text-white bg-[#0f172a] hover:bg-slate-800 disabled:opacity-40 transition-all flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
