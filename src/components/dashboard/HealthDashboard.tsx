import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  Droplets,
  Award,
  FileText,
  Scale,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Utensils
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';
import { exportHealthReportPdf } from '../../utils/pdfExporter';
import { PrintableReport } from '../pdf/PrintableReport';

export const HealthDashboard: React.FC = () => {
  const { profile, metrics, addLogEntry, openOnboarding, setActiveTab } = useUser();
  const { t } = useLanguage();

  const [logNotice, setLogNotice] = useState<string | null>(null);

  const handleAddWater = (liters: number) => {
    addLogEntry({ waterLiters: (profile.waterIntakeLiters || 0) + liters });
    setLogNotice(`Logged +${liters}L Water!`);
    setTimeout(() => setLogNotice(null), 3000);
  };

  const handleExportPdf = () => {
    exportHealthReportPdf(profile, metrics);
  };

  return (
    <div className="space-y-8 pb-16 text-left">
      {/* Offscreen Printable Report component for PDF generator */}
      <PrintableReport />

      {/* ========================================================================= */}
      {/* 3. HERO BANNER - LIGHT & CLEAN */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-[#22C55E]" />
            <span>AI Health Blueprint Active</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
            Welcome Back 👋
          </h1>
          <p className="text-sm font-medium text-[#6B7280]">
            Today's Health Summary • Goal: <strong className="text-[#111827] uppercase">{profile.goal} Weight</strong> ({profile.weightKg}kg → {profile.targetWeightKg}kg)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportPdf}
            className="px-5 py-3 rounded-full bg-white hover:bg-[#F8FAFC] text-[#111827] text-xs font-black border border-[#E5E7EB] shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-[#22C55E]" />
            <span>{t('exportPdf')}</span>
          </button>

          <button
            onClick={openOnboarding}
            className="px-6 py-3 rounded-full bg-[#22C55E] hover:bg-[#16a34a] text-white text-xs font-black shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {logNotice && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-[#ECFDF5] border border-[#22C55E]/30 text-[#22C55E] text-xs font-extrabold flex items-center gap-2 shadow-xs"
        >
          <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
          <span>{logNotice}</span>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 1 & 4. SUBTLE TINTED CARDS WITH REVERSED HIERARCHY (NUMBERS LARGEST) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Card 1: BMI Score (Light Green #ECFDF5) */}
        <div 
          onClick={() => setActiveTab('calculators')}
          className="p-6 rounded-3xl bg-[#ECFDF5] border border-[#22C55E]/20 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer space-y-3 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#6B7280]">BMI Score</span>
            <div className="p-2 rounded-xl bg-white/80 border border-[#22C55E]/20 text-[#22C55E]">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-[#111827]">{metrics.bmi}</div>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-extrabold text-[#22C55E]">
              <span>🟢</span>
              <span>{metrics.bmiCategory}</span>
            </div>
          </div>
          <div className="border-t border-[#22C55E]/15 pt-2 flex items-center justify-between text-[11px] font-bold text-[#6B7280]">
            <span>Range: {metrics.healthyWeightMin}-{metrics.healthyWeightMax}kg</span>
            <span className="text-[#22C55E] font-extrabold flex items-center gap-0.5">Details <ArrowRight className="w-3 h-3" /></span>
          </div>
        </div>

        {/* Card 2: Daily Calories (Light Orange #FFF7ED) */}
        <div 
          onClick={() => setActiveTab('meals')}
          className="p-6 rounded-3xl bg-[#FFF7ED] border border-[#F97316]/20 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer space-y-3 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#6B7280]">Daily Calories</span>
            <div className="p-2 rounded-xl bg-white/80 border border-[#F97316]/20 text-[#F97316]">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-[#111827]">{metrics.dailyCalories} <span className="text-sm font-bold text-[#6B7280]">kcal</span></div>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-extrabold text-[#F97316]">
              <span>🔥</span>
              <span>Daily Caloric Goal</span>
            </div>
          </div>
          <div className="border-t border-[#F97316]/15 pt-2 flex items-center justify-between text-[11px] font-bold text-[#6B7280]">
            <span>BMR: {metrics.bmr} kcal</span>
            <span className="text-[#F97316] font-extrabold flex items-center gap-0.5">Meals <ArrowRight className="w-3 h-3" /></span>
          </div>
        </div>

        {/* Card 3: Water Target (Light Blue #EFF6FF) */}
        <div className="p-6 rounded-3xl bg-[#EFF6FF] border border-[#3B82F6]/20 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#6B7280]">Water Target</span>
            <div className="p-2 rounded-xl bg-white/80 border border-[#3B82F6]/20 text-[#3B82F6]">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-[#111827]">{metrics.idealWaterLiters} <span className="text-sm font-bold text-[#6B7280]">Liters</span></div>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-extrabold text-[#3B82F6]">
              <span>💧</span>
              <span>Daily Hydration Target</span>
            </div>
          </div>
          <div className="border-t border-[#3B82F6]/15 pt-2 flex items-center gap-2">
            <button
              onClick={() => handleAddWater(0.25)}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-[#3B82F6] hover:text-white border border-[#3B82F6]/30 text-[#3B82F6] text-[10px] font-extrabold transition-all"
            >
              +250ml
            </button>
            <button
              onClick={() => handleAddWater(0.5)}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-[#3B82F6] hover:text-white border border-[#3B82F6]/30 text-[#3B82F6] text-[10px] font-extrabold transition-all"
            >
              +500ml
            </button>
          </div>
        </div>

        {/* Card 4: Day Streak (Light Purple #F5F3FF) */}
        <div 
          onClick={() => setActiveTab('progress')}
          className="p-6 rounded-3xl bg-[#F5F3FF] border border-[#8B5CF6]/20 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer space-y-3 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#6B7280]">Fitness Streak</span>
            <div className="p-2 rounded-xl bg-white/80 border border-[#8B5CF6]/20 text-[#8B5CF6]">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-[#111827]">7 <span className="text-sm font-bold text-[#6B7280]">Days</span></div>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-extrabold text-[#8B5CF6]">
              <span>🏆</span>
              <span>Active Streak</span>
            </div>
          </div>
          <div className="border-t border-[#8B5CF6]/15 pt-2 flex items-center justify-between text-[11px] font-bold text-[#6B7280]">
            <span>Badges: 2 Unlocked</span>
            <span className="text-[#8B5CF6] font-extrabold flex items-center gap-0.5">Badges <ArrowRight className="w-3 h-3" /></span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. APPLE HEALTH-STYLE CIRCULAR PROGRESS & RING CHARTS */}
      {/* ========================================================================= */}
      <div className="bg-white border border-[#E5E7EB] p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-[#111827]">Activity & Macronutrient Rings</h3>
            <p className="text-xs text-[#6B7280]">Daily completion rates calculated by InfinityFitAI engine.</p>
          </div>
          <button onClick={() => setActiveTab('progress')} className="px-4 py-2 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-xs font-extrabold hover:bg-slate-100 transition-all">
            View Analytics →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          
          {/* Ring 1: Calories (Orange Ring) */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-3 flex flex-col items-center">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-[#E5E7EB]" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-[#F97316]" strokeDasharray="80, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute text-center">
                <span className="text-lg font-black text-[#111827]">80%</span>
                <span className="block text-[9px] font-extrabold text-[#6B7280] uppercase">CALORIES</span>
              </div>
            </div>
            <span className="text-xs font-bold text-[#111827]">{metrics.dailyCalories} kcal Target</span>
          </div>

          {/* Ring 2: Protein (Green Ring) */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-3 flex flex-col items-center">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-[#E5E7EB]" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-[#22C55E]" strokeDasharray="88, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute text-center">
                <span className="text-lg font-black text-[#111827]">88%</span>
                <span className="block text-[9px] font-extrabold text-[#6B7280] uppercase">PROTEIN</span>
              </div>
            </div>
            <span className="text-xs font-bold text-[#111827]">{metrics.proteinGrams}g Protein</span>
          </div>

          {/* Ring 3: Hydration (Blue Ring) */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-3 flex flex-col items-center">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-[#E5E7EB]" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-[#3B82F6]" strokeDasharray="75, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute text-center">
                <span className="text-lg font-black text-[#111827]">75%</span>
                <span className="block text-[9px] font-extrabold text-[#6B7280] uppercase">WATER</span>
              </div>
            </div>
            <span className="text-xs font-bold text-[#111827]">{metrics.idealWaterLiters} L Water</span>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 8. APPLE HEALTH EMPTY STATE CARD DEMO */}
      {/* ========================================================================= */}
      <div className="bg-white border border-[#E5E7EB] p-8 rounded-3xl shadow-xs text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-[#F8FAFC] border border-[#E5E7EB] mx-auto flex items-center justify-center text-3xl">
          🥗
        </div>
        <div className="space-y-1 max-w-sm mx-auto">
          <h3 className="text-lg font-extrabold text-[#111827]">Personalized Meal Plan Active</h3>
          <p className="text-xs text-[#6B7280]">Access your tailored high-protein recipes & grocery shopping lists.</p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => setActiveTab('meals')}
            className="px-6 py-3 rounded-full bg-[#22C55E] hover:bg-[#16a34a] text-white font-extrabold text-xs shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            <span>Open Meal Planner</span>
          </button>
        </div>
      </div>

    </div>
  );
};
