import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  User, 
  Target, 
  Activity, 
  Utensils, 
  Droplets,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';
import type { Gender, Goal, BodyType, ActivityLevel, DietPreference, WorkoutExperience, HealthCondition, FoodAllergy } from '../../types';

export const OnboardingModal: React.FC = () => {
  const { profile, updateProfile, isOnboardingOpen, closeOnboarding, setActiveTab } = useUser();
  const { t } = useLanguage();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ ...profile });

  if (!isOnboardingOpen) return null;

  const handleNext = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
    } else {
      // Final Submit
      updateProfile({ ...formData, isOnboarded: true });
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      closeOnboarding();
      setActiveTab('dashboard');
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const stepsList = [
    { num: 1, label: t('step1Title'), icon: User },
    { num: 2, label: t('step2Title'), icon: Target },
    { num: 3, label: t('step3Title'), icon: Activity },
    { num: 4, label: t('step4Title'), icon: Utensils },
    { num: 5, label: t('step5Title'), icon: Droplets },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-slate-900/95 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
      >
        {/* Top Header Banner */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                {t('onboardingTitle')}
              </h3>
              <p className="text-xs text-slate-400">
                Step {step} of 5 - {stepsList[step - 1].label}
              </p>
            </div>
          </div>
          <button
            onClick={closeOnboarding}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-950 h-1.5 flex">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300" 
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Modal Form Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  {t('name')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Vance"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    {t('gender')}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other / Non-binary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    {t('age')}
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    {t('height')} (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.heightCm}
                    onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    {t('weight')} (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.weightKg}
                    onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Goal & Target Weight */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  {t('goal')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'lose', label: t('loseWeight'), icon: '🔥' },
                    { id: 'maintain', label: t('maintainWeight'), icon: '⚖️' },
                    { id: 'gain', label: t('gainWeight'), icon: '💪' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setFormData({ ...formData, goal: item.id as Goal })}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        formData.goal === item.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-lg'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{item.icon}</span>
                      <span className="text-xs font-bold block">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  {t('targetWeight')} (kg)
                </label>
                <input
                  type="number"
                  value={formData.targetWeightKg}
                  onChange={(e) => setFormData({ ...formData, targetWeightKg: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Body Type & Activity Level */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  {t('bodyType')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'skinny', label: t('skinny') },
                    { id: 'average', label: t('average') },
                    { id: 'fat', label: t('fat') },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setFormData({ ...formData, bodyType: b.id as BodyType })}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        formData.bodyType === b.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  {t('activityLevel')}
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'sedentary', label: t('sedentary') },
                    { id: 'light', label: t('light') },
                    { id: 'moderate', label: t('moderate') },
                    { id: 'active', label: t('active') },
                    { id: 'athlete', label: t('athlete') },
                  ].map((act) => (
                    <button
                      key={act.id}
                      onClick={() => setFormData({ ...formData, activityLevel: act.id as ActivityLevel })}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                        formData.activityLevel === act.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>{act.label}</span>
                      {formData.activityLevel === act.id && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Diet Preference & Health Conditions */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  {t('dietPreference')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'veg', label: t('veg'), icon: '🥗' },
                    { id: 'non-veg', label: t('nonVeg'), icon: '🍗' },
                    { id: 'vegan', label: t('vegan'), icon: '🌱' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setFormData({ ...formData, dietPreference: d.id as DietPreference })}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        formData.dietPreference === d.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <span className="text-xl block mb-1">{d.icon}</span>
                      <span className="text-xs font-bold">{d.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  {t('workoutExperience')}
                </label>
                <select
                  value={formData.workoutExperience}
                  onChange={(e) => setFormData({ ...formData, workoutExperience: e.target.value as WorkoutExperience })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500"
                >
                  <option value="beginner">Beginner (0-6 months)</option>
                  <option value="intermediate">Intermediate (1-3 years)</option>
                  <option value="advanced">Advanced (3+ years)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 5: Routine Targets */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    {t('workoutDays')}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={7}
                    value={formData.workoutDaysPerWeek}
                    onChange={(e) => setFormData({ ...formData, workoutDaysPerWeek: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    {t('sleepHours')}
                  </label>
                  <input
                    type="number"
                    min={4}
                    max={12}
                    value={formData.sleepHours}
                    onChange={(e) => setFormData({ ...formData, sleepHours: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  {t('waterIntake')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.waterIntakeLiters}
                  onChange={(e) => setFormData({ ...formData, waterIntakeLiters: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-300 leading-relaxed">
                  FitFusion AI will compile your precise BMR, TDEE, macros split, 12 micronutrient targets, and customized food/workout recommendations.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Navigation */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              step === 1
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t('prevStep')}</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform"
          >
            <span>{step === 5 ? t('finishOnboarding') : t('nextStep')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </motion.div>
    </div>
  );
};
