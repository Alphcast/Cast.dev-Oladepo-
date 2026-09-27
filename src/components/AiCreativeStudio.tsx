import { useState } from 'react';
import { Play, Film, Clock, X, Volume2, Sparkles } from 'lucide-react';
import { CREATIVE_STUDIO_VIDEOS, CreativeVideoItem } from '../data/portfolioData';

interface AiCreativeStudioProps {
  onOpenVeoStudio?: () => void;
}

export function AiCreativeStudio({ onOpenVeoStudio }: AiCreativeStudioProps) {
  const [selectedVideo, setSelectedVideo] = useState<CreativeVideoItem | null>(null);

  return (
    <section id="ai-studio" className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
              AI CREATIVE STUDIO
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a]">
              Commercial Video & Creative Campaigns
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {onOpenVeoStudio && (
              <button
                onClick={onOpenVeoStudio}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Launch Veo 3.1 Video Studio</span>
              </button>
            )}
            <span className="text-xs text-slate-500 font-mono hidden md:inline">
              4K Commercial Masters & Viral Formats
            </span>
          </div>
        </div>

        {/* 2-Card Prominent Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CREATIVE_STUDIO_VIDEOS.slice(0, 2).map((video) => (
            <div
              key={video.id}
              className="glass-card glass-card-hover rounded-[28px] overflow-hidden p-4 sm:p-5 flex flex-col justify-between border border-white group"
            >
              <div>
                {/* Video Preview Frame */}
                <div
                  className="relative rounded-[22px] overflow-hidden aspect-[16/9] mb-4 bg-slate-900 cursor-pointer shadow-inner"
                  onClick={() => setSelectedVideo(video)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-slate-900 ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    <span>{video.duration}</span>
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-indigo-600 mb-1">
                  {video.category}
                </div>
                <h3 className="text-base font-bold text-[#0f172a] mb-2 group-hover:text-indigo-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {video.description}
                </p>
              </div>

              {/* Tools Pill Badges */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500">
                  {video.tools.slice(0, 3).map((tool) => (
                    <span key={tool} className="bg-slate-100 px-2 py-0.5 rounded-full">
                      {tool}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedVideo(video)}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Play Reel ↗
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Video Reel Modal */}
        {selectedVideo && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="glass-card rounded-[32px] p-6 sm:p-8 max-w-2xl w-full bg-white relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-4 relative bg-slate-950">
                <img
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-xs">
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-indigo-500" />
                  </div>
                  <span className="font-mono text-[10px]">00:15 / {selectedVideo.duration}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#0f172a] mb-1">
                {selectedVideo.title}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {selectedVideo.description}
              </p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-mono text-slate-600 mb-4">
                <strong className="text-indigo-600 block mb-1">Prompt Recipe:</strong>
                "{selectedVideo.promptRecipe}"
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0f172a] rounded-full"
                >
                  Close Reel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
