import React from 'react';
import { useUser } from '../../context/UserContext';

export const PrintableReport: React.FC = () => {
  const { profile, metrics } = useUser();

  return (
    <div id="printable-health-report-wrapper" style={{ display: 'none' }}>
      <div 
        id="printable-health-report"
        className="bg-white text-slate-900 font-sans p-6 w-[210mm] h-[297mm] max-h-[297mm] box-border flex flex-col justify-between overflow-hidden"
      >
        <div className="space-y-4">
          
          {/* 1. InfinityFitAI Logo & Title Header */}
          <div className="border-b-2 border-[#22C55E] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#22C55E] text-white font-black flex items-center justify-center text-lg">
                ∞
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                  InfinityFitAI <span className="text-[#22C55E]">Health Blueprint</span>
                </h1>
                <p className="text-[10px] text-slate-500 font-bold mt-1">
                  Personalized Clinical Biometric & Nutrition Target Report
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-right text-[10px] text-slate-500 font-semibold leading-tight">
              <div>
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Report ID: <strong className="text-slate-900">IFA-984721</strong></p>
              </div>
              <div className="w-10 h-10 border border-slate-300 rounded p-0.5 bg-white flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full text-slate-900 fill-current">
                  <path d="M2,2H10V10H2V2M4,4V8H8V4H4M14,2H22V10H14V2M16,4V8H20V4H16M2,14H10V22H2V14M4,16V20H8V16H4M14,14H17V17H14V14M19,14H22V17H19V14M17,17H19V19H17V17M14,19H17V22H14V19M19,19H22V22H19V19Z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* 2. User Details */}
          <div className="grid grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="block text-slate-400 font-extrabold uppercase text-[9px]">Client Name</span>
              <span className="font-extrabold text-slate-900">{profile.name}</span>
            </div>
            <div>
              <span className="block text-slate-400 font-extrabold uppercase text-[9px]">Age / Gender</span>
              <span className="font-extrabold text-slate-900">{profile.age} Yrs / {profile.gender.toUpperCase()}</span>
            </div>
            <div>
              <span className="block text-slate-400 font-extrabold uppercase text-[9px]">Height / Weight</span>
              <span className="font-extrabold text-slate-900">{profile.heightCm} cm / {profile.weightKg} kg</span>
            </div>
            <div>
              <span className="block text-slate-400 font-extrabold uppercase text-[9px]">Goal / Target</span>
              <span className="font-extrabold text-[#22C55E] uppercase">{profile.goal} ({profile.targetWeightKg}kg)</span>
            </div>
          </div>

          {/* 3, 4, 5. BMI, Calories, Water Target Grid */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            {/* BMI */}
            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-0.5">
              <span className="block text-slate-500 font-bold uppercase text-[9px]">BMI Score</span>
              <span className="text-2xl font-black text-emerald-700">{metrics.bmi}</span>
              <span className="block text-xs font-bold text-emerald-600">🟢 {metrics.bmiCategory}</span>
              <span className="block text-[9px] text-slate-500 pt-1 border-t border-emerald-200/60">
                Healthy: {metrics.healthyWeightMin} - {metrics.healthyWeightMax} kg
              </span>
            </div>

            {/* Calories */}
            <div className="p-3.5 rounded-xl border border-orange-200 bg-orange-50/50 space-y-0.5">
              <span className="block text-slate-500 font-bold uppercase text-[9px]">Daily Calories</span>
              <span className="text-2xl font-black text-orange-700">{metrics.dailyCalories} kcal</span>
              <span className="block text-xs font-bold text-orange-600">🔥 Daily Goal Target</span>
              <span className="block text-[9px] text-slate-500 pt-1 border-t border-orange-200/60">
                BMR: {metrics.bmr} | TDEE: {metrics.tdee} kcal
              </span>
            </div>

            {/* Water Target */}
            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-0.5">
              <span className="block text-slate-500 font-bold uppercase text-[9px]">Water Target</span>
              <span className="text-2xl font-black text-blue-700">{metrics.idealWaterLiters} Liters</span>
              <span className="block text-xs font-bold text-blue-600">💧 Daily Hydration</span>
              <span className="block text-[9px] text-slate-500 pt-1 border-t border-blue-200/60">
                Optimal Hydration Target
              </span>
            </div>
          </div>

          {/* 6. Macronutrients */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 border-b border-slate-200 pb-1.5 mb-2 uppercase tracking-wider">
              Daily Macronutrient Targets
            </h3>
            <div className="grid grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="block font-bold text-emerald-700 text-[9px] uppercase">Protein</span>
                <span className="text-base font-black text-slate-900">{metrics.proteinGrams} g</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="block font-bold text-cyan-700 text-[9px] uppercase">Carbohydrates</span>
                <span className="text-base font-black text-slate-900">{metrics.carbGrams} g</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="block font-bold text-purple-700 text-[9px] uppercase">Dietary Fats</span>
                <span className="text-base font-black text-slate-900">{metrics.fatGrams} g</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="block font-bold text-orange-700 text-[9px] uppercase">Dietary Fiber</span>
                <span className="text-base font-black text-slate-900">{metrics.fiberGrams} g</span>
              </div>
            </div>
          </div>

          {/* 7. Micronutrients */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 border-b border-slate-200 pb-1.5 mb-2 uppercase tracking-wider">
              Essential Micronutrient Daily Targets
            </h3>
            <table className="w-full text-xs text-left border border-slate-200">
              <thead className="bg-slate-100 font-bold uppercase text-[9px] text-slate-600">
                <tr>
                  <th className="p-1.5 border-b">Nutrient</th>
                  <th className="p-1.5 border-b">Target</th>
                  <th className="p-1.5 border-b">Nutrient</th>
                  <th className="p-1.5 border-b">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px]">
                <tr>
                  <td className="p-1.5 font-bold">Calcium</td>
                  <td className="p-1.5 text-emerald-700 font-extrabold">{metrics.calciumMg} mg</td>
                  <td className="p-1.5 font-bold">Vitamin C</td>
                  <td className="p-1.5 text-emerald-700 font-extrabold">{metrics.vitCMg} mg</td>
                </tr>
                <tr>
                  <td className="p-1.5 font-bold">Iron</td>
                  <td className="p-1.5 text-emerald-700 font-extrabold">{metrics.ironMg} mg</td>
                  <td className="p-1.5 font-bold">Vitamin D</td>
                  <td className="p-1.5 text-emerald-700 font-extrabold">{metrics.vitDIu} IU</td>
                </tr>
                <tr>
                  <td className="p-1.5 font-bold">Magnesium</td>
                  <td className="p-1.5 text-emerald-700 font-extrabold">{metrics.magnesiumMg} mg</td>
                  <td className="p-1.5 font-bold">Vitamin B12</td>
                  <td className="p-1.5 text-emerald-700 font-extrabold">{metrics.vitB12Mcg} mcg</td>
                </tr>
                <tr>
                  <td className="p-1.5 font-bold">Potassium</td>
                  <td className="p-1.5 text-emerald-700 font-extrabold">{metrics.potassiumMg} mg</td>
                  <td className="p-1.5 font-bold">Omega 3</td>
                  <td className="p-1.5 text-emerald-700 font-extrabold">{metrics.omega3Grams} g</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* Footer Stamp */}
        <div className="border-t border-slate-200 pt-3 text-center text-[9px] text-slate-400 font-bold">
          InfinityFitAI Engine • Personal Biometric Health Blueprint • Confidential
        </div>
      </div>
    </div>
  );
};
