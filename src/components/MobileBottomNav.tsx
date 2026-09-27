import React from 'react';
import { Home, FolderGit2, Bot, Video, MessageSquare } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenAiChat: () => void;
  onOpenVeoStudio: () => void;
  onOpenCvModal: () => void;
  onScrollToSection: (id: string) => void;
}

export function MobileBottomNav({
  onOpenAiChat,
  onOpenVeoStudio,
  onScrollToSection,
}: MobileBottomNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-slate-200/80 px-2 py-1.5 shadow-2xl safe-area-bottom">
      <div className="grid grid-cols-5 gap-1 items-center">
        
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Home</span>
        </button>

        <button
          onClick={() => onScrollToSection('work')}
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <FolderGit2 className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Projects</span>
        </button>

        {/* Center Prominent AI Assistant Button */}
        <button
          onClick={onOpenAiChat}
          className="flex flex-col items-center justify-center -mt-4"
          aria-label="Open AI Assistant"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 border-2 border-white animate-bounce-subtle">
            <Bot className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-indigo-700 mt-0.5">AI Chat</span>
        </button>

        <button
          onClick={onOpenVeoStudio}
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <Video className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Studio</span>
        </button>

        <button
          onClick={() => onScrollToSection('contact')}
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Connect</span>
        </button>

      </div>
    </div>
  );
}
