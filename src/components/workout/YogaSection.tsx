import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flower2, Sun, Moon, Wind, HeartHandshake, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { mockYogaPoses } from '../../data/mockData';
import type { YogaPose } from '../../types';

export const YogaSection: React.FC = () => {
  const [activeRoutine, setActiveRoutine] = useState<'all' | 'morning' | 'evening' | 'meditation'>('all');

  const filteredYoga = mockYogaPoses.filter(
    (y) => activeRoutine === 'all' || y.routineType === activeRoutine
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-orange-950/80 border border-slate-800 backdrop-blur-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Flower2 className="w-3.5 h-3.5" />
          <span>Mindfulness & Flexibility Ecosystem</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Yoga Asanas & Breathing Guides
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl font-medium">
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
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
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
            className="rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl overflow-hidden group hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-56 w-full overflow-hidden">
                <img src={pose.image} alt={pose.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-amber-400 text-[10px] font-black uppercase">
                  {pose.sanskritName}
                </span>

                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-white text-[10px] font-black flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{pose.durationMinutes} Mins</span>
                </span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                    {pose.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-400">Target: {pose.bodyPartTargeted}</span>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Key Health Benefits</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-medium">
                    {pose.benefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Breathing Guide */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <span className="text-[10px] font-extrabold uppercase text-amber-400 flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5" />
                    <span>Breathing Rhythm Guide</span>
                  </span>
                  <p className="text-slate-300 font-medium leading-relaxed">
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
