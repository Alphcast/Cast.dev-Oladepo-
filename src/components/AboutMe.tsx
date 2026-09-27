import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { Layers, CheckCircle2, ArrowUpRight, Code, Award, Users, BookOpen } from 'lucide-react';
import { GitHubUserProfile } from '../hooks/useGitHubData';

interface AboutMeProps {
  profile: GitHubUserProfile;
  onOpenCvModal: () => void;
}

export function AboutMe({ profile, onOpenCvModal }: AboutMeProps) {
  return (
    <section id="about" className="py-20 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container Card in Frosted Glass */}
        <div className="glass-card rounded-[32px] p-6 sm:p-10 md:p-12 shadow-sm border border-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Title & 3 Stat Cards */}
            <div className="lg:col-span-7">
              <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase block mb-2">
                ABOUT ME
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight mb-8">
                Architecting with Precision<br />Building with Purpose
              </h2>

              {/* 3 Metric Cards row matching the reference image */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                
                <div className="p-4 sm:p-5 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs flex flex-col items-start">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 mb-2">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#0f172a] leading-tight font-mono">
                    {PORTFOLIO_CONFIG.experienceYears}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 mt-0.5">
                    Years Experience
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs flex flex-col items-start">
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-600 mb-2">
                    <Code className="w-4 h-4" />
                  </div>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#0f172a] leading-tight font-mono">
                    {profile.public_repos}+
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 mt-0.5">
                    Public Projects
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs flex flex-col items-start">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600 mb-2">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#0f172a] leading-tight font-mono">
                    100%
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 mt-0.5">
                    Production Shipped
                  </span>
                </div>

              </div>
            </div>

            {/* Right Column: Bio Paragraph & "More About Me" button */}
            <div className="lg:col-span-5 flex flex-col items-start justify-center lg:pl-6 lg:border-l border-slate-200/60">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                I'm a senior full-stack developer and AI engineer with {PORTFOLIO_CONFIG.experienceYears} of experience turning complex business problems into scalable, intuitive digital platforms. With a foundational background in <strong className="text-slate-900 font-semibold">Mathematics</strong>, I bring computational rigor, discrete optimization, and clean aesthetic discipline to every software architecture.
              </p>

              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
              >
                <span>More About Me</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
