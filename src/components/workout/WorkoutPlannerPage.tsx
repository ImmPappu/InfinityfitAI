import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  Flame, 
  Clock, 
  Target, 
  CheckCircle2, 
  Sparkles, 
  Activity,
  Layers
} from 'lucide-react';
import { mockExerciseItems } from '../../data/mockData';
import type { ExerciseItem } from '../../types';

export const WorkoutPlannerPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Routines' },
    { id: 'muscle_building', label: 'Muscle Building' },
    { id: 'weight_gain', label: 'Weight Gain' },
    { id: 'fat_loss', label: 'Fat Loss' },
    { id: 'home', label: 'Home Workout' },
    { id: 'gym', label: 'Gym Workout' },
  ];

  const filteredExercises = mockExerciseItems.filter(
    (ex) => selectedCategory === 'all' || ex.category === selectedCategory
  );

  const toggleComplete = (id: string) => {
    setCompletedExercises((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/80 border border-slate-800 backdrop-blur-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Dumbbell className="w-3.5 h-3.5" />
          <span>Biomechanical Hypertrophy & Fat Loss</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Targeted Workout Algorithms
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl font-medium">
          Personalized sets, reps, rest durations, and muscle targeted breakdowns for peak strength adaptation.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* EXERCISES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((ex) => {
          const isDone = completedExercises.includes(ex.id);
          return (
            <motion.div
              key={ex.id}
              layout
              className={`p-6 rounded-3xl bg-slate-900/80 border backdrop-blur-xl transition-all space-y-4 flex flex-col justify-between ${
                isDone ? 'border-emerald-500/60 bg-emerald-950/20' : 'border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    {ex.illustration}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase">
                    {ex.difficulty}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">{ex.title}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ex.targetedMuscles.map((m, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-bold text-slate-400">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center text-[10px] font-bold">
                  <div>
                    <span className="text-slate-400 block">SETS & REPS</span>
                    <span className="text-white text-xs font-black">{ex.sets} Sets x {ex.reps}</span>
                  </div>
                  <div>
                    <span className="text-cyan-400 block">REST</span>
                    <span className="text-cyan-400 text-xs font-black">{ex.restTimeSec}s</span>
                  </div>
                  <div>
                    <span className="text-amber-400 block">BURN</span>
                    <span className="text-amber-400 text-xs font-black">{ex.caloriesBurned} kcal</span>
                  </div>
                </div>
              </div>

              {/* Complete Toggle */}
              <button
                onClick={() => toggleComplete(ex.id)}
                className={`w-full py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
                  isDone
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isDone ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span>{isDone ? 'Completed' : 'Mark as Completed'}</span>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
