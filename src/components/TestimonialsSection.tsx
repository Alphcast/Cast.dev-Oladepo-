import { useState } from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference image: TESTIMONIALS / What Clients Say */}
        <div className="mb-10 text-left flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
              TESTIMONIALS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a]">
              What Clients & Teams Say
            </h2>
          </div>
        </div>

        {/* 3 Testimonials in a row matching reference image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover rounded-[26px] p-6 sm:p-7 flex flex-col justify-between border border-white relative shadow-xs"
            >
              <div>
                {/* Quote Icon matching reference image */}
                <div className="text-indigo-400 mb-3 opacity-60">
                  <Quote className="w-6 h-6 fill-indigo-100" />
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Author footer matching reference image */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border border-white text-indigo-700 flex items-center justify-center font-bold text-xs shadow-xs">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0f172a]">
                    {item.author}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {item.role}, {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
