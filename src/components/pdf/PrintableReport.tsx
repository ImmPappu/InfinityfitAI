import React from 'react';
import { useUser } from '../../context/UserContext';

export const PrintableReport: React.FC = () => {
  const { profile, metrics } = useUser();

  return (
    <div className="hidden print:block fixed inset-0 z-[9999] bg-white text-slate-900 p-8 font-sans overflow-y-auto" id="printable-health-report">
      {/* Header */}
      <div className="border-b-2 border-emerald-600 pb-4 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            InfinityfitAI <span className="text-emerald-600">Health Blueprint</span>
          </h1>
          <p className="text-xs text-slate-500 font-semibold">
            Personalized Medical-Grade Nutrition & Fitness Report
          </p>
        </div>
        <div className="text-right text-xs text-slate-500 font-medium">
          <p>Generated: {new Date().toLocaleDateString()}</p>
          <p>Client: <strong className="text-slate-800">{profile.name}</strong></p>
        </div>
      </div>

      {/* Patient Profile Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
        <div>
          <span className="block text-slate-400 font-bold uppercase text-[10px]">Age / Gender</span>
          <span className="font-extrabold text-slate-800">{profile.age} Yrs / {profile.gender.toUpperCase()}</span>
        </div>
        <div>
          <span className="block text-slate-400 font-bold uppercase text-[10px]">Height / Weight</span>
          <span className="font-extrabold text-slate-800">{profile.heightCm} cm / {profile.weightKg} kg</span>
        </div>
        <div>
          <span className="block text-slate-400 font-bold uppercase text-[10px]">Primary Goal</span>
          <span className="font-extrabold text-emerald-600 uppercase">{profile.goal} Weight</span>
        </div>
        <div>
          <span className="block text-slate-400 font-bold uppercase text-[10px]">Target Weight</span>
          <span className="font-extrabold text-slate-800">{profile.targetWeightKg} kg</span>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-xs">
        <div className="p-4 rounded-xl border border-slate-200 bg-emerald-50/50">
          <span className="block text-slate-500 font-bold uppercase text-[10px]">BMI Score</span>
          <span className="text-2xl font-black text-emerald-700">{metrics.bmi}</span>
          <span className="block text-[11px] font-bold text-emerald-600 mt-0.5">{metrics.bmiCategory}</span>
          <span className="block text-[10px] text-slate-500 mt-1">Healthy Range: {metrics.healthyWeightMin} - {metrics.healthyWeightMax} kg</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-cyan-50/50">
          <span className="block text-slate-500 font-bold uppercase text-[10px]">Daily Calorie Target</span>
          <span className="text-2xl font-black text-cyan-700">{metrics.dailyCalories} kcal</span>
          <span className="block text-[10px] text-slate-500 mt-1">BMR: {metrics.bmr} kcal | TDEE: {metrics.tdee} kcal</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-purple-50/50">
          <span className="block text-slate-500 font-bold uppercase text-[10px]">Water Intake Target</span>
          <span className="text-2xl font-black text-purple-700">{metrics.idealWaterLiters} Liters</span>
          <span className="block text-[10px] text-slate-500 mt-1">Daily Hydration Standard</span>
        </div>
      </div>

      {/* Macronutrient Distribution */}
      <div className="mb-6">
        <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-200 pb-2 mb-3 uppercase tracking-wider">
          Macronutrient Breakdown
        </h3>
        <div className="grid grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="block font-bold text-slate-500">Protein</span>
            <span className="text-lg font-black text-slate-800">{metrics.proteinGrams} g</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="block font-bold text-slate-500">Carbohydrates</span>
            <span className="text-lg font-black text-slate-800">{metrics.carbGrams} g</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="block font-bold text-slate-500">Dietary Fats</span>
            <span className="text-lg font-black text-slate-800">{metrics.fatGrams} g</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="block font-bold text-slate-500">Dietary Fiber</span>
            <span className="text-lg font-black text-slate-800">{metrics.fiberGrams} g</span>
          </div>
        </div>
      </div>

      {/* 12 Micronutrient Breakdown Table */}
      <div className="mb-6">
        <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-200 pb-2 mb-3 uppercase tracking-wider">
          Micronutrient Daily Targets
        </h3>
        <table className="w-full text-xs text-left border border-slate-200">
          <thead className="bg-slate-100 font-bold uppercase text-[10px] text-slate-600">
            <tr>
              <th className="p-2 border-b">Nutrient</th>
              <th className="p-2 border-b">Target</th>
              <th className="p-2 border-b">Nutrient</th>
              <th className="p-2 border-b">Target</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="p-2 font-bold">Calcium</td>
              <td className="p-2">{metrics.calciumMg} mg</td>
              <td className="p-2 font-bold">Vitamin C</td>
              <td className="p-2">{metrics.vitCMg} mg</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Iron</td>
              <td className="p-2">{metrics.ironMg} mg</td>
              <td className="p-2 font-bold">Vitamin D</td>
              <td className="p-2">{metrics.vitDIu} IU</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Magnesium</td>
              <td className="p-2">{metrics.magnesiumMg} mg</td>
              <td className="p-2 font-bold">Vitamin B12</td>
              <td className="p-2">{metrics.vitB12Mcg} mcg</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Potassium</td>
              <td className="p-2">{metrics.potassiumMg} mg</td>
              <td className="p-2 font-bold">Omega 3</td>
              <td className="p-2">{metrics.omega3Grams} g</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer stamp */}
      <div className="border-t border-slate-200 pt-4 text-center text-[10px] text-slate-400 font-bold">
        FitFusion AI Engine • Confidential Personal Health Summary
      </div>
    </div>
  );
};
