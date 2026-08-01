import React, { useState } from 'react';
import { Calculator, Scale, Flame, Droplets, PieChart } from 'lucide-react';
import { calculateHealthMetrics } from '../../utils/healthEngine';
import type { UserProfile } from '../../types';

export const CalculatorsHub: React.FC = () => {
  const [calcType, setCalcType] = useState<'bmi' | 'bmr' | 'ideal' | 'macro' | 'water' | 'calorie'>('bmi');

  // Input states
  const [weight, setWeight] = useState(74);
  const [height, setHeight] = useState(178);
  const [age, setAge] = useState(27);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'athlete'>('moderate');
  const [goal, setGoal] = useState<'lose' | 'gain' | 'maintain'>('lose');

  const tempProfile: UserProfile = {
    name: 'User',
    gender,
    age,
    heightCm: height,
    weightKg: weight,
    targetWeightKg: 68,
    goal,
    bodyType: 'average',
    activityLevel: activity,
    dietPreference: 'veg',
    workoutExperience: 'intermediate',
    healthConditions: [],
    allergies: [],
    workoutDaysPerWeek: 4,
    sleepHours: 8,
    waterIntakeLiters: 3.5,
    isOnboarded: true,
  };

  const results = calculateHealthMetrics(tempProfile);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm space-y-3 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5" />
          <span>Clinical Health & Macro Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
          Clinical Health & Macro Calculators
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl font-medium">
          Instant calculations for BMI, BMR (Mifflin-St Jeor), TDEE, Calorie Deficit/Surplus, Macro splitters, and Ideal Body Weight.
        </p>

        {/* Calculator Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {[
            { id: 'bmi', label: 'BMI Calculator', icon: Scale },
            { id: 'bmr', label: 'BMR & TDEE', icon: Flame },
            { id: 'ideal', label: 'Ideal Weight', icon: Scale },
            { id: 'macro', label: 'Macro Splitter', icon: PieChart },
            { id: 'water', label: 'Water Intake', icon: Droplets },
            { id: 'calorie', label: 'Calorie Deficit', icon: Flame },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCalcType(item.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  calcType === item.id
                    ? 'bg-[#22C55E] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#6B7280] border border-[#E5E7EB] hover:text-[#111827]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CALCULATOR INPUT & OUTPUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Parameters Box */}
        <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm space-y-4 text-left">
          <h3 className="text-base font-extrabold text-[#111827]">Adjust Parameters</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B7280] mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-xs font-bold focus:outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#6B7280] mb-1">Age (Years)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-xs font-bold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B7280] mb-1">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-xs font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#6B7280] mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-xs font-bold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B7280] mb-1">Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-xs font-bold focus:outline-none"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly Active</option>
                <option value="moderate">Moderately Active</option>
                <option value="active">Very Active</option>
                <option value="athlete">Athlete</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#6B7280] mb-1">Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-xs font-bold focus:outline-none"
              >
                <option value="lose">Lose Weight (-500 kcal)</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain">Gain Weight (+450 kcal)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Output Box */}
        <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm space-y-6 flex flex-col justify-between text-left">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#22C55E]">Calculation Results</span>
            
            {calcType === 'bmi' && (
              <div className="space-y-3">
                <span className="text-4xl font-black text-[#111827]">{results.bmi}</span>
                <span className="block text-sm font-bold" style={{ color: results.bmiColor }}>
                  Category: {results.bmiCategory}
                </span>
                <p className="text-xs text-[#6B7280]">
                  Healthy Weight Range for your height ({height}cm): <strong className="text-[#111827]">{results.healthyWeightMin}kg - {results.healthyWeightMax}kg</strong>
                </p>
              </div>
            )}

            {calcType === 'bmr' && (
              <div className="space-y-3">
                <span className="text-4xl font-black text-[#111827]">{results.bmr} kcal</span>
                <span className="block text-xs font-bold text-[#06B6D4]">Basal Metabolic Rate (BMR)</span>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#111827]">
                  Total Daily Energy Expenditure (TDEE): <strong className="text-[#22C55E]">{results.tdee} kcal/day</strong>
                </div>
              </div>
            )}

            {calcType === 'ideal' && (
              <div className="space-y-3">
                <span className="text-4xl font-black text-[#111827]">{results.healthyWeightMin} - {results.healthyWeightMax} kg</span>
                <span className="block text-xs font-bold text-[#22C55E]">Ideal Body Weight Range</span>
                <p className="text-xs text-[#6B7280]">Based on standard WHO BMI thresholds of 18.5 - 24.9 kg/m².</p>
              </div>
            )}

            {calcType === 'macro' && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                    <span className="text-[10px] font-bold text-[#22C55E] block">PROTEIN</span>
                    <span className="text-lg font-black text-[#111827]">{results.proteinGrams}g</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                    <span className="text-[10px] font-bold text-[#06B6D4] block">CARBS</span>
                    <span className="text-lg font-black text-[#111827]">{results.carbGrams}g</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                    <span className="text-[10px] font-bold text-[#F97316] block">FAT</span>
                    <span className="text-lg font-black text-[#111827]">{results.fatGrams}g</span>
                  </div>
                </div>
              </div>
            )}

            {calcType === 'water' && (
              <div className="space-y-3">
                <span className="text-4xl font-black text-[#111827]">{results.idealWaterLiters} Liters</span>
                <span className="block text-xs font-bold text-[#06B6D4]">Recommended Daily Hydration</span>
              </div>
            )}

            {calcType === 'calorie' && (
              <div className="space-y-3">
                <span className="text-4xl font-black text-[#111827]">{results.dailyCalories} kcal/day</span>
                <span className="block text-xs font-bold text-[#22C55E]">Target Goal Calories</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
