import React, { useState } from 'react';
import { 
  LineChart as LineChartIcon, 
  Award, 
  Plus
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useUser } from '../../context/UserContext';
import { mockAchievements } from '../../data/mockData';

export const ProgressTrackerPage: React.FC = () => {
  const { dailyLogs, addLogEntry, profile, metrics } = useUser();

  const [weightInput, setWeightInput] = useState(profile.weightKg.toString());
  const [waterInput, setWaterInput] = useState(profile.waterIntakeLiters.toString());
  const [caloriesInput, setCaloriesInput] = useState(metrics.dailyCalories.toString());
  const [sleepInput] = useState(profile.sleepHours.toString());
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
    alert("Today's health log saved successfully!");
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
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm space-y-3 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
          <LineChartIcon className="w-3.5 h-3.5" />
          <span>Biometric Analytics & Historical Trends</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
          Body Analytics & Progress
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl font-medium">
          Visualize weight velocity, caloric adherence, hydration consistency, and unlock milestone achievement badges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RECHARTS WEIGHT VISUALIZATION */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm space-y-6 text-left">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-[#111827]">
                Weight Journey Trend (kg)
              </h3>
              <p className="text-xs text-[#6B7280]">
                Current: <strong className="text-[#111827]">{profile.weightKg}kg</strong> | Goal: <strong className="text-[#22C55E]">{profile.targetWeightKg}kg</strong>
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E] text-xs font-extrabold">
              Weekly Update
            </span>
          </div>

          {/* Recharts Container */}
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#6B7280" tick={{ fontSize: 12 }} />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#6B7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', borderRadius: '12px', color: '#111827', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Line type="monotone" dataKey="weight" stroke="#22C55E" strokeWidth={3} dot={{ r: 5, fill: '#22C55E' }} />
                <Line type="monotone" dataKey="target" stroke="#06B6D4" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DAILY LOG FORM CARD */}
        <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm space-y-4 text-left">
          <h3 className="text-base font-extrabold text-[#111827] flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#22C55E]" />
            <span>Quick Daily Log</span>
          </h3>

          <form onSubmit={handleQuickLog} className="space-y-3">
            <div>
              <label className="block text-[10px] font-extrabold uppercase text-[#6B7280] mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-xs font-bold focus:outline-none focus:border-[#22C55E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-[#6B7280] mb-1">
                  Water (L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={waterInput}
                  onChange={(e) => setWaterInput(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-xs font-bold focus:outline-none focus:border-[#22C55E]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-[#6B7280] mb-1">
                  Calories (kcal)
                </label>
                <input
                  type="number"
                  value={caloriesInput}
                  onChange={(e) => setCaloriesInput(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-xs font-bold focus:outline-none focus:border-[#22C55E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase text-[#6B7280] mb-1">
                Daily Mood
              </label>
              <select
                value={moodInput}
                onChange={(e) => setMoodInput(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-xs font-bold focus:outline-none focus:border-[#22C55E]"
              >
                <option value="Awesome">Awesome 🔥</option>
                <option value="Good">Good 😊</option>
                <option value="Neutral">Neutral 😐</option>
                <option value="Tired">Tired 😴</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] text-white font-black text-xs shadow-xs transition-all"
            >
              Save Daily Metric Entry
            </button>
          </form>
        </div>

      </div>

      {/* GAMIFICATION BADGES */}
      <div className="space-y-4 text-left">
        <h3 className="text-xl font-extrabold text-[#111827] flex items-center gap-2">
          <Award className="w-5 h-5 text-[#F97316]" />
          <span>Achievements & Badges</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockAchievements.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border space-y-3 transition-all ${
                badge.unlocked
                  ? 'bg-white border-[#E5E7EB] shadow-sm'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl p-2.5 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB]">
                  {badge.icon}
                </span>
                {badge.unlocked ? (
                  <span className="px-2.5 py-1 rounded-md bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-black uppercase">
                    Unlocked
                  </span>
                ) : (
                  <span className="text-[10px] text-[#6B7280] font-bold">Locked</span>
                )}
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#111827]">{badge.title}</h4>
                <p className="text-[11px] text-[#6B7280] leading-relaxed mt-1 font-medium">
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
