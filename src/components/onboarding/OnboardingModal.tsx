import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import type { Gender, Goal, BodyType, ActivityLevel, DietPreference, WorkoutExperience } from '../../types';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-white border border-[#E5E7EB] rounded-2xl shadow-xl overflow-hidden my-8 text-left text-[#111827]"
      >
        {/* Top Header Banner */}
        <div className="px-6 py-5 bg-[#F8FAFC] border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#22C55E]/10 text-[#22C55E]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#111827]">
                {t('onboardingTitle')}
              </h3>
              <p className="text-xs text-[#6B7280] font-medium">
                Step {step} of 5 - {stepsList[step - 1].label}
              </p>
            </div>
          </div>
          <button
            onClick={closeOnboarding}
            className="p-2 rounded-full text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E7EB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean Progress Line Indicator */}
        <div className="w-full bg-[#F8FAFC] h-1.5 flex">
          <div 
            className="h-full bg-[#22C55E] transition-all duration-300 rounded-r-full" 
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                  {t('name')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Vance"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-sm font-semibold focus:outline-none focus:border-[#22C55E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                    {t('gender')}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-sm font-semibold focus:outline-none focus:border-[#22C55E]"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other / Non-binary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                    {t('age')}
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-sm font-semibold focus:outline-none focus:border-[#22C55E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                    {t('height')} (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.heightCm}
                    onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-sm font-semibold focus:outline-none focus:border-[#22C55E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                    {t('weight')} (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.weightKg}
                    onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-sm font-semibold focus:outline-none focus:border-[#22C55E]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Goal & Target Weight */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
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
                          ? 'border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E] font-bold shadow-xs'
                          : 'border-[#E5E7EB] bg-[#F8FAFC] text-[#6B7280] hover:text-[#111827]'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{item.icon}</span>
                      <span className="text-xs font-bold block">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                  {t('targetWeight')} (kg)
                </label>
                <input
                  type="number"
                  value={formData.targetWeightKg}
                  onChange={(e) => setFormData({ ...formData, targetWeightKg: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-sm font-semibold focus:outline-none focus:border-[#22C55E]"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Body Type & Activity Level */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
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
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                        formData.bodyType === b.id
                          ? 'border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]'
                          : 'border-[#E5E7EB] bg-[#F8FAFC] text-[#6B7280]'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
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
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                        formData.activityLevel === act.id
                          ? 'border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]'
                          : 'border-[#E5E7EB] bg-[#F8FAFC] text-[#6B7280] hover:text-[#111827]'
                      }`}
                    >
                      <span>{act.label}</span>
                      {formData.activityLevel === act.id && <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Diet Preference */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
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
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        formData.dietPreference === d.id
                          ? 'border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E] font-bold'
                          : 'border-[#E5E7EB] bg-[#F8FAFC] text-[#6B7280]'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{d.icon}</span>
                      <span className="text-xs font-bold">{d.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                  {t('workoutExperience')}
                </label>
                <select
                  value={formData.workoutExperience}
                  onChange={(e) => setFormData({ ...formData, workoutExperience: e.target.value as WorkoutExperience })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-sm font-semibold focus:outline-none focus:border-[#22C55E]"
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                    {t('workoutDays')}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={7}
                    value={formData.workoutDaysPerWeek}
                    onChange={(e) => setFormData({ ...formData, workoutDaysPerWeek: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-sm font-semibold focus:outline-none focus:border-[#22C55E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                    {t('sleepHours')}
                  </label>
                  <input
                    type="number"
                    min={4}
                    max={12}
                    value={formData.sleepHours}
                    onChange={(e) => setFormData({ ...formData, sleepHours: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-sm font-semibold focus:outline-none focus:border-[#22C55E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                  {t('waterIntake')} (Liters)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.waterIntakeLiters}
                  onChange={(e) => setFormData({ ...formData, waterIntakeLiters: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-sm font-semibold focus:outline-none focus:border-[#22C55E]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                <p className="text-xs text-[#111827] leading-relaxed font-medium">
                  InfinityFitAI will calculate your BMR, TDEE, macros split, 12 micronutrient targets, and food/workout routines.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Clean Light Modal Footer Navigation */}
        <div className="px-6 py-4 bg-white border-t border-[#E5E7EB] flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              step === 1
                ? 'opacity-30 cursor-not-allowed text-[#6B7280]'
                : 'bg-white border border-[#E5E7EB] text-[#111827] hover:bg-[#F8FAFC]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t('prevStep')}</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#22C55E] hover:bg-[#16a34a] text-white font-extrabold text-xs transition-all shadow-xs"
          >
            <span>{step === 5 ? t('finishOnboarding') : t('nextStep')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </motion.div>
    </div>
  );
};
