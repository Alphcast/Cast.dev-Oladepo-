import React, { useState, useEffect } from 'react';
import { X, Smartphone, Download, Share2, PlusSquare, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PwaInstallModal({ isOpen, onClose }: PwaInstallModalProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIos(/iphone|ipad|ipod/.test(userAgent));

    // Listen for BeforeInstallPrompt event on Android / Chromium
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-md rounded-[32px] bg-white p-6 sm:p-8 shadow-2xl border border-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Icon */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-500/20 shrink-0 bg-slate-900">
            <img src="/GOOD.png" alt="CAST DEV App Icon" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3 h-3" />
              <span>PWA Ready</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              Install CAST DEV Mobile App
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant offline access, AI chat & CBT showcase
            </p>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-6 text-center">
          <div>
            <span className="block text-xs font-bold text-indigo-700">Offline</span>
            <span className="text-[10px] text-slate-500">Service Worker</span>
          </div>
          <div className="border-x border-slate-200">
            <span className="block text-xs font-bold text-indigo-700">Zero App Store</span>
            <span className="text-[10px] text-slate-500">Instant Launch</span>
          </div>
          <div>
            <span className="block text-xs font-bold text-indigo-700">Native Feel</span>
            <span className="text-[10px] text-slate-500">Full Screen</span>
          </div>
        </div>

        {/* Platform Specific Instructions */}
        {isInstalled ? (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Application is already installed in Standalone mode on this device!</span>
          </div>
        ) : isIos ? (
          <div className="space-y-3 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-slate-700">
            <p className="font-bold text-indigo-950 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-indigo-600" />
              <span>How to install on iPhone & iPad:</span>
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-1 text-[11px] leading-relaxed">
              <li>Tap the <strong className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white font-mono"><Share2 className="w-3 h-3 text-indigo-600" /> Share</strong> button in Safari toolbar.</li>
              <li>Scroll down and select <strong className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white font-mono"><PlusSquare className="w-3 h-3 text-indigo-600" /> Add to Home Screen</strong>.</li>
              <li>Tap <strong>Add</strong> in the top-right corner to launch anytime!</li>
            </ol>
          </div>
        ) : deferredPrompt ? (
          <button
            onClick={handleInstallClick}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Install App on Device</span>
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <p className="font-bold text-slate-800 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-indigo-600" />
              <span>Install via Browser Menu</span>
            </p>
            <p className="text-[11px] leading-relaxed">
              Open your browser menu (⋮ in Chrome/Edge) and select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong> to experience CAST DEV as a native app.
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Version 2.4.0 (PWA Mobile)</span>
          <span className="font-mono text-indigo-600">@Alphcast</span>
        </div>

      </div>
    </div>
  );
}
