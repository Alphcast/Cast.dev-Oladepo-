import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Monitor,
  Wifi,
  Battery,
  Sparkles,
  FolderGit2,
  Bot,
  Video,
  MessageSquare,
  ArrowUpRight,
  ExternalLink,
  Star,
  GitFork,
  Send,
  Download,
  Award,
  Code
} from 'lucide-react';
import { PORTFOLIO_CONFIG, PORTFOLIO_ASSETS, CASE_STUDIES } from '../data/portfolioData';
import { GitHubUserProfile, GitHubRepo } from '../hooks/useGitHubData';

interface MobileAppSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  profile: GitHubUserProfile;
  repositories: GitHubRepo[];
  onOpenCvModal: () => void;
  onOpenLiveVoice: () => void;
}

export function MobileAppSimulator({
  isOpen,
  onClose,
  profile,
  repositories,
  onOpenCvModal,
  onOpenLiveVoice,
}: MobileAppSimulatorProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'ai' | 'studio' | 'contact'>('home');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: "Hey! I'm Oladepo's Mobile AI Assistant. Ask me about his CBT Proctoring architecture, 86+ GitHub projects, or hire him for your next product!",
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendChat = async () => {
    if (!chatInput.trim() || isAiLoading) return;
    const userText = chatInput.trim();
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userText }],
          model: 'gemini-3.8-flash',
        }),
      });
      const data = await res.json();
      setChatMessages((prev) => [...prev, { role: 'assistant', text: data.text || 'Oladepo is ready to build your product!' }]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Oladepo Rokeeb Olayinka specializes in high-scale web platforms, CBT proctoring engines, and AI agents. Feel free to contact him via WhatsApp or email!',
        },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative flex flex-col items-center max-w-full">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between w-full max-w-[390px] mb-3 px-2 text-white">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold tracking-wide">CAST DEV Mobile OS</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">PWA</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Return to Desktop Web App"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Realistic Mobile Device Frame (iPhone 16 Pro Dimensions) */}
        <div className="relative w-[340px] sm:w-[380px] h-[690px] sm:h-[720px] bg-black rounded-[52px] p-3 shadow-2xl border-[4px] border-slate-700/80 ring-1 ring-white/20 flex flex-col overflow-hidden">
          
          {/* Hardware Glass Inner Display */}
          <div className="relative w-full h-full bg-[#f8f9fe] rounded-[44px] overflow-hidden flex flex-col">
            
            {/* iOS Dynamic Island & Status Bar */}
            <div className="pt-2.5 px-6 pb-2 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-200/50 z-30 select-none">
              <span className="text-xs font-semibold text-slate-800">9:41</span>
              {/* Dynamic Island Pill */}
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-1.5 px-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[8px] font-mono text-white/90">CAST DEV</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Wifi className="w-3 h-3" />
                <span className="text-[10px] font-bold">5G</span>
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Mobile Push Notification Banner */}
            <div className="mx-3 mt-2 p-2.5 rounded-2xl bg-slate-900 text-white shadow-md flex items-center justify-between gap-2 z-20 animate-fade-in border border-white/10">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-xl overflow-hidden shrink-0 bg-indigo-600">
                  <img src="/GOOD.png" alt="Oladepo" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold truncate">Oladepo Rokeeb Olayinka</div>
                  <div className="text-[9px] text-slate-300 truncate">Available for new opportunities</div>
                </div>
              </div>
              <button
                onClick={onOpenCvModal}
                className="shrink-0 px-2.5 py-1 rounded-full bg-indigo-600 hover:bg-indigo-500 text-[9px] font-bold text-white"
              >
                Hire
              </button>
            </div>

            {/* Scrollable Mobile Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 text-slate-800 text-xs">
              
              {/* TAB 1: HOME */}
              {activeTab === 'home' && (
                <div className="space-y-4 animate-fade-in">
                  
                  {/* Hero Card */}
                  <div className="p-4 rounded-3xl bg-white shadow-sm border border-slate-200/70 text-center relative overflow-hidden">
                    <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-500/20 mb-3 bg-slate-900">
                      <img src="/GOOD.png" alt="Oladepo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 uppercase tracking-widest">
                      HELLO, I'M
                    </span>
                    <h2 className="text-base font-extrabold text-[#0f172a] mt-1">
                      Oladepo Rokeeb Olayinka
                    </h2>
                    <p className="text-[11px] font-medium text-indigo-600 mt-0.5">
                      Senior Full-Stack & AI Engineer
                    </p>
                    <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                      Building scalable web applications, CBT proctoring platforms, and AI products with precision.
                    </p>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <button
                        onClick={() => setActiveTab('projects')}
                        className="py-2 px-3 rounded-full bg-[#0f172a] text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-sm"
                      >
                        <span>View Work</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={onOpenCvModal}
                        className="py-2 px-3 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[11px] flex items-center justify-center gap-1 border border-indigo-100"
                      >
                        <Download className="w-3 h-3" />
                        <span>Get CV</span>
                      </button>
                    </div>
                  </div>

                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200/60 shadow-2xs">
                      <div className="text-sm font-extrabold font-mono text-[#0f172a]">4+</div>
                      <div className="text-[9px] text-slate-500">Years Exp</div>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200/60 shadow-2xs">
                      <div className="text-sm font-extrabold font-mono text-[#0f172a]">{profile.public_repos}+</div>
                      <div className="text-[9px] text-slate-500">Projects</div>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200/60 shadow-2xs">
                      <div className="text-sm font-extrabold font-mono text-emerald-600">100%</div>
                      <div className="text-[9px] text-slate-500">Shipped</div>
                    </div>
                  </div>

                  {/* Core Services Mini Strip */}
                  <div className="p-3.5 rounded-3xl bg-white border border-slate-200/60 shadow-sm space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Core Specializations
                    </div>
                    <div className="space-y-1.5">
                      <div className="p-2 rounded-xl bg-slate-50 flex items-center justify-between text-[11px] font-semibold">
                        <span>Full-Stack Architecture</span>
                        <span className="text-[9px] text-indigo-600 font-mono">React/Next/Node</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 flex items-center justify-between text-[11px] font-semibold">
                        <span>Smart CBT & Face Proctoring</span>
                        <span className="text-[9px] text-purple-600 font-mono">Biometrics/WebRTC</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 flex items-center justify-between text-[11px] font-semibold">
                        <span>AI Video & Multimodal Ads</span>
                        <span className="text-[9px] text-amber-600 font-mono">Veo / Runway 4K</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                      Featured Repositories ({repositories.length})
                    </span>
                    <a
                      href={PORTFOLIO_CONFIG.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-indigo-600 flex items-center gap-0.5"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  {repositories.slice(0, 5).map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-2xl bg-white border border-slate-200/70 shadow-xs hover:border-indigo-300 transition-all"
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="font-bold text-xs text-[#0f172a] truncate">{repo.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed mb-2">
                        {repo.description || 'Production web application & AI system.'}
                      </p>
                      <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono">
                        <span className="text-indigo-600 font-bold">{repo.language || 'TypeScript'}</span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 text-amber-500" /> {repo.stargazers_count}</span>
                          <span className="flex items-center gap-0.5"><GitFork className="w-2.5 h-2.5" /> {repo.forks_count}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* TAB 3: AI COPILOT */}
              {activeTab === 'ai' && (
                <div className="flex flex-col h-full space-y-3 animate-fade-in">
                  <div className="p-2.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-indigo-600" />
                      <div>
                        <div className="text-[11px] font-bold text-indigo-950">Oladepo AI Copilot</div>
                        <div className="text-[9px] text-indigo-600 font-mono">gemini-3.8-flash active</div>
                      </div>
                    </div>
                    <button
                      onClick={onOpenLiveVoice}
                      className="px-2.5 py-1 rounded-full bg-indigo-600 text-white text-[9px] font-bold"
                    >
                      Live Call
                    </button>
                  </div>

                  <div className="space-y-2 flex-1 max-h-[360px] overflow-y-auto pr-1">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-2xl text-[11px] leading-relaxed ${
                          msg.role === 'user'
                            ? 'ml-auto bg-[#0f172a] text-white max-w-[85%]'
                            : 'mr-auto bg-white border border-slate-200 text-slate-800 max-w-[90%] shadow-2xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                    {isAiLoading && (
                      <div className="p-2 rounded-2xl bg-white border border-slate-200 text-slate-500 text-[10px] w-24 flex items-center gap-1.5 animate-pulse">
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        <span>Thinking...</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 pt-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                      placeholder="Ask Oladepo AI..."
                      className="flex-1 px-3 py-2 rounded-full bg-white border border-slate-200 text-xs focus:outline-none"
                    />
                    <button
                      onClick={handleSendChat}
                      disabled={isAiLoading || !chatInput.trim()}
                      className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: STUDIO */}
              {activeTab === 'studio' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                    AI Commercial Video Studio
                  </div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-slate-950 max-h-80 mx-auto shadow-md">
                    <img
                      src="/GOOD.png"
                      alt="Studio Commercial"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-indigo-600/80 w-fit mb-1">
                        4K 9:16 Vertical Reel
                      </span>
                      <h4 className="text-xs font-bold leading-tight">
                        Product Commercial & Motion VFX
                      </h4>
                      <p className="text-[9px] text-slate-300 mt-0.5">
                        Synthesized with custom prompt architecture & camera kinematics.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: CONTACT */}
              {activeTab === 'contact' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Direct Contact Hub</h3>
                    <p className="text-[10px] text-slate-500">
                      Response within 24 hours guaranteed.
                    </p>

                    <div className="space-y-2 pt-2">
                      <a
                        href={PORTFOLIO_CONFIG.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <span>Chat on WhatsApp</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>

                      <a
                        href={`mailto:${PORTFOLIO_CONFIG.email}`}
                        className="w-full py-2.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center gap-1.5"
                      >
                        <span>Send Email</span>
                      </a>

                      <button
                        onClick={onOpenCvModal}
                        className="w-full py-2.5 px-3 rounded-full bg-[#0f172a] text-white font-bold text-[11px] flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download Full CV</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Mobile Tab Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 flex items-center justify-between z-30 select-none">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center py-1 ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-semibold mt-0.5">Feed</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`flex flex-col items-center py-1 ${activeTab === 'projects' ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                <FolderGit2 className="w-4 h-4" />
                <span className="text-[9px] font-semibold mt-0.5">Repos</span>
              </button>

              <button
                onClick={() => setActiveTab('ai')}
                className="flex flex-col items-center -mt-5"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-bold text-indigo-700 mt-0.5">AI</span>
              </button>

              <button
                onClick={() => setActiveTab('studio')}
                className={`flex flex-col items-center py-1 ${activeTab === 'studio' ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                <Video className="w-4 h-4" />
                <span className="text-[9px] font-semibold mt-0.5">Reels</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`flex flex-col items-center py-1 ${activeTab === 'contact' ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-[9px] font-semibold mt-0.5">Connect</span>
              </button>
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-300 rounded-full pointer-events-none z-40" />

          </div>
        </div>

      </div>
    </div>
  );
}
