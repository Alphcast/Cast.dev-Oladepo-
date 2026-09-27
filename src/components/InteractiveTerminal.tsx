import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCvModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
}

export function InteractiveTerminal({
  isOpen,
  onClose,
  onOpenCvModal,
  onScrollToSection
}: InteractiveTerminalProps) {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'init',
      output: (
        <div className="space-y-1">
          <p className="text-cyan-400 font-bold">ROKEEB-OS CLI v2026.1 (x86_64-alphcast)</p>
          <p className="text-slate-400">Welcome to the interactive engineering console for Oladepo Rokeeb Olayinka.</p>
          <p className="text-slate-500">Type <span className="text-amber-400 font-bold">'help'</span> for available commands, or <span className="text-cyan-300 font-bold">'whoami'</span> to identify.</p>
        </div>
      ),
      timestamp: '00:00:01'
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  const handleCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    if (!raw) return;

    setCommandHistory(prev => [...prev, raw]);
    setHistoryIndex(-1);

    const parts = raw.toLowerCase().split(' ');
    const cmd = parts[0];
    const time = new Date().toLocaleTimeString();

    let output: React.ReactNode;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-amber-400 font-semibold mb-1">Available System Commands:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs">
              <div><span className="text-cyan-400">whoami</span> - Developer profile</div>
              <div><span className="text-cyan-400">role</span> - Professional title</div>
              <div><span className="text-cyan-400">skills</span> - Technical capabilities</div>
              <div><span className="text-cyan-400">projects</span> - View selected works</div>
              <div><span className="text-cyan-400">cbt</span> - Education testing suite</div>
              <div><span className="text-cyan-400">ai</span> - AI engineering stacks</div>
              <div><span className="text-cyan-400">github</span> - Live GitHub stats</div>
              <div><span className="text-cyan-400">resume</span> - Open full CV</div>
              <div><span className="text-cyan-400">contact</span> - Jump to contact form</div>
              <div><span className="text-cyan-400">clear</span> - Clear terminal</div>
              <div><span className="text-cyan-400">exit</span> - Close terminal</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="text-slate-200 space-y-1">
            <p><span className="text-cyan-400 font-bold">{PORTFOLIO_CONFIG.name}</span></p>
            <p className="text-slate-400 text-xs">Mathematics Graduate & Senior Full-Stack Software Engineer</p>
            <p className="text-slate-400 text-xs">GitHub: @{PORTFOLIO_CONFIG.githubUsername} · Location: {PORTFOLIO_CONFIG.location}</p>
            <p className="text-emerald-400 text-xs">{PORTFOLIO_CONFIG.availabilityBadge}</p>
          </div>
        );
        break;

      case 'role':
        output = (
          <div className="text-slate-200">
            <p className="font-semibold text-cyan-300">{PORTFOLIO_CONFIG.primaryTitle}</p>
            <p className="text-xs text-slate-400 mt-1">{PORTFOLIO_CONFIG.supportingStatement}</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-cyan-400 font-bold">Core Technical Stack:</p>
            <p><strong className="text-white">Frontend:</strong> React, Next.js, TypeScript, Tailwind CSS, TanStack, Three.js</p>
            <p><strong className="text-white">Backend:</strong> Node.js, Express, PHP, REST APIs, Webhooks, HMAC Auth</p>
            <p><strong className="text-white">Databases:</strong> PostgreSQL, MongoDB, Supabase, Firebase</p>
            <p><strong className="text-white">AI:</strong> Gemini API, LLM Agents, SSE Streaming, Prompt Engineering</p>
            <p><strong className="text-white">DevOps:</strong> Docker, GitHub Actions, CI/CD, Production Telemetry</p>
          </div>
        );
        break;

      case 'projects':
        onScrollToSection('projects');
        output = (
          <div className="text-xs text-slate-300">
            <p className="text-cyan-400 font-bold">Navigating to Featured Projects...</p>
            <p>86+ Public repositories active on GitHub.</p>
          </div>
        );
        break;

      case 'cbt':
        onScrollToSection('projects');
        output = (
          <div className="text-xs text-slate-300 space-y-1">
            <p className="text-cyan-400 font-bold">Smart Computer-Based Testing (CBT) Suite:</p>
            <p>Repositories: CBT-MASTER-AI, CBT-MASTER-</p>
            <p>Features: Biometric face capture proctoring, randomized question shuffle, real-time grading, anti-cheat detection.</p>
          </div>
        );
        break;

      case 'ai':
        onScrollToSection('ai-engineering');
        output = (
          <div className="text-xs text-slate-300 space-y-1">
            <p className="text-cyan-400 font-bold">AI Engineering Systems:</p>
            <p>• LLM Arena & Comparative Benchmarking (llm-arena-main)</p>
            <p>• AI Creative Studio (Commercial Advert Generation)</p>
            <p>• Automated Customer Assistants & Autonomous Tool-calling Agents</p>
          </div>
        );
        break;

      case 'github':
        output = (
          <div className="text-xs text-slate-300 space-y-1">
            <p className="text-cyan-400 font-bold">GitHub Sync Status:</p>
            <p>Profile: https://github.com/{PORTFOLIO_CONFIG.githubUsername}</p>
            <p>Status: 86+ Public Repositories, 1,000+ Contributions, Verified Public Codebases.</p>
          </div>
        );
        break;

      case 'resume':
      case 'cv':
        onOpenCvModal();
        output = <p className="text-xs text-emerald-400">Opening ATS-friendly Curriculum Vitae modal...</p>;
        break;

      case 'contact':
        onScrollToSection('contact');
        output = (
          <div className="text-xs text-slate-300">
            <p className="text-cyan-400 font-bold">Jumping to Contact & Inquiries...</p>
            <p>Direct Email: {PORTFOLIO_CONFIG.email}</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        output = (
          <p className="text-xs text-rose-400">
            Command not recognized: '{raw}'. Type <span className="underline font-bold text-amber-400">help</span> for a list of commands.
          </p>
        );
        break;
    }

    setHistory(prev => [...prev, { command: raw, output, timestamp: time }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl h-[560px] bg-[#0c1017] border border-slate-700/80 rounded-xl shadow-2xl flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose}></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            <span className="text-xs font-mono text-slate-300 font-semibold ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>alphcast@terminal: ~ (interactive shell)</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            aria-label="Close Terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div
          className="flex-1 p-4 overflow-y-auto font-mono text-xs sm:text-sm space-y-3 bg-[#080b10] text-slate-200"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <span className="text-slate-500">[{item.timestamp}]</span>
                <span>alphcast:~$</span>
                <span className="text-white">{item.command}</span>
              </div>
              <div className="pl-4 text-slate-300 leading-relaxed">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Row */}
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-t border-slate-800 font-mono text-xs sm:text-sm">
          <span className="text-cyan-400 font-bold whitespace-nowrap">alphcast:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600"
            autoFocus
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="p-1 text-slate-400 hover:text-cyan-400"
            title="Execute"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
