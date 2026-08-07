import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  Home, 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2,
  Sparkles,
  Flame,
  Clock,
  Target
} from 'lucide-react';
import { mockExerciseItems } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

export const WorkoutPlannerPage: React.FC = () => {
  const { language } = useLanguage();
  
  // 1. Primary Location Tab: Gym vs Home
  const [activeLocation, setActiveLocation] = useState<'gym' | 'home'>('home');
  
  // 2. Secondary Goal Filter: All, Weight Gain, Weight Loss
  const [activeGoalFilter, setActiveGoalFilter] = useState<'all' | 'weight_gain' | 'weight_loss'>('all');
  
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const isHindi = language === 'hi';

  // Filter exercises by Location & Goal
  const filteredExercises = mockExerciseItems.filter((ex) => {
    const matchesLocation = ex.location === activeLocation;
    const matchesGoal = activeGoalFilter === 'all' || ex.goalType === activeGoalFilter;
    return matchesLocation && matchesGoal;
  });

  const toggleComplete = (id: string) => {
    setCompletedExercises((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 shadow-xl space-y-4 text-left text-white">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-[#06B6D4] text-xs font-bold uppercase tracking-wider">
          <Dumbbell className="w-4 h-4" />
          <span>{isHindi ? 'वर्कआउट प्लैनर & गाइडेड एक्सरसाइज' : 'Smart Workout & Exercise Planner'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {isHindi ? 'टारगेटेड वर्कआउट रूटीन' : 'Precision Targeted Workout Routines'}
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium leading-relaxed">
          {isHindi 
            ? 'अपनी सुविधा के अनुसार होम वर्कआउट (Home Workout) या जिम (Gym Workout) चुनें और वजन बढ़ाने (Weight Gain) या वजन घटाने (Weight Loss) के अनुसार फिल्टर करें।' 
            : 'Choose between Home & Gym routines. Filter specifically for Weight Gain or Weight Loss with guided sets, reps, and calorie metrics.'}
        </p>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: PRIMARY LOCATION TABS (GYM vs HOME) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
        <button
          onClick={() => setActiveLocation('home')}
          className={`flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all ${
            activeLocation === 'home'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md scale-[1.02]'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>{isHindi ? '🏠 घर पर वर्कआउट (Home)' : '🏠 Home Workout'}</span>
        </button>

        <button
          onClick={() => setActiveLocation('gym')}
          className={`flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all ${
            activeLocation === 'gym'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md scale-[1.02]'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>{isHindi ? '🏋️‍♂️ जिम वर्कआउट (Gym)' : '🏋️‍♂️ Gym Workout'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: GOAL FILTER BUTTONS (WEIGHT GAIN / WEIGHT LOSS / ALL) */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {/* All Workouts Filter */}
        <button
          onClick={() => setActiveGoalFilter('all')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black transition-all border ${
            activeGoalFilter === 'all'
              ? 'bg-slate-900 text-white border-slate-700 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{isHindi ? 'सभी वर्कआउट (All)' : 'All Workouts'}</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300">
            {mockExerciseItems.filter(e => e.location === activeLocation).length}
          </span>
        </button>

        {/* Weight Gain Filter */}
        <button
          onClick={() => setActiveGoalFilter('weight_gain')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black transition-all border ${
            activeGoalFilter === 'weight_gain'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/30'
              : 'bg-emerald-50/80 text-emerald-700 border-emerald-200 hover:bg-emerald-100/80'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isHindi ? '📈 वजन बढ़ाएं (Weight Gain)' : '📈 Weight Gain'}</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-[10px] font-bold text-white">
            {mockExerciseItems.filter(e => e.location === activeLocation && e.goalType === 'weight_gain').length}
          </span>
        </button>

        {/* Weight Loss Filter */}
        <button
          onClick={() => setActiveGoalFilter('weight_loss')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black transition-all border ${
            activeGoalFilter === 'weight_loss'
              ? 'bg-orange-600 text-white border-orange-500 shadow-md ring-2 ring-orange-400/30'
              : 'bg-orange-50/80 text-orange-700 border-orange-200 hover:bg-orange-100/80'
          }`}
        >
          <TrendingDown className="w-3.5 h-3.5 text-orange-400" />
          <span>{isHindi ? '📉 वजन घटाएं (Weight Loss)' : '📉 Weight Loss'}</span>
          <span className="px-2 py-0.5 rounded-full bg-orange-700 text-[10px] font-bold text-white">
            {mockExerciseItems.filter(e => e.location === activeLocation && e.goalType === 'weight_loss').length}
          </span>
        </button>
      </div>

      {/* Active Filter Description Banner */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs font-semibold text-slate-700">
        <span className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#06B6D4]" />
          <span>
            {activeLocation === 'home' 
              ? (isHindi ? 'घरेलू वर्कआउट सूची (No Equipment Required)' : 'Home Workouts (Bodyweight / Minimal Equipment)') 
              : (isHindi ? 'जिम वर्कआउट सूची (Barbell & Machines)' : 'Gym Workouts (Barbells, Dumbbells & Cable Machines)')}
          </span>
        </span>
        <span className="font-bold text-[#06B6D4]">
          {filteredExercises.length} {isHindi ? 'वर्कआउट उपलब्ध' : 'Routines Available'}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: WORKOUT CARDS GRID (At least 10+ Workouts) */}
      {/* ========================================================================= */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredExercises.map((ex) => {
            const isDone = completedExercises.includes(ex.id);
            const isGain = ex.goalType === 'weight_gain';

            return (
              <motion.div
                key={ex.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`p-6 rounded-3xl bg-white border shadow-sm transition-all space-y-4 flex flex-col justify-between text-left ${
                  isDone 
                    ? 'border-emerald-500 bg-emerald-500/5 ring-2 ring-emerald-500/20' 
                    : 'border-slate-200 hover:border-[#06B6D4]/50 hover:shadow-lg'
                }`}
              >
                <div className="space-y-4">
                  
                  {/* Top Bar: Icon + Goal Tag */}
                  <div className="flex items-center justify-between">
                    <span className="text-4xl p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                      {ex.illustration}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        isGain 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600' 
                          : 'bg-orange-500/10 border-orange-500/30 text-orange-600'
                      }`}>
                        {isGain 
                          ? (isHindi ? '📈 वजन बढ़ाएं' : '📈 Weight Gain') 
                          : (isHindi ? '📉 वजन घटाएं' : '📉 Weight Loss')}
                      </span>
                    </div>
                  </div>

                  {/* Title & Muscle Tags */}
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-snug">{ex.title}</h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {ex.targetedMuscles.map((m, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs font-bold">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">{isHindi ? 'सेट्स' : 'SETS'}</span>
                      <span className="text-slate-900 font-black">{ex.sets} Sets</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">{isHindi ? 'रेप्स' : 'REPS'}</span>
                      <span className="text-slate-900 font-black text-[11px]">{ex.reps}</span>
                    </div>
                    <div>
                      <span className="text-orange-500 block text-[9px] uppercase font-bold flex items-center justify-center gap-0.5">
                        <Flame className="w-3 h-3" />
                        {isHindi ? 'कैलोरी' : 'BURN'}
                      </span>
                      <span className="text-orange-600 font-black">{ex.caloriesBurned} kcal</span>
                    </div>
                  </div>

                  {/* Rest Time & Form Tip */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1 text-[11px] font-semibold">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {isHindi ? 'आराम:' : 'Rest:'} {ex.restTimeSec}s
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-200/60 text-slate-700 text-[10px] font-black uppercase">
                      {ex.difficulty}
                    </span>
                  </div>

                </div>

                {/* Mark Routine Complete Button */}
                <button
                  onClick={() => toggleComplete(ex.id)}
                  className={`w-full py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isDone ? 'text-white' : 'text-emerald-400'}`} />
                  <span>
                    {isDone 
                      ? (isHindi ? 'आज पूरा हो गया! 🎉' : 'Completed Today! 🎉') 
                      : (isHindi ? 'वर्कआउट पूरा मार्क करें' : 'Mark Routine Complete')}
                  </span>
                </button>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

    </div>
  );
};
