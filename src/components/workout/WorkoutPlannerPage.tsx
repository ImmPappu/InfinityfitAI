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
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm space-y-3 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] text-xs font-bold uppercase tracking-wider">
          <Dumbbell className="w-3.5 h-3.5" />
          <span>Biomechanical Strength & Hypertrophy</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
          Targeted Workout Routines
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl font-medium">
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
                ? 'bg-[#06B6D4] text-white shadow-xs'
                : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#111827]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* EXERCISES GRID (Big Illustrations, Targeted Muscles, Calories Burned, Difficulty) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((ex) => {
          const isDone = completedExercises.includes(ex.id);
          return (
            <motion.div
              key={ex.id}
              layout
              className={`p-6 rounded-3xl bg-white border shadow-sm transition-all space-y-4 flex flex-col justify-between text-left ${
                isDone ? 'border-[#22C55E] bg-[#22C55E]/5' : 'border-[#E5E7EB] hover:border-[#06B6D4]/40 hover:shadow-md'
              }`}
            >
              <div className="space-y-4">
                
                {/* Big Illustration Header */}
                <div className="flex items-center justify-between">
                  <span className="text-5xl p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] shadow-xs">
                    {ex.illustration}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] text-[10px] font-black uppercase">
                    {ex.difficulty}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#111827]">{ex.title}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {ex.targetedMuscles.map((m, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-[#F8FAFC] border border-[#E5E7EB] text-[10px] font-bold text-[#6B7280]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-center text-xs font-bold">
                  <div>
                    <span className="text-[#6B7280] block text-[10px] uppercase font-bold">SETS</span>
                    <span className="text-[#111827] font-black">{ex.sets} Sets</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block text-[10px] uppercase font-bold">REPS</span>
                    <span className="text-[#111827] font-black">{ex.reps}</span>
                  </div>
                  <div>
                    <span className="text-[#F97316] block text-[10px] uppercase font-bold">BURN</span>
                    <span className="text-[#F97316] font-black">{ex.caloriesBurned} kcal</span>
                  </div>
                </div>

                {/* Video Guide Link */}
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  💡 <strong className="text-[#111827]">Form Tip:</strong> Keep core tight, control the eccentric motion, and breathe out on exertion.
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => toggleComplete(ex.id)}
                className={`w-full py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
                  isDone
                    ? 'bg-[#22C55E] text-white shadow-xs'
                    : 'bg-[#F8FAFC] hover:bg-slate-100 text-[#111827] border border-[#E5E7EB]'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isDone ? 'text-white' : 'text-[#6B7280]'}`} />
                <span>{isDone ? 'Completed Today!' : 'Mark Routine Complete'}</span>
              </button>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
