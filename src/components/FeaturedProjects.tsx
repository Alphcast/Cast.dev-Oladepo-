import { useState, useMemo } from 'react';
import { Search, Star, GitFork, ExternalLink, Github, BookOpen, ArrowUpRight } from 'lucide-react';
import { GitHubRepoItem } from '../hooks/useGitHubData';
import { CASE_STUDIES, PORTFOLIO_CONFIG, PORTFOLIO_ASSETS } from '../data/portfolioData';

interface FeaturedProjectsProps {
  repositories: GitHubRepoItem[];
  onOpenCaseStudy: (caseStudyId: string) => void;
  onOpenAllProjectsModal: () => void;
}

export function FeaturedProjects({ repositories, onOpenCaseStudy, onOpenAllProjectsModal }: FeaturedProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'CBT EdTech', 'AI Systems', 'Full Stack', 'TypeScript', 'Node.js'];

  // Top 3 flagship showcase projects matching the 3 cards in reference image
  const flagshipProjects = [
    {
      id: 'cbt-master-ai',
      title: 'Smart CBT Examination Platform',
      category: 'Education Technology · Biometrics',
      image: PORTFOLIO_ASSETS.cbtPlatform,
      demoUrl: 'https://cast-dev.vercel.app/',
      githubUrl: 'https://github.com/Alphcast/CBT-MASTER-AI',
      description: 'High-concurrency testing platform with webcam face capture proctoring and real-time grading.'
    },
    {
      id: 'llm-arena-hub',
      title: 'LLM Arena & Agent Workbench',
      category: 'AI Engineering · Streaming',
      image: PORTFOLIO_ASSETS.saasAiPlatform,
      demoUrl: 'https://github.com/Alphcast/llm-arena-main--1-',
      githubUrl: 'https://github.com/Alphcast/llm-arena-main--1-',
      description: 'Comparative LLM evaluation workbench with token streaming and agent tool orchestration.'
    },
    {
      id: 'paycom-fintech',
      title: 'Paycom & MedGuard Portal',
      category: 'Fintech & Healthcare · Full-Stack',
      image: PORTFOLIO_ASSETS.aiVideoStudio,
      demoUrl: 'https://github.com/Alphcast/Paycom',
      githubUrl: 'https://github.com/Alphcast/Paycom',
      description: 'Resilient transaction processing engine with cryptographic HMAC verification.'
    }
  ];

  const filteredRepos = useMemo(() => {
    return repositories.filter((repo) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        repo.name.toLowerCase().includes(query) ||
        (repo.description && repo.description.toLowerCase().includes(query));

      const matchesCat =
        selectedCategory === 'All' ||
        (selectedCategory === 'CBT EdTech' && (repo.name.toLowerCase().includes('cbt') || repo.name.toLowerCase().includes('learn'))) ||
        (selectedCategory === 'AI Systems' && (repo.name.toLowerCase().includes('ai') || repo.name.toLowerCase().includes('llm') || repo.name.toLowerCase().includes('reply'))) ||
        (selectedCategory === 'Full Stack' && (repo.language === 'TypeScript' || repo.language === 'JavaScript')) ||
        (selectedCategory === 'TypeScript' && repo.language === 'TypeScript') ||
        (selectedCategory === 'Node.js' && (repo.name.toLowerCase().includes('server') || repo.language === 'JavaScript'));

      return matchesSearch && matchesCat;
    });
  }, [repositories, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference image: FEATURED PROJECTS / Selected Work + View All Projects */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
              FEATURED PROJECTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a]">
              Selected Work
            </h2>
          </div>

          <button
            onClick={onOpenAllProjectsModal}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all shadow-xs self-start sm:self-auto"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        {/* 3 Flagship Cards matching reference image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {flagshipProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onOpenCaseStudy(project.id)}
              className="glass-card glass-card-hover rounded-[26px] p-4 sm:p-5 flex flex-col justify-between group cursor-pointer border border-white"
            >
              <div>
                {/* Visual Preview Frame matching reference image */}
                <div className="rounded-[20px] overflow-hidden aspect-[16/10] mb-4 bg-slate-100 relative shadow-inner">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <h3 className="text-base font-bold text-[#0f172a] mb-1 group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-2">
                  {project.category}
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Bottom Row with Arrow */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                <span className="text-[11px] font-semibold text-indigo-600 group-hover:underline">
                  Inspect Case Study
                </span>
                <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#0f172a] group-hover:text-white text-slate-500 flex items-center justify-center transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Filterable GitHub Repository Showcase */}
        <div className="glass-card rounded-[28px] p-6 sm:p-8 shadow-xs border border-white">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-[#0f172a]">
                Explore GitHub Repositories ({repositories.length})
              </h3>
              <p className="text-xs text-slate-500">
                Directly connected to @{PORTFOLIO_CONFIG.githubUsername}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#0f172a] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Repos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRepos.slice(0, 6).map((repo) => (
              <div
                key={repo.id}
                className="p-4 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs flex flex-col justify-between hover:border-indigo-200 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {repo.name}
                    </h4>
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mb-2">
                    {repo.language || 'Codebase'} · {new Date(repo.updated_at).toLocaleDateString()}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {repo.description || "Explore this public repository on GitHub."}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-indigo-600"
                  >
                    <Github className="w-3 h-3" />
                    <span>Source</span>
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

          <div className="mt-6 text-center">
            <button
              onClick={onOpenAllProjectsModal}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Browse all {repositories.length} public repositories in Lab Explorer →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
