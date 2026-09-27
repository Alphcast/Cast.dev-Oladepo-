import { useState, useMemo } from 'react';
import { X, Search, Star, GitFork, ExternalLink, Github, Filter } from 'lucide-react';
import { GitHubRepoItem } from '../hooks/useGitHubData';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface AllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  repositories: GitHubRepoItem[];
  onOpenCaseStudy: (caseStudyId: string) => void;
}

export function AllProjectsModal({
  isOpen,
  onClose,
  repositories,
  onOpenCaseStudy
}: AllProjectsModalProps) {
  const [search, setSearch] = useState<string>('');
  const [filterLang, setFilterLang] = useState<string>('All');

  const languages = useMemo(() => {
    const set = new Set<string>();
    repositories.forEach(r => {
      if (r.language) set.add(r.language);
    });
    return ['All', ...Array.from(set)];
  }, [repositories]);

  const filtered = useMemo(() => {
    return repositories.filter(repo => {
      const matchesLang = filterLang === 'All' || repo.language === filterLang;
      const q = search.trim().toLowerCase();
      const matchesQuery =
        !q ||
        repo.name.toLowerCase().includes(q) ||
        (repo.description && repo.description.toLowerCase().includes(q));

      return matchesLang && matchesQuery;
    });
  }, [repositories, search, filterLang]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl h-[88vh] glass-card rounded-[32px] shadow-2xl flex flex-col overflow-hidden text-left bg-white border border-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block font-mono">
              OPEN SOURCE REPOSITORY ARCHIVE
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
              My GitHub Engineering Lab
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore {repositories.length} public repositories & software authored by @{PORTFOLIO_CONFIG.githubUsername}.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 bg-white border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search repositories..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-full glass-input text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Language:</span>
            <select
              value={filterLang}
              onChange={(e) => setFilterLang(e.target.value)}
              className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 focus:outline-none"
            >
              {languages.map((l) => (
                <option key={l} value={l}>{l === 'All' ? 'All Languages' : l}</option>
              ))}
            </select>
          </div>
        </div>

        {/* List of Repos */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-[#f8f9fe]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filtered.map((repo) => (
              <div
                key={repo.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-xs flex flex-col justify-between hover:border-indigo-200 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {repo.name}
                    </h4>
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-amber-500 font-bold shrink-0">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mb-2">
                    {repo.language || 'Codebase'} · {new Date(repo.updated_at).toLocaleDateString()}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {repo.description || "Explore this repository on GitHub."}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-slate-700 hover:text-indigo-600 flex items-center gap-1"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>

                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-indigo-600 hover:underline"
                    >
                      Demo ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Total {filtered.length} repositories matching
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-semibold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
