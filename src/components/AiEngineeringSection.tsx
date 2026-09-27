import { useState } from 'react';
import { Cpu, Bot, Workflow, Sparkles, Binary, Terminal, ExternalLink, Code2 } from 'lucide-react';
import { PORTFOLIO_ASSETS } from '../data/portfolioData';

interface AiEngineeringProps {
  onOpenCaseStudy: (caseStudyId: string) => void;
}

export function AiEngineeringSection({ onOpenCaseStudy }: AiEngineeringProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const aiDomains = [
    {
      id: 'applications',
      title: 'AI Applications & Interfaces',
      icon: Cpu,
      tagline: 'End-to-end full-stack applications with conversational reasoning and multimodal capabilities.',
      evidenceProject: 'llm-arena-main--1-',
      evidenceTitle: 'LLM Arena Workbench',
      evidenceUrl: 'https://github.com/Alphcast/llm-arena-main--1-',
      technologies: ['Gemini API', 'Next.js 15', 'SSE Streaming', 'TypeScript', 'Tailwind CSS'],
      capabilities: [
        'Real-time streaming token delivery with Server-Sent Events',
        'Multi-model side-by-side comparative benchmarking',
        'Structured schema validation with JSON output enforcement',
        'Sub-second prompt response latency optimization'
      ]
    },
    {
      id: 'agents',
      title: 'AI Agents & Tool Orchestration',
      icon: Bot,
      tagline: 'Autonomous and human-in-the-loop agents executing multi-step tool calls and API executions.',
      evidenceProject: 'AI-Customer-Chatbot',
      evidenceTitle: 'Autonomous Customer Agent',
      evidenceUrl: 'https://github.com/Alphcast/AI-Customer-Chatbot',
      technologies: ['Function Calling', 'Node.js', 'Vector DBs', 'Webhook Dispatch', 'State Machines'],
      capabilities: [
        'Deterministic tool execution with parameter validation schemas',
        'Stateful conversational memory across user browser sessions',
        'Automated ticket triage and database lookups',
        'Strict guardrails preventing hallucinated actions'
      ]
    },
    {
      id: 'automation',
      title: 'AI Automation & Workflows',
      icon: Workflow,
      tagline: 'Automating high-friction manual business workflows and data transformation pipelines with LLMs.',
      evidenceProject: 'REPLYMADEEASY & replymind',
      evidenceTitle: 'Automated Response & Synthesis Engine',
      evidenceUrl: 'https://github.com/Alphcast/REPLYMADEEASY',
      technologies: ['Prompt Ensembles', 'Express.js', 'Batch Processing', 'Cron Workers'],
      capabilities: [
        'High-volume communication synthesis and contextual drafts',
        'Unstructured document parsing into clean relational records',
        'Dynamic tone calibration for customer-facing channels',
        'Zero manual copywriting bottleneck'
      ]
    },
    {
      id: 'generative',
      title: 'Generative AI & Multimodal Synthesis',
      icon: Sparkles,
      tagline: 'Harnessing diffusion models, audio generation, and multimodal reasoning for creative products.',
      evidenceProject: 'CHAPTERAI & baytul-ulum-ai',
      evidenceTitle: 'Multilingual Educational AI Knowledge Base',
      evidenceUrl: 'https://github.com/Alphcast/baytul-ulum-ai',
      technologies: ['Diffusion Models', 'Multimodal APIs', 'Speech Synthesis', 'Embedding Retrieval'],
      capabilities: [
        'Multimodal text-to-image and audio generation pipeline',
        'Cross-lingual knowledge extraction and summarization',
        'Dynamic educational curriculum generation',
        'Custom prompt template versioning and testing'
      ]
    },
    {
      id: 'apis',
      title: 'AI APIs & Gateway Architecture',
      icon: Binary,
      tagline: 'Production-grade server-side gateways insulating frontend clients from rate-limits and keys.',
      evidenceProject: 'Paycom & Backend Services',
      evidenceTitle: 'Resilient Server-Side Inference Proxy',
      evidenceUrl: 'https://github.com/Alphcast',
      technologies: ['Node.js Proxy', 'In-Memory Caching', 'Token Bucket Rate Limiting', 'Zod'],
      capabilities: [
        'Server-side prompt injection filtering and sanitization',
        'Token budgeting and session consumption accounting',
        'Fallback routing across multiple LLM providers on outage',
        'Zero API secrets leaked to client-side browsers'
      ]
    }
  ];

  const current = aiDomains[activeTab];

  return (
    <section id="ai-engineering" className="py-24 bg-[#07090d] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <Cpu className="w-4 h-4" />
            <span>AI ENGINEERING & SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display mb-4">
            I Don't Just Use AI. <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">I Build With It.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From streaming LLM interfaces and tool-calling agents to generative advert pipelines, I architect AI as a resilient, production-ready engineering primitive rather than a superficial gimmick.
          </p>
        </div>

        {/* Interactive Domain Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Domain Selector Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {aiDomains.map((domain, index) => {
              const Icon = domain.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-start gap-4 p-4 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-slate-900 border border-cyan-500/50 shadow-lg shadow-cyan-950/40'
                      : 'bg-slate-900/30 border border-slate-800/80 hover:bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-lg shrink-0 ${
                      isActive ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className={`text-sm font-bold ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {domain.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                      {domain.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  DOMAIN SPECIFICATION
                </span>
                <span className="text-xs font-mono text-slate-500">
                  0{activeTab + 1} / 0{aiDomains.length}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display mb-2">
                {current.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {current.tagline}
              </p>

              {/* Technologies unboxed */}
              <div className="mb-6">
                <div className="text-xs font-mono text-slate-400 mb-2">TECHNOLOGIES & STACK</div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
                  {current.technologies.map((tech, i) => (
                    <span key={tech}>
                      {i > 0 && <span className="mr-2 text-slate-600">·</span>}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engineering Capabilities */}
              <div className="mb-8">
                <div className="text-xs font-mono text-slate-400 mb-3">ENGINEERING CAPABILITIES</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {current.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 text-xs text-slate-300"
                    >
                      <span className="text-cyan-400 font-mono font-bold mr-1.5">✓</span>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real Project Evidence Box */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono text-slate-400">ACTUAL VERIFIED PROJECT</div>
                  <div className="text-sm font-bold text-white">{current.evidenceTitle}</div>
                  <div className="text-xs text-slate-400 font-mono">repo: {current.evidenceProject}</div>
                </div>

                <div className="flex items-center gap-3">
                  {current.evidenceProject.includes('llm-arena') && (
                    <button
                      onClick={() => onOpenCaseStudy('llm-arena-hub')}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors"
                    >
                      Case Study
                    </button>
                  )}

                  <a
                    href={current.evidenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
