import { ArrowUpRight, Code2, Bot, GraduationCap, Film } from 'lucide-react';

interface ServicesSectionProps {
  onOpenCaseStudy?: (id: string) => void;
}

export function ServicesSection({ onOpenCaseStudy }: ServicesSectionProps) {
  const services = [
    {
      id: 'fullstack',
      icon: Code2,
      badgeColor: 'bg-amber-50 text-amber-600',
      title: 'Full-Stack Architecture',
      description: 'Designing intuitive, scalable web platforms with React, Next.js, Node.js, and PostgreSQL for real-world enterprise needs.',
      link: '#projects'
    },
    {
      id: 'ai-agents',
      icon: Bot,
      badgeColor: 'bg-purple-50 text-purple-600',
      title: 'AI Engineering & Agents',
      description: 'Building autonomous LLM agents, streaming conversational systems, prompt pipelines, and intelligent workflow automation.',
      link: '#ai-engineering'
    },
    {
      id: 'edtech-cbt',
      icon: GraduationCap,
      badgeColor: 'bg-blue-50 text-blue-600',
      title: 'EdTech & Smart CBT Suite',
      description: 'Creating high-concurrency exam platforms with real-time biometric face-capture proctoring, test timers, and automated grading.',
      link: '#projects'
    },
    {
      id: 'creative-studio',
      icon: Film,
      badgeColor: 'bg-emerald-50 text-emerald-600',
      title: 'AI Creative Studio',
      description: 'Producing commercial-grade 4K AI promotional video ads, 3D product visualizations, and high-conversion social campaigns.',
      link: '#ai-studio'
    }
  ];

  return (
    <section id="services" className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-left">
          <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
            WHAT I DO
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a]">
            Services I Offer
          </h2>
        </div>

        {/* 4 Frosted Cards Grid matching the reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.link}
                className="glass-card glass-card-hover rounded-[24px] p-6 flex flex-col justify-between group relative border border-white"
              >
                <div>
                  {/* Pastel Squircle Icon Badge matching reference image */}
                  <div className={`w-11 h-11 rounded-2xl ${item.badgeColor} flex items-center justify-center mb-5 shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-[#0f172a] mb-2 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom-right arrow indicator matching reference image */}
                <div className="pt-6 flex justify-end">
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#0f172a] group-hover:text-white text-slate-500 flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
