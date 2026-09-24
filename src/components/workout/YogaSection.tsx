import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flower2, Sun, Moon, Wind, Sparkles, Clock, CheckCircle2, Play } from 'lucide-react';
import { mockYogaPoses } from '../../data/mockData';

export const YogaSection: React.FC = () => {
  const [activeRoutine, setActiveRoutine] = useState<'all' | 'morning' | 'evening' | 'meditation'>('all');

  const filteredYoga = mockYogaPoses.filter(
    (y) => activeRoutine === 'all' || y.routineType === activeRoutine
  );

  const handleOpenVideo = (youtubeUrl?: string, title?: string) => {
    const url = youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent((title || '') + ' yoga tutorial')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm space-y-3 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] text-xs font-bold uppercase tracking-wider">
          <Flower2 className="w-3.5 h-3.5" />
          <span>Mindfulness & Flexibility Ecosystem</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
          Yoga Asanas & Breathing Guides
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl font-medium">
          Harmonize parasympathetic nervous response with structured morning sun flows, evening spinal decompression, and Anapana meditation. Click any card to watch guided video tutorials on YouTube.
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          {[
            { id: 'all', label: 'All Routines', icon: Sparkles },
            { id: 'morning', label: 'Morning Flow', icon: Sun },
            { id: 'evening', label: 'Evening Decompression', icon: Moon },
            { id: 'meditation', label: 'Mindful Meditation', icon: Wind },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveRoutine(item.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  activeRoutine === item.id
                    ? 'bg-[#F97316] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#6B7280] border border-[#E5E7EB] hover:text-[#111827]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* YOGA POSES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredYoga.map((pose) => (
          <motion.div
            key={pose.id}
            layout
            role="button"
            tabIndex={0}
            aria-label={`Watch ${pose.sanskritName} (${pose.title}) tutorial on YouTube`}
            onClick={() => handleOpenVideo(pose.youtubeUrl, pose.title)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenVideo(pose.youtubeUrl, pose.title);
              }
            }}
            className="rounded-3xl bg-white border border-[#E5E7EB] shadow-sm overflow-hidden group hover:border-[#F97316]/60 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between text-left cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#F97316]/50"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={pose.image}
                  alt={pose.title}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Subtle Hover Overlay with Play Icon */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-[#F97316] text-white text-xs font-black flex items-center gap-2 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch Tutorial on YouTube</span>
                  </div>
                </div>

                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 border border-[#E5E7EB] text-[#F97316] text-[10px] font-black uppercase shadow-xs">
                  {pose.sanskritName}
                </span>

                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 border border-[#E5E7EB] text-[#111827] text-[10px] font-black flex items-center gap-1 shadow-xs">
                  <Clock className="w-3 h-3 text-[#F97316]" />
                  <span>{pose.durationMinutes} Mins</span>
                </span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-black text-[#111827] group-hover:text-[#F97316] transition-colors">
                      {pose.title}
                    </h3>
                    <span className="text-xs font-bold text-[#6B7280]">Target: {pose.bodyPartTargeted}</span>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-600 text-[11px] font-extrabold group-hover:bg-red-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                    <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                    <span>Watch Tutorial</span>
                  </span>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">Key Health Benefits</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#6B7280] font-medium">
                    {pose.benefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Breathing Guide */}
                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs space-y-1">
                  <span className="text-[10px] font-extrabold uppercase text-[#F97316] flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5" />
                    <span>Breathing Rhythm Guide</span>
                  </span>
                  <p className="text-[#6B7280] font-medium leading-relaxed">
                    {pose.breathingGuide}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
