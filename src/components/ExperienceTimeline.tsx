import { WORK_EXPERIENCE } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 bg-[#090b10] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <Briefcase className="w-4 h-4" />
            <span>CAREER TRAJECTORY & IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display mb-4">
            Professional Experience
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A consistent track record of designing, building, and deploying real software products across enterprise, education, and startup environments.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-12">
          {WORK_EXPERIENCE.map((exp, idx) => (
            <div key={exp.id} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all duration-200" />

              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors shadow-lg">
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-cyan-400 font-mono mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    CORE RESPONSIBILITIES
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Major Achievements */}
                <div className="mb-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                    KEY ACHIEVEMENTS
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {exp.majorAchievements.map((ach, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies used */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/80">
                  <span className="text-slate-500">Stack:</span>
                  {exp.technologies.map((t, i) => (
                    <span key={t}>
                      {i > 0 && <span className="mr-2 text-slate-600">·</span>}
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
