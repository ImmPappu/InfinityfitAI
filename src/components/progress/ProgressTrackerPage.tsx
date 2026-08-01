import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart as LineChartIcon, 
  TrendingUp, 
  Award, 
  Plus, 
  Calendar, 
  Scale, 
  Flame, 
  Droplets, 
  Moon, 
  Smile,
  CheckCircle2
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { useUser } from '../../context/UserContext';
import { mockAchievements } from '../../data/mockData';

export const ProgressTrackerPage: React.FC = () => {
  const { dailyLogs, addLogEntry, profile, metrics } = useUser();

  const [weightInput, setWeightInput] = useState(profile.weightKg.toString());
  const [waterInput, setWaterInput] = useState(profile.waterIntakeLiters.toString());
  const [caloriesInput, setCaloriesInput] = useState(metrics.dailyCalories.toString());
  const [sleepInput, setSleepInput] = useState(profile.sleepHours.toString());
  const [moodInput, setMoodInput] = useState<'Awesome' | 'Good' | 'Neutral' | 'Tired'>('Awesome');

  const handleQuickLog = (e: React.FormEvent) => {
    e.preventDefault();
    addLogEntry({
      weightKg: Number(weightInput),
      waterLiters: Number(waterInput),
      caloriesConsumed: Number(caloriesInput),
      sleepHours: Number(sleepInput),
      mood: moodInput,
      workoutCompleted: true,
    });
    alert('Today\'s health log saved successfully!');
  };

  const chartData = dailyLogs.map((l) => ({
    date: l.date.slice(5),
    weight: l.weightKg,
    target: profile.targetWeightKg,
    calories: l.caloriesConsumed,
    water: l.waterLiters,
  }));

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-slate-800 backdrop-blur-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <LineChartIcon className="w-3.5 h-3.5" />
          <span>Biometric Analytics & Historical Trends</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Progress & Gamification Hub
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl font-medium">
          Visualize weight velocity, caloric adherence, hydration consistency, and unlock milestone achievement badges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RECHARTS WEIGHT VISUALIZATION */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-white">
                Weight Journey Trend (kg)
              </h3>
              <p className="text-xs text-slate-400">
                Current: <strong className="text-white">{profile.weightKg}kg</strong> | Goal: <strong className="text-emerald-400">{profile.targetWeightKg}kg</strong>
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-extrabold">
              Weekly Update
            </span>
          </div>

          {/* Recharts Container */}
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: '#10b981' }} />
                <Line type="monotone" dataKey="target" stroke="#06b6d4" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DAILY LOG FORM CARD */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-400" />
            <span>Quick Daily Log</span>
          </h3>

          <form onSubmit={handleQuickLog} className="space-y-3">
            <div>
              <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                  Water (L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={waterInput}
                  onChange={(e) => setWaterInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                  Calories (kcal)
                </label>
                <input
                  type="number"
                  value={caloriesInput}
                  onChange={(e) => setCaloriesInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                Daily Mood
              </label>
              <select
                value={moodInput}
                onChange={(e) => setMoodInput(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:outline-none focus:border-emerald-500"
              >
                <option value="Awesome">Awesome 🔥</option>
                <option value="Good">Good 😊</option>
                <option value="Neutral">Neutral 😐</option>
                <option value="Tired">Tired 😴</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform"
            >
              Save Daily Metric Entry
            </button>
          </form>
        </div>

      </div>

      {/* GAMIFICATION BADGES */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Gamification Badges & Achievements</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockAchievements.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border backdrop-blur-xl space-y-3 transition-all ${
                badge.unlocked
                  ? 'bg-slate-900/80 border-amber-500/40'
                  : 'bg-slate-950/40 border-slate-800/40 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
                  {badge.icon}
                </span>
                {badge.unlocked ? (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase">
                    Unlocked
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-bold">Locked</span>
                )}
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{badge.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-1 font-medium">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
