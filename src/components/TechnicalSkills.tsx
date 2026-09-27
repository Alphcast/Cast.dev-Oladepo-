import { useState } from 'react';
import { TECHNICAL_SKILLS } from '../data/portfolioData';
import { Layers, Terminal, CheckCircle2 } from 'lucide-react';

export function TechnicalSkills() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  // Quick tools list matching the reference image strip
  const quickTools = [
    { name: 'React', label: 'Frontend', iconBg: 'bg-cyan-50 text-cyan-600', symbol: '⚛' },
    { name: 'Next.js', label: 'Framework', iconBg: 'bg-slate-100 text-slate-800', symbol: 'N' },
    { name: 'TypeScript', label: 'Language', iconBg: 'bg-blue-50 text-blue-600', symbol: 'TS' },
    { name: 'Node.js', label: 'Runtime', iconBg: 'bg-emerald-50 text-emerald-600', symbol: 'JS' },
    { name: 'PostgreSQL', label: 'Database', iconBg: 'bg-indigo-50 text-indigo-600', symbol: 'PG' },
    { name: 'Gemini AI', label: 'AI & LLM', iconBg: 'bg-purple-50 text-purple-600', symbol: '✦' },
    { name: 'Tailwind', label: 'Styling', iconBg: 'bg-sky-50 text-sky-600', symbol: 'CSS' },
    { name: 'Docker', label: 'DevOps', iconBg: 'bg-blue-50 text-blue-700', symbol: '🐳' }
  ];

  return (
    <section id="skills" className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference image: TOOLS & SKILLS / Technologies I Use */}
        <div className="mb-8 text-left">
          <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
            TOOLS & SKILLS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a]">
            Technologies I Use
          </h2>
        </div>

        {/* 8-Card Tool Icon Grid matching reference image */}
        <div className="glass-card rounded-[28px] p-5 sm:p-7 shadow-xs border border-white mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {quickTools.map((tool) => (
              <div
                key={tool.name}
                className="bg-white/80 rounded-2xl p-3.5 flex flex-col items-center justify-center border border-slate-100 hover:border-indigo-200 transition-all shadow-xs hover:shadow-sm group cursor-default"
              >
                <div className={`w-11 h-11 rounded-xl ${tool.iconBg} flex items-center justify-center font-bold text-sm mb-2 shadow-xs group-hover:scale-105 transition-transform`}>
                  {tool.symbol}
                </div>
                <span className="text-xs font-bold text-slate-800 text-center">
                  {tool.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {tool.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Engineering Competence & Project Evidence */}
        <div className="glass-card rounded-[28px] p-6 sm:p-8 shadow-xs border border-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#0f172a]">
                Verified Production Competence
              </h3>
              <p className="text-xs text-slate-500">
                Categorized by engineering tier with verifiable codebase links.
              </p>
            </div>

            {/* Category Selector Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {TECHNICAL_SKILLS.map((cat, idx) => (
                <button
                  key={cat.title}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                    activeCategoryIndex === idx
                      ? 'bg-[#0f172a] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {TECHNICAL_SKILLS[activeCategoryIndex].skills.map((skill) => (
              <div
                key={skill.name}
                className="p-3.5 rounded-xl bg-white/70 border border-slate-200/60 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900">
                    {skill.name}
                  </span>
                  {skill.level && (
                    <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      {skill.level}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 truncate" title={skill.evidenceProject}>
                  Evidence: <span className="text-slate-700 font-medium">{skill.evidenceProject}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
