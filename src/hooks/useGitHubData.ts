import { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG, FALLBACK_REPOSITORIES } from '../data/portfolioData';

export interface GitHubUserProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  company: string | null;
  blog: string;
  location: string;
  hireable: boolean | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  created_at?: string;
}

export interface GitHubRepoItem {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  topics?: string[];
  homepage?: string | null;
  featured?: boolean;
  detectedCategories?: string[];
}

export interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  PHP: '#4f5d95',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  Other: '#64748b'
};

// Automatic category detection for Alphcast repos
export function detectRepoCategories(repo: { name: string; description: string | null; language: string | null; topics?: string[] }): string[] {
  const categories = new Set<string>();
  const text = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();
  
  // Featured check
  if (PORTFOLIO_CONFIG.featuredProjects.some(fp => repo.name.toLowerCase().includes(fp.toLowerCase()))) {
    categories.add('Featured');
  }

  // AI & LLM
  if (text.includes('ai') || text.includes('llm') || text.includes('gpt') || text.includes('arena') || text.includes('chatbot') || text.includes('reply')) {
    categories.add('AI');
  }

  // Education Technology / CBT
  if (text.includes('cbt') || text.includes('exam') || text.includes('learning') || text.includes('academy') || text.includes('education') || text.includes('ulum')) {
    categories.add('Education Technology');
  }

  // Healthcare
  if (text.includes('health') || text.includes('medguard') || text.includes('medical') || text.includes('clinic')) {
    categories.add('Healthcare');
  }

  // Fintech & E-commerce
  if (text.includes('pay') || text.includes('bank') || text.includes('stock') || text.includes('crypto') || text.includes('web3') || text.includes('luxury') || text.includes('store')) {
    categories.add('Fintech & Commerce');
  }

  // Full Stack / Backend / Frontend based on language
  if (repo.language === 'TypeScript') categories.add('TypeScript');
  if (repo.language === 'JavaScript') categories.add('JavaScript');
  if (repo.language === 'PHP') categories.add('PHP');

  if (text.includes('react') || text.includes('next') || text.includes('ui') || text.includes('portfolio') || text.includes('frontend')) {
    categories.add('Frontend');
  }

  if (text.includes('api') || text.includes('server') || text.includes('backend') || text.includes('bridge') || repo.language === 'PHP') {
    categories.add('Backend');
  }

  categories.add('Full Stack');

  return Array.from(categories);
}

export function useGitHubData() {
  const [profile, setProfile] = useState<GitHubUserProfile>({
    login: PORTFOLIO_CONFIG.githubUsername,
    name: PORTFOLIO_CONFIG.name,
    avatar_url: "https://avatars.githubusercontent.com/u/185644810?v=4",
    bio: PORTFOLIO_CONFIG.supportingStatement,
    company: "TECHCAST",
    blog: "https://cast-dev.vercel.app/",
    location: "Nigeria",
    hireable: true,
    public_repos: 86, // Live default matching current GitHub count
    followers: 12,
    following: 15,
    html_url: PORTFOLIO_CONFIG.githubUrl
  });

  const [repositories, setRepositories] = useState<GitHubRepoItem[]>(FALLBACK_REPOSITORIES.map(r => ({
    ...r,
    detectedCategories: detectRepoCategories(r)
  })));

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [totalStars, setTotalStars] = useState<number>(14);
  const [totalForks, setTotalForks] = useState<number>(5);
  const [languageStats, setLanguageStats] = useState<LanguageStat[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadGitHubData() {
      setIsLoading(true);
      const username = PORTFOLIO_CONFIG.githubUsername;

      try {
        // Step 1: Try our backend proxy route first
        let userProfileData: GitHubUserProfile | null = null;
        let userReposData: any[] = [];

        try {
          const profileRes = await fetch('/api/github/profile');
          if (profileRes.ok) {
            userProfileData = await profileRes.json();
          }
        } catch {
          // backend not reachable, proceed to direct fallback
        }

        try {
          const reposRes = await fetch('/api/github/repos');
          if (reposRes.ok) {
            const data = await reposRes.json();
            if (Array.isArray(data.repos) && data.repos.length > 0) {
              userReposData = data.repos;
            }
          }
        } catch {
          // backend not reachable
        }

        // Step 2: Fallback to direct GitHub public API if backend returned empty
        if (!userProfileData) {
          try {
            const directProfileRes = await fetch(`https://api.github.com/users/${username}`);
            if (directProfileRes.ok) {
              userProfileData = await directProfileRes.json();
            }
          } catch {
            // direct fetch error
          }
        }

        if (userReposData.length === 0) {
          try {
            const directReposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
            if (directReposRes.ok) {
              userReposData = await directReposRes.json();
            }
          } catch {
            // direct repos fetch error
          }
        }

        if (!isMounted) return;

        // Process profile
        if (userProfileData && userProfileData.login) {
          setProfile(userProfileData);
          setIsLive(true);
        }

        // Process repositories
        const rawRepos = (userReposData && userReposData.length > 0) ? userReposData : FALLBACK_REPOSITORIES;
        
        let starsCount = 0;
        let forksCount = 0;
        const langCounts: Record<string, number> = {};

        const enhancedRepos: GitHubRepoItem[] = rawRepos.map((repo: any) => {
          const stars = repo.stargazers_count || 0;
          const forks = repo.forks_count || 0;
          starsCount += stars;
          forksCount += forks;

          const lang = repo.language || 'Other';
          langCounts[lang] = (langCounts[lang] || 0) + 1;

          const isFeatured = PORTFOLIO_CONFIG.featuredProjects.some(fp => 
            repo.name.toLowerCase().includes(fp.toLowerCase())
          );

          return {
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name || `${username}/${repo.name}`,
            html_url: repo.html_url || `https://github.com/${username}/${repo.name}`,
            description: repo.description,
            language: repo.language,
            stargazers_count: stars,
            forks_count: forks,
            updated_at: repo.updated_at || new Date().toISOString(),
            created_at: repo.created_at || new Date().toISOString(),
            topics: repo.topics || [],
            homepage: repo.homepage || null,
            featured: isFeatured,
            detectedCategories: detectRepoCategories(repo)
          };
        });

        // Sort repos: Featured first, then by stars, then updated_at
        enhancedRepos.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });

        setRepositories(enhancedRepos);
        setTotalStars(starsCount);
        setTotalForks(forksCount);

        // Calculate language statistics
        const totalLanguagesCount = Object.values(langCounts).reduce((acc, curr) => acc + curr, 0);
        const calculatedStats: LanguageStat[] = Object.entries(langCounts)
          .map(([name, count]) => ({
            name,
            count,
            percentage: totalLanguagesCount > 0 ? Math.round((count / totalLanguagesCount) * 100) : 0,
            color: LANGUAGE_COLORS[name] || LANGUAGE_COLORS['Other']
          }))
          .sort((a, b) => b.count - a.count);

        setLanguageStats(calculatedStats);
      } catch (err) {
        console.warn('Could not retrieve remote GitHub data, relying on local snapshot', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    profile,
    repositories,
    isLoading,
    isLive,
    totalStars,
    totalForks,
    languageStats
  };
}
