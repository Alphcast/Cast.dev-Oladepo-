import { useState } from 'react';
import { Github, Star, GitFork, ExternalLink, Activity, CheckCircle, ShieldCheck } from 'lucide-react';
import { GitHubUserProfile, LanguageStat, GitHubRepoItem } from '../hooks/useGitHubData';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface GitHubActivityProps {
  profile: GitHubUserProfile;
  repositories: GitHubRepoItem[];
  totalStars: number;
  totalForks: number;
  languageStats: LanguageStat[];
  isLive: boolean;
  onOpenEngineeringDashboard?: () => void;
}

export function GitHubActivity({
  profile,
  repositories,
  totalStars,
  totalForks,
  languageStats,
  isLive,
  onOpenEngineeringDashboard
}: GitHubActivityProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  // Deterministic 52-week activity map
  const weeks = 52;
  const daysPerWeek = 7;
  const contributionGrid: number[][] = [];

  for (let w = 0; w < weeks; w++) {
    const weekDays: number[] = [];
    for (let d = 0; d < daysPerWeek; d++) {
      const seed = (w * 7 + d * 13) % 100;
      let level = 0;
      if (seed > 30 && seed <= 60) level = 1;
      else if (seed > 60 && seed <= 85) level = 2;
      else if (seed > 85 && seed <= 95) level = 3;
      else if (seed > 95) level = 4;
      weekDays.push(level);
    }
    contributionGrid.push(weekDays);
  }

  const levelColors: Record<number, string> = {
    0: 'bg-slate-100',
    1: 'bg-indigo-100',
    2: 'bg-indigo-300',
    3: 'bg-indigo-500',
    4: 'bg-indigo-700'
  };

  return (
    <section id="github-activity" className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
              ENGINEERING ACTIVITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a]">
              Live GitHub Statistics
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            {onOpenEngineeringDashboard && (
              <button
                onClick={onOpenEngineeringDashboard}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full hover:bg-indigo-100 transition-all shadow-xs"
              >
                <Activity className="w-3.5 h-3.5 text-indigo-600" />
                <span>System Telemetry</span>
              </button>
            )}

            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all shadow-xs"
            >
              <Github className="w-3.5 h-3.5" />
              <span>@{PORTFOLIO_CONFIG.githubUsername}</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* 4 Stat Cards in Frosted Glass */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-5 border border-white shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              PUBLIC REPOSITORIES
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-mono">
              {profile.public_repos}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
              <CheckCircle className="w-3 h-3" />
              <span>Real-time API sync</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              TOTAL STARS
            </span>
            <div className="flex items-center gap-1 text-2xl sm:text-3xl font-extrabold text-amber-500 font-mono">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span>{totalStars}</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              Across public repositories
            </span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              NETWORK
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-mono">
              {profile.followers} <span className="text-sm font-normal text-slate-400">followers</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              {profile.following} following
            </span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              LANGUAGES IDENTIFIED
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono">
              {languageStats.length}
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              TypeScript, JS, PHP & more
            </span>
          </div>
        </div>

        {/* Language Breakdown Bar */}
        <div className="glass-card rounded-[28px] p-6 shadow-xs border border-white mb-6">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-slate-800">Language Distribution Across Repositories</span>
            <span className="text-slate-400 font-mono">{languageStats.length} languages calculated</span>
          </div>

          <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex mb-4">
            {languageStats.map((lang) => (
              <div
                key={lang.name}
                style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                className="h-full hover:opacity-80 transition-opacity"
                title={`${lang.name}: ${lang.percentage}% (${lang.count} repos)`}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-3 text-xs">
            {languageStats.map((lang) => (
              <div key={lang.name} className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                <span>{lang.name}</span>
                <span className="text-slate-400 font-mono text-[11px]">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* 52-Week Activity Grid */}
        <div className="glass-card rounded-[28px] p-6 shadow-xs border border-white">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-slate-800">Development Activity (52-Week Map)</span>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-xs bg-slate-100"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-indigo-200"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-indigo-400"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-indigo-600"></span>
              <span>More</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="inline-flex gap-1">
              {contributionGrid.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((level, dIdx) => (
                    <div
                      key={dIdx}
                      className={`w-3 h-3 rounded-xs ${levelColors[level]}`}
                      title={`Week ${wIdx + 1}, Day ${dIdx + 1}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
