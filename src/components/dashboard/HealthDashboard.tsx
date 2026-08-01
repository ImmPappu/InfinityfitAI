import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Droplets, 
  Activity, 
  Award, 
  FileText, 
  TrendingUp, 
  Scale, 
  Heart, 
  Moon, 
  Footprints, 
  Zap, 
  Plus, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';
import { exportHealthReportPdf } from '../../utils/pdfExporter';
import { PrintableReport } from '../pdf/PrintableReport';

export const HealthDashboard: React.FC = () => {
  const { profile, metrics, addLogEntry, openOnboarding, setActiveTab } = useUser();
  const { t } = useLanguage();

  const [waterLog, setWaterLog] = useState(0.5);
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
    <div className="space-y-8 pb-16">
      {/* Offscreen Printable Report component for PDF generator */}
      <PrintableReport />

      {/* Top Banner & User Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-slate-800 backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>AI Health Blueprint Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {profile.name} 👋
          </h2>
          <p className="text-xs text-slate-400">
            Goal: <strong className="text-emerald-400 uppercase">{profile.goal} Weight</strong> ({profile.weightKg}kg → {profile.targetWeightKg}kg)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportPdf}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center gap-2 shadow-lg"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>{t('exportPdf')}</span>
          </button>

          <button
            onClick={openOnboarding}
            className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-bold border border-emerald-500/40 transition-all flex items-center gap-2"
          >
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {logNotice && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{logNotice}</span>
        </motion.div>
      )}

      {/* CORE 4 PRIMARY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: BMI Score */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">BMI Score</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Scale className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-black text-white">{metrics.bmi}</span>
            <span className="block text-xs font-bold" style={{ color: metrics.bmiColor }}>
              {metrics.bmiCategory}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-3 border-t border-slate-800/80 pt-2 font-medium">
            Healthy Range: <strong>{metrics.healthyWeightMin} - {metrics.healthyWeightMax} kg</strong>
          </p>
        </div>

        {/* Card 2: Daily Calories */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('dailyCalories')}</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-black text-white">{metrics.dailyCalories}</span>
            <span className="block text-xs font-bold text-cyan-400">kcal / day</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-3 border-t border-slate-800/80 pt-2 font-medium">
            BMR: {metrics.bmr} kcal | TDEE: {metrics.tdee} kcal
          </p>
        </div>

        {/* Card 3: Water Intake */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('waterTarget')}</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Droplets className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-black text-white">{metrics.idealWaterLiters}</span>
            <span className="block text-xs font-bold text-purple-400">Liters / day</span>
          </div>
          <div className="flex items-center gap-2 mt-3 border-t border-slate-800/80 pt-2">
            <button
              onClick={() => handleAddWater(0.25)}
              className="px-2 py-1 rounded-md bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-[10px] font-bold"
            >
              +250ml
            </button>
            <button
              onClick={() => handleAddWater(0.5)}
              className="px-2 py-1 rounded-md bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-[10px] font-bold"
            >
              +500ml
            </button>
          </div>
        </div>

        {/* Card 4: Day Streak */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Fitness Streak</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-black text-white">7 Days</span>
            <span className="block text-xs font-bold text-amber-400">🔥 Active Streak</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-3 border-t border-slate-800/80 pt-2 font-medium">
            Unlocked: 7-Day & Hydration Master
          </p>
        </div>

      </div>

      {/* MACRONUTRIENTS & MICRONUTRIENTS BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Macros Breakdown */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-white">
                Daily Macronutrient Targets
              </h3>
              <p className="text-xs text-slate-400">
                Algorithmically balanced for your {profile.goal} goal
              </p>
            </div>
            <button
              onClick={() => setActiveTab('meals')}
              className="text-xs font-bold text-emerald-400 hover:underline"
            >
              View Meals →
            </button>
          </div>

          <div className="space-y-4">
            {/* Protein */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-400">Protein (g)</span>
                <span className="text-slate-200">{metrics.proteinGrams}g / day</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-[85%]" />
              </div>
            </div>

            {/* Carbs */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-cyan-400">Carbohydrates (g)</span>
                <span className="text-slate-200">{metrics.carbGrams}g / day</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full rounded-full w-[70%]" />
              </div>
            </div>

            {/* Fats */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-purple-400">Dietary Fat (g)</span>
                <span className="text-slate-200">{metrics.fatGrams}g / day</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full w-[60%]" />
              </div>
            </div>

            {/* Fiber & Sugar Limit */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="block text-[10px] font-bold uppercase text-slate-400">Dietary Fiber</span>
                <span className="text-sm font-extrabold text-white">{metrics.fiberGrams}g</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="block text-[10px] font-bold uppercase text-slate-400">Max Sugar Limit</span>
                <span className="text-sm font-extrabold text-amber-400">&lt; {metrics.sugarLimitGrams}g</span>
              </div>
            </div>
          </div>
        </div>

        {/* 12 Micronutrient Meters */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-4">
          <h3 className="text-base font-extrabold text-white">
            12 Essential Micronutrients
          </h3>
          <div className="space-y-2.5 text-xs">
            {[
              { label: 'Calcium', val: `${metrics.calciumMg} mg` },
              { label: 'Iron', val: `${metrics.ironMg} mg` },
              { label: 'Vitamin C', val: `${metrics.vitCMg} mg` },
              { label: 'Vitamin D', val: `${metrics.vitDIu} IU` },
              { label: 'Vitamin B12', val: `${metrics.vitB12Mcg} mcg` },
              { label: 'Magnesium', val: `${metrics.magnesiumMg} mg` },
              { label: 'Potassium', val: `${metrics.potassiumMg} mg` },
              { label: 'Omega 3', val: `${metrics.omega3Grams} g` },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800/60">
                <span className="font-semibold text-slate-300">{m.label}</span>
                <span className="font-black text-emerald-400">{m.val}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
