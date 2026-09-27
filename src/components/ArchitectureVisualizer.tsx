import { useState } from 'react';
import { ARCHITECTURE_LAYERS } from '../data/portfolioData';
import { Search, Compass, Lightbulb, Code2, CheckCircle2, ArrowRight, ShieldCheck, Layers } from 'lucide-react';

export function ArchitectureVisualizer() {
  const [activeStep, setActiveStep] = useState<number>(2);

  const processSteps = [
    {
      step: '01',
      title: 'Discover',
      tagline: 'System Analysis',
      description: 'Understanding user needs, data volumes, and mathematical domain constraints.',
      icon: Search,
      badgeColor: 'bg-purple-50 text-purple-600',
      tech: 'Domain modeling & algorithmic formulation'
    },
    {
      step: '02',
      title: 'Architect',
      tagline: 'System Blueprint',
      description: 'Relational schemas, normalized tables, API contracts, and security boundaries.',
      icon: Compass,
      badgeColor: 'bg-indigo-50 text-indigo-600',
      tech: 'PostgreSQL, OpenAPI, HMAC Webhooks'
    },
    {
      step: '03',
      title: 'Engineer',
      tagline: 'Full-Stack Build',
      description: 'Developing reactive frontends and high-throughput server-side services.',
      icon: Code2,
      badgeColor: 'bg-blue-50 text-blue-600',
      tech: 'React 19, Next.js, Node.js, TypeScript'
    },
    {
      step: '04',
      title: 'AI Augment',
      tagline: 'Intelligent Workflows',
      description: 'Integrating LLMs, streaming token pipelines, and autonomous agent tools.',
      icon: Lightbulb,
      badgeColor: 'bg-amber-50 text-amber-600',
      tech: 'Gemini API, SSE Streaming, Vector Stores'
    },
    {
      step: '05',
      title: 'Deploy & Scale',
      tagline: 'Continuous Delivery',
      description: 'Automated CI/CD pipelines, containerization, and zero-downtime releases.',
      icon: CheckCircle2,
      badgeColor: 'bg-emerald-50 text-emerald-600',
      tech: 'Docker, GitHub Actions, Cloud Run'
    }
  ];

  return (
    <section id="process" className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference image: MY PROCESS / Design Process I Follow */}
        <div className="mb-10 text-left">
          <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
            MY PROCESS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a]">
            Engineering Process I Follow
          </h2>
        </div>

        {/* 5 Process Cards in a row matching reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`glass-card rounded-[24px] p-5 flex flex-col justify-between cursor-pointer transition-all border ${
                  isSelected
                    ? 'border-indigo-400 shadow-md ring-2 ring-indigo-200/50 bg-white'
                    : 'border-white hover:border-indigo-200 hover:bg-white/90'
                }`}
              >
                <div>
                  {/* Top: Icon & Step Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-9 h-9 rounded-xl ${step.badgeColor} flex items-center justify-center font-bold text-xs shadow-xs`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#0f172a] mb-1">
                    {step.title}
                  </h3>
                  <div className="text-[10px] text-indigo-600 font-semibold mb-2">
                    {step.tagline}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-4 text-[10px] font-mono text-slate-400 truncate">
                  {step.tech}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Stage Architectural Deep Dive Card */}
        <div className="glass-card rounded-[28px] p-6 sm:p-8 shadow-xs border border-white">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 mb-2">
            <Layers className="w-4 h-4" />
            <span>ARCHITECTURAL STAGE SPECIFICATION</span>
          </div>

          <h3 className="text-xl font-bold text-[#0f172a] mb-2">
            Stage {processSteps[activeStep].step}: {processSteps[activeStep].title} – {processSteps[activeStep].tagline}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            {processSteps[activeStep].description} Built with mathematical accuracy, preventing architectural debt before deployment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                TECHNOLOGY & PROTOCOLS
              </span>
              <p className="text-xs font-mono font-semibold text-indigo-700">
                {processSteps[activeStep].tech}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/60 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  SECURITY & PERFORMANCE
                </span>
                <p className="text-xs text-slate-600">
                  Zero client-side secrets, sanitized inputs, and sub-100ms response targets.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
