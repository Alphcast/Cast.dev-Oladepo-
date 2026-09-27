import { Github, Linkedin, Mail, MessageSquare, ArrowUp, Terminal } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface FooterProps {
  onOpenCvModal: () => void;
  onOpenTerminal: () => void;
}

export function Footer({ onOpenCvModal, onOpenTerminal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 bg-transparent border-t border-slate-200/60 text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-slate-200/60">
          
          {/* Brand Left Lockup matching reference image */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0f172a] text-white flex items-center justify-center font-bold text-base shadow-sm">
              O
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">
                {PORTFOLIO_CONFIG.name}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Senior Full-Stack Developer & AI Engineer
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-600">
            <a href="#home" className="hover:text-indigo-600 transition-colors">Home</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="#services" className="hover:text-indigo-600 transition-colors">Services</a>
            <a href="#projects" className="hover:text-indigo-600 transition-colors">Work</a>
            <a href="#process" className="hover:text-indigo-600 transition-colors">Process</a>
            <a href="#github-activity" className="hover:text-indigo-600 transition-colors">GitHub</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>

          {/* Terminal & Top Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenTerminal}
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors"
              title="Interactive Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_CONFIG.name}. All rights reserved.
          </div>
          <div>
            Crafted with precision, high-performance code, and modern aesthetics.
          </div>
        </div>

      </div>
    </footer>
  );
}
