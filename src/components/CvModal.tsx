import { useEffect } from 'react';
import { X, Printer, Github, Mail, MapPin } from 'lucide-react';
import { PORTFOLIO_CONFIG, WORK_EXPERIENCE, TECHNICAL_SKILLS } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvModal({ isOpen, onClose }: CvModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] glass-card rounded-[32px] shadow-2xl flex flex-col overflow-hidden text-left bg-white border border-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="p-4 sm:px-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider font-mono">
            CURRICULUM VITAE · {PORTFOLIO_CONFIG.name}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0f172a] rounded-full hover:bg-slate-800 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-200 transition-colors"
              aria-label="Close CV"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 text-slate-800 font-sans space-y-6">
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-3xl font-extrabold text-[#0f172a] tracking-tight">
              {PORTFOLIO_CONFIG.name}
            </h1>
            <p className="text-sm font-semibold text-indigo-600 mt-0.5">
              {PORTFOLIO_CONFIG.primaryTitle}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {PORTFOLIO_CONFIG.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-slate-400" />
                github.com/{PORTFOLIO_CONFIG.githubUsername}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {PORTFOLIO_CONFIG.location}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1.5 border-b border-slate-100 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mathematics graduate and Senior Full-Stack Engineer with {PORTFOLIO_CONFIG.experienceYears} of proven experience designing and delivering scalable web platforms, high-concurrency educational testing software, and production generative AI workflows.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
              CORE TECHNICAL COMPETENCIES
            </h2>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div><strong className="text-slate-900">Languages & Frameworks:</strong> TypeScript, JavaScript, React 19, Next.js 15, Node.js, Express, PHP, HTML5, CSS3, Tailwind CSS</div>
              <div><strong className="text-slate-900">Persistence:</strong> PostgreSQL, MongoDB, Supabase, Firebase Firestore, TanStack Query</div>
              <div><strong className="text-slate-900">AI & LLMs:</strong> Gemini API, LLM Agents, SSE Streaming, Prompt Engineering, Vector Search</div>
              <div><strong className="text-slate-900">DevOps:</strong> Docker, GitHub Actions, CI/CD, Cloud Deployment, Biometrics & WebRTC</div>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-4">
              {WORK_EXPERIENCE.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{exp.role}</span>
                    <span className="font-mono text-slate-400 font-normal">{exp.period}</span>
                  </div>
                  <div className="text-indigo-600 font-medium mb-1.5">
                    {exp.company} · {exp.location}
                  </div>
                  <ul className="space-y-1 text-slate-600 pl-4 list-disc mb-1.5">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1.5 border-b border-slate-100 pb-1">
              ACADEMIC BACKGROUND
            </h2>
            <div className="text-xs text-slate-700">
              <strong className="text-slate-900">Bachelor of Science (B.Sc.) in Mathematics</strong>
              <p className="text-slate-500 mt-0.5">Specialized in discrete computational logic, algorithm design, and applied numerical analysis.</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
