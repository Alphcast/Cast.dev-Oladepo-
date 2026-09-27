import { ArrowUpRight, Download, Sparkles, TrendingUp, Github, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_CONFIG, PORTFOLIO_ASSETS } from '../data/portfolioData';
import { GitHubUserProfile } from '../hooks/useGitHubData';

interface HeroProps {
  profile: GitHubUserProfile;
  totalStars: number;
  onOpenCvModal: () => void;
  onOpenTerminal: () => void;
  onOpenAiChat?: () => void;
}

export function Hero({ profile, onOpenCvModal, onOpenTerminal, onOpenAiChat }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[96vh] flex items-center pt-28 pb-16 overflow-hidden">
      
      {/* Soft ethereal ambient glow behind hero */}
      <div className="absolute top-12 right-10 w-[550px] h-[550px] bg-gradient-to-br from-indigo-200/50 via-purple-100/40 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-blue-100/40 via-sky-100/30 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Decorative floating iridescent orb from generated asset */}
      <div className="absolute top-20 right-4 lg:right-16 w-32 h-32 md:w-48 md:h-48 opacity-40 pointer-events-none mix-blend-multiply blur-xs">
        <img
          src={PORTFOLIO_ASSETS.glassOrb}
          alt="Refraction"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs (matching reference image) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Kicker tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-[11px] font-bold tracking-widest text-indigo-600 uppercase mb-4 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
              <span>HELLO, I'M</span>
            </div>

            {/* Main Name */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0f172a] tracking-tight leading-[1.08] mb-3">
              {PORTFOLIO_CONFIG.name}
            </h1>

            {/* Specialization / Title in purple/indigo gradient */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 bg-clip-text text-transparent mb-5 leading-snug">
              Senior Full-Stack & AI Engineer
            </h2>

            {/* Bio paragraph */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal">
              I build scalable web applications, AI-powered products, and digital experiences that are intuitive, high-performance, and engineered with purpose.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-12">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#0f172a] rounded-full hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span>View My Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200/90 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs hover:shadow-sm"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Download CV</span>
              </button>

              {onOpenAiChat && (
                <button
                  onClick={onOpenAiChat}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/90 rounded-full hover:bg-indigo-100/80 transition-all shadow-xs hover:shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Ask AI Architect</span>
                </button>
              )}

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                title="Launch CLI"
              >
                <span className="font-mono text-indigo-500 font-bold">$</span>
                <span>Launch Shell</span>
              </button>
            </div>

            {/* Tech Ecosystem / "Trusted by" Ribbon matching reference image */}
            <div className="w-full pt-6 border-t border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                Core Technology Ecosystem
              </span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-slate-500 font-sans">
                <span className="hover:text-slate-900 transition-colors">React 19</span>
                <span className="hover:text-slate-900 transition-colors">Next.js 15</span>
                <span className="hover:text-slate-900 transition-colors">Node.js</span>
                <span className="hover:text-slate-900 transition-colors">PostgreSQL</span>
                <span className="hover:text-slate-900 transition-colors">TypeScript</span>
                <span className="hover:text-slate-900 transition-colors">Gemini AI</span>
                <span className="hover:text-slate-900 transition-colors">Docker</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Portrait Frame with Floating Glass Badges */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
              
              {/* Outer Squircle Container matching reference image */}
              <div className="relative rounded-[38px] p-2.5 glass-card shadow-2xl overflow-visible">
                
                {/* Portrait Image */}
                <div className="relative rounded-[30px] overflow-hidden aspect-[4/5] bg-gradient-to-b from-indigo-100/50 to-slate-100">
                  <img
                    src={PORTFOLIO_ASSETS.avatar}
                    alt={PORTFOLIO_CONFIG.name}
                    className="w-full h-full object-cover object-top filter contrast-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle soft gradient base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Glass Badge 1: Top-Right "4+ Years of Experience" */}
                <div className="absolute -top-4 -right-4 sm:-right-6 glass-card rounded-2xl p-3.5 sm:px-4 sm:py-3 shadow-xl border border-white flex flex-col items-center justify-center animate-bounce-subtle">
                  <span className="text-xl sm:text-2xl font-extrabold text-[#0f172a] leading-none">
                    {PORTFOLIO_CONFIG.experienceYears}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-0.5 whitespace-nowrap">
                    Years of Experience
                  </span>
                </div>

                {/* Floating Glass Badge 2: Bottom-Right "System Impact +120%" with sparkline */}
                <div className="absolute -bottom-5 -right-3 sm:-right-5 glass-card rounded-2xl p-3 sm:px-4 sm:py-3 shadow-xl border border-white flex flex-col gap-1">
                  <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    SYSTEM IMPACT
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base sm:text-lg font-extrabold text-[#0f172a]">
                      +120%
                    </span>
                    {/* Sparkline curve matching reference image */}
                    <svg className="w-16 h-6 text-indigo-500" viewBox="0 0 64 24" fill="none">
                      <path
                        d="M2 18L18 14L32 17L46 6L62 10"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Floating Glass Badge 3: Left Edge Iridescent Sparkle Icon */}
                <div className="absolute top-1/2 -left-5 -translate-y-1/2 w-11 h-11 glass-card rounded-full shadow-lg border border-white flex items-center justify-center text-indigo-500">
                  <Sparkles className="w-5 h-5 fill-indigo-100" />
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
