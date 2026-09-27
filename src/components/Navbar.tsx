import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Download, Terminal, Sparkles, Smartphone } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface NavbarProps {
  onOpenCvModal: () => void;
  onToggleTerminal?: () => void;
  onOpenAiChat?: () => void;
  onOpenMobileSimulator?: () => void;
  onOpenPwaModal?: () => void;
}

export function Navbar({
  onOpenCvModal,
  onToggleTerminal,
  onOpenAiChat,
  onOpenMobileSimulator,
  onOpenPwaModal,
}: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'projects', 'process', 'github-activity', 'contact'];
      const scrollY = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Work', href: '#projects', id: 'projects' },
    { name: 'Process', href: '#process', id: 'process' },
    { name: 'GitHub', href: '#github-activity', id: 'github-activity' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between glass-nav rounded-full px-4 sm:px-6 py-2.5 shadow-sm pointer-events-auto">
        
        {/* Brand Left Lockup matching reference image */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#0f172a] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-indigo-600 transition-colors">
            O
          </div>
          <div className="text-left hidden xs:block">
            <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
              Oladepo Rokeeb
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Senior Full-Stack & AI
            </div>
          </div>
        </a>

        {/* Center Navigation Links with Active Pill indicator */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-slate-100 text-slate-950 font-semibold shadow-xs'
                    : 'hover:text-slate-900 hover:bg-slate-50/80'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Actions Right */}
        <div className="flex items-center gap-2">
          {onToggleTerminal && (
            <button
              onClick={onToggleTerminal}
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100/80 rounded-full transition-colors hidden sm:flex items-center"
              title="Interactive Terminal"
              aria-label="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
          )}

          {onOpenAiChat && (
            <button
              onClick={onOpenAiChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full hover:bg-indigo-100 transition-colors shadow-xs"
              title="Chat with Oladepo's AI Architect"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          )}

          {onOpenMobileSimulator && (
            <button
              onClick={onOpenMobileSimulator}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200/80 rounded-full hover:bg-slate-50 transition-colors shadow-xs"
              title="Switch to Mobile App View"
            >
              <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden lg:inline">Mobile App</span>
            </button>
          )}

          <button
            onClick={onOpenCvModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200/80 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>CV</span>
          </button>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-semibold text-white bg-[#0f172a] rounded-full hover:bg-slate-800 transition-all shadow-sm hover:shadow"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 md:hidden text-slate-700 hover:text-slate-900"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-sm mx-auto glass-card rounded-2xl p-4 shadow-xl pointer-events-auto space-y-2 border border-slate-200">
          <div className="grid grid-cols-2 gap-1 text-xs font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-slate-100/80 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
            {onOpenAiChat && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiChat();
                }}
                className="flex-1 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-full text-center flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Ask AI</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCvModal();
              }}
              className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-full text-center"
            >
              Download CV
            </button>
            {onToggleTerminal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onToggleTerminal();
                }}
                className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-full"
              >
                CLI
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
