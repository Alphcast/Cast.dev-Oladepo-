import { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, ShieldCheck } from 'lucide-react';
import { ProjectCaseStudy } from '../data/portfolioData';

interface CaseStudyModalProps {
  caseStudy: ProjectCaseStudy | null;
  onClose: () => void;
}

export function CaseStudyModal({ caseStudy, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!caseStudy) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-[32px] shadow-2xl p-6 sm:p-10 my-auto text-left bg-white border border-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
            CASE STUDY · {caseStudy.category}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-2">
            {caseStudy.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {caseStudy.tagline}
          </p>
        </div>

        {/* Visual Frame */}
        <div className="mb-6 rounded-[24px] overflow-hidden aspect-[16/8] bg-slate-100 relative shadow-inner">
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* 2-Column Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block mb-1">
              THE PROBLEM
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              {caseStudy.problem}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
              THE ARCHITECTURAL SOLUTION
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Architecture flow */}
        <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 mb-6">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 mb-3">
            <Layers className="w-4 h-4" />
            <span>Architecture Breakdown</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 block mb-0.5">FRONTEND</span>
              <span className="font-semibold text-slate-800">{caseStudy.architecture.frontend}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 block mb-0.5">BACKEND & API</span>
              <span className="font-semibold text-slate-800">{caseStudy.architecture.backend}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 block mb-0.5">PERSISTENCE</span>
              <span className="font-semibold text-slate-800">{caseStudy.architecture.database}</span>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-900 mb-3">
            Key Architectural Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {caseStudy.features.map((f, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={caseStudy.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0f172a] rounded-full hover:bg-slate-800 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Code</span>
            </a>

            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
