import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flower2, Sun, Moon, Wind, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { mockYogaPoses } from '../../data/mockData';

export const YogaSection: React.FC = () => {
  const [activeRoutine, setActiveRoutine] = useState<'all' | 'morning' | 'evening' | 'meditation'>('all');

  const filteredYoga = mockYogaPoses.filter(
    (y) => activeRoutine === 'all' || y.routineType === activeRoutine
  );

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
          Harmonize parasympathetic nervous response with structured morning sun flows, evening spinal decompression, and Anapana meditation.
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
            className="rounded-3xl bg-white border border-[#E5E7EB] shadow-sm overflow-hidden group hover:border-[#F97316]/40 hover:shadow-md transition-all flex flex-col justify-between text-left"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-56 w-full overflow-hidden">
                <img src={pose.image} alt={pose.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 border border-[#E5E7EB] text-[#F97316] text-[10px] font-black uppercase">
                  {pose.sanskritName}
                </span>

                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 border border-[#E5E7EB] text-[#111827] text-[10px] font-black flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#F97316]" />
                  <span>{pose.durationMinutes} Mins</span>
                </span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-black text-[#111827] group-hover:text-[#F97316] transition-colors">
                    {pose.title}
                  </h3>
                  <span className="text-xs font-bold text-[#6B7280]">Target: {pose.bodyPartTargeted}</span>
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
