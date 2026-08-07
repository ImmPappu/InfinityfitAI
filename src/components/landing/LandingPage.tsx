import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Dumbbell, 
  Utensils, 
  Activity,
  ChevronDown,
  Calculator,
  Scale,
  Zap
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const LandingPage: React.FC = () => {
  const { openOnboarding, setActiveTab } = useUser();
  
  // Interactive BMI State on Landing Page
  const [bmiHeightCm, setBmiHeightCm] = useState<number>(175);
  const [bmiWeightKg, setBmiWeightKg] = useState<number>(70);

  // Calculate live BMI
  const heightM = bmiHeightCm / 100;
  const rawBmi = (bmiWeightKg / (heightM * heightM)).toFixed(1);
  const numericBmi = parseFloat(rawBmi);

  let bmiCategory = 'Healthy';
  let bmiBadgeBg = 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]';
  let bmiBadgeDot = '🟢';

  if (numericBmi < 18.5) {
    bmiCategory = 'Underweight';
    bmiBadgeBg = 'bg-[#06B6D4]/10 border-[#06B6D4]/30 text-[#06B6D4]';
    bmiBadgeDot = '🔵';
  } else if (numericBmi >= 25 && numericBmi < 30) {
    bmiCategory = 'Overweight';
    bmiBadgeBg = 'bg-[#F97316]/10 border-[#F97316]/30 text-[#F97316]';
    bmiBadgeDot = '🟠';
  } else if (numericBmi >= 30) {
    bmiCategory = 'Obese';
    bmiBadgeBg = 'bg-rose-500/10 border-rose-500/30 text-rose-600';
    bmiBadgeDot = '🔴';
  }

  // Interactive Nutrition Calculator State
  const [tdeeAge, setTdeeAge] = useState<number>(25);
  const [tdeeGender, setTdeeGender] = useState<'male' | 'female'>('male');
  const [tdeeActivity, setTdeeActivity] = useState<number>(1.375); // Moderate

  // BMR & TDEE calculation (Mifflin-St Jeor)
  const bmr = Math.round(
    tdeeGender === 'male'
      ? 10 * bmiWeightKg + 6.25 * bmiHeightCm - 5 * tdeeAge + 5
      : 10 * bmiWeightKg + 6.25 * bmiHeightCm - 5 * tdeeAge - 161
  );
  const calculatedTdee = Math.round(bmr * tdeeActivity);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs = [
    {
      q: "How does InfinityFitAI calculate my daily nutrition & calorie target?",
      a: "InfinityFitAI uses the Mifflin-St Jeor BMR formula combined with activity multipliers to determine your Total Daily Energy Expenditure (TDEE). We adjust macros for fat loss, muscle gain, or maintenance."
    },
    {
      q: "Can I swap ingredients if I am vegetarian or vegan?",
      a: "Yes! Our intelligent ingredient swap engine offers 1-to-1 nutritional equivalencies (e.g., Paneer ↔ Tofu ↔ Soy Chunks)."
    },
    {
      q: "Are the workout routines suitable for beginners at home?",
      a: "All exercises feature clear illustration guides, muscle targeting breakdowns, and difficulty tags suited for both home bodyweight training and gym routines."
    },
    {
      q: "Is there a downloadable PDF report for my plan?",
      a: "Yes! Click 'Start Your Journey' or export your personalized health blueprint as a clean, high-resolution PDF report."
    }
  ];

  return (
    <div className="bg-white text-[#111827] space-y-28 pb-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="bg-white border-b border-[#E5E7EB] pt-12 lg:pt-20 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Bullets & Simple CTA */}
            <div className="lg:col-span-6 space-y-8 text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-extrabold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 fill-[#22C55E]" />
                <span>Smart Health & Fitness Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111827] tracking-tight leading-[1.15]">
                Transform Your Health <br />
                with <span className="text-[#22C55E]">InfinityFitAI</span>
              </h1>

              <div className="space-y-3 pt-2">
                {[
                  'Personalized nutrition.',
                  'AI meal planning.',
                  'Workout guidance.',
                  'BMI calculator.'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#22C55E]/15 flex items-center justify-center text-[#22C55E] flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                    </div>
                    <span className="text-base sm:text-lg font-bold text-[#111827]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={openOnboarding}
                  className="px-9 py-4 rounded-full bg-[#22C55E] hover:bg-[#16a34a] text-white font-black text-sm shadow-sm transition-all flex items-center gap-3 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Right Column: Visual Composition (Healthy Food + Person Working Out + Floating Metric Cards) */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-lg">
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Healthy Food Image */}
                  <div className="relative rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-sm h-64 sm:h-72">
                    <img 
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop" 
                      alt="Healthy Salad Bowl" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                      <span className="text-white text-xs font-extrabold flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-[#22C55E]" />
                        Healthy Nutrition
                      </span>
                    </div>
                  </div>

                  {/* Person Working Out Image */}
                  <div className="relative rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-sm h-64 sm:h-72 mt-8">
                    <img 
                      src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop" 
                      alt="Person Working Out" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                      <span className="text-white text-xs font-extrabold flex items-center gap-1.5">
                        <Dumbbell className="w-3.5 h-3.5 text-[#06B6D4]" />
                        Workout Guidance
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Metric 1: BMI Card */}
                <motion.div 
                  initial={{ y: -8 }}
                  animate={{ y: 0 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 }}
                  className="absolute -top-4 -left-4 bg-white border border-[#E5E7EB] p-4 rounded-2xl shadow-md flex items-center gap-3 z-20"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E]">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] font-bold text-[#6B7280] uppercase">BMI Status</span>
                    <span className="text-sm font-extrabold text-[#111827]">22.4 (Healthy)</span>
                  </div>
                </motion.div>

                {/* Floating Metric 2: Calories Card */}
                <motion.div 
                  initial={{ y: 8 }}
                  animate={{ y: 0 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 3.5 }}
                  className="absolute top-1/2 -right-6 -translate-y-1/2 bg-white border border-[#E5E7EB] p-4 rounded-2xl shadow-md flex items-center gap-3 z-20"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center text-[#F97316]">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] font-bold text-[#6B7280] uppercase">Calorie Target</span>
                    <span className="text-sm font-extrabold text-[#F97316]">2,200 kcal</span>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FEATURES SECTION */}
      {/* ========================================================================= */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Core Platform</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">Everything You Need To Stay Fit</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 'meals',
              emoji: '🥗',
              title: 'Meal Planner',
              desc: 'Personalized meals & nutrient tracking',
            },
            {
              id: 'workouts',
              emoji: '🏋️',
              title: 'Workout Guidance',
              desc: 'Custom home & gym routine plans',
            },
            {
              id: 'aicoach',
              emoji: '🤖',
              title: 'AI FitBot Coach',
              desc: 'Conversational 24/7 health guidance',
            },
            {
              id: 'fasting',
              emoji: '⏱️',
              title: 'Fasting Tracker',
              desc: 'Intermittent fasting countdown timers',
            },
            {
              id: 'progress',
              emoji: '📊',
              title: 'Body Analytics',
              desc: 'Weight loss progress curves & BMI',
            },
            {
              id: 'calculators',
              emoji: '📐',
              title: 'Clinical Calculators',
              desc: 'BMR, TDEE, & Calorie Deficits',
            }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => { setActiveTab(item.id); window.scrollTo(0,0); }}
              className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between space-y-5 text-left"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{item.emoji}</span>
                  <h3 className="text-lg font-black text-[#111827]">{item.title}</h3>
                </div>
                <p className="text-xs font-medium text-[#6B7280]">{item.desc}</p>
              </div>

              <div className="pt-2">
                <button className="px-5 py-2.5 rounded-full bg-[#22C55E] hover:bg-[#16a34a] text-white font-extrabold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 w-fit">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE BMI CALCULATOR SECTION */}
      {/* ========================================================================= */}
      <section id="bmi" className="max-w-5xl mx-auto px-4">
        <div className="bg-white border border-[#E5E7EB] p-8 sm:p-12 rounded-3xl shadow-sm space-y-8">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-extrabold uppercase">
              <Scale className="w-4 h-4" />
              <span>Instant Health Score</span>
            </div>
            <h2 className="text-3xl font-black text-[#111827]">Interactive BMI Calculator</h2>
            <p className="text-xs text-[#6B7280]">Adjust height and weight sliders to calculate your BMI & daily targets instantly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Sliders Input */}
            <div className="space-y-6 bg-[#F8FAFC] p-6 rounded-2xl border border-[#E5E7EB]">
              
              {/* Height Slider */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-center text-xs font-bold text-[#111827]">
                  <span>Height</span>
                  <span className="text-[#22C55E] text-sm">{bmiHeightCm} cm ({Math.floor(bmiHeightCm / 30.48)}' {Math.round((bmiHeightCm % 30.48) / 2.54)}")</span>
                </div>
                <input 
                  type="range" 
                  min="130" 
                  max="220" 
                  value={bmiHeightCm}
                  onChange={(e) => setBmiHeightCm(Number(e.target.value))}
                  className="w-full accent-[#22C55E] cursor-pointer"
                />
              </div>

              {/* Weight Slider */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-center text-xs font-bold text-[#111827]">
                  <span>Weight</span>
                  <span className="text-[#06B6D4] text-sm">{bmiWeightKg} kg ({Math.round(bmiWeightKg * 2.20462)} lbs)</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="160" 
                  value={bmiWeightKg}
                  onChange={(e) => setBmiWeightKg(Number(e.target.value))}
                  className="w-full accent-[#06B6D4] cursor-pointer"
                />
              </div>

            </div>

            {/* Structured Rich BMI Output Display */}
            <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-xs space-y-6 text-left">
              
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Your BMI</span>
                  <h3 className="text-3xl font-black text-[#111827]">BMI {rawBmi}</h3>
                </div>
                <span className={`px-3 py-1.5 rounded-full border text-xs font-black flex items-center gap-1.5 ${bmiBadgeBg}`}>
                  <span>{bmiBadgeDot}</span>
                  <span>{bmiCategory}</span>
                </span>
              </div>

              {/* Recommended Metric Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-0.5">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase block">Recommended Calories</span>
                  <span className="text-base font-black text-[#22C55E]">2200 kcal</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-0.5">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase block">Protein</span>
                  <span className="text-base font-black text-[#06B6D4]">120g</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-0.5">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase block">Water</span>
                  <span className="text-base font-black text-[#F97316]">3L</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-0.5">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase block">Sleep</span>
                  <span className="text-base font-black text-[#111827]">8 hrs</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MEAL PLANNER PREVIEW */}
      {/* ========================================================================= */}
      <section id="meals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#22C55E]">Culinary Ecosystem</span>
          <h2 className="text-3xl font-extrabold text-[#111827]">Meal Planner Preview</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Indian Kadai Chicken & Rice',
              emoji: '🍗',
              protein: '52g',
              calories: '570',
              image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop'
            },
            {
              name: 'Palak Paneer & Multigrain Roti',
              emoji: '🧀',
              protein: '36g',
              calories: '510',
              image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop'
            },
            {
              name: 'Spicy Soya Chunks Sukka',
              emoji: '🫘',
              protein: '46g',
              calories: '480',
              image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop'
            },
            {
              name: 'Desi Masala Egg Bhurji',
              emoji: '🥚',
              protein: '30g',
              calories: '410',
              image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop'
            },
            {
              name: 'Greek Yogurt Lassi & Makhana',
              emoji: '🥤',
              protein: '26g',
              calories: '270',
              image: '/greek_yogurt_lassi_makhana.png'
            },
            {
              name: 'Pan-Seared Salmon & Veggies',
              emoji: '🐟',
              protein: '42g',
              calories: '540',
              image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop'
            },
            {
              name: 'Tadka Moong Dal & Quinoa',
              emoji: '🍲',
              protein: '28g',
              calories: '430',
              image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop'
            }
          ].map((meal, idx) => (
            <div key={idx} className="bg-white border border-[#E5E7EB] rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between text-left">
              <div>
                <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
                  <h3 className="text-base font-black text-[#111827] flex items-center gap-2">
                    <span>{meal.emoji}</span>
                    <span>{meal.name}</span>
                  </h3>
                </div>

                <div className="h-48 w-full overflow-hidden">
                  <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-center text-xs font-bold">
                    <div>
                      <span className="text-[#22C55E] block text-[10px] uppercase">Protein</span>
                      <span className="text-[#22C55E] font-black">{meal.protein}</span>
                    </div>
                    <div>
                      <span className="text-[#111827] block text-[10px] uppercase">Calories</span>
                      <span className="text-[#111827] font-black">{meal.calories}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-[#E5E7EB] space-y-2">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Order Ingredients</span>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={openOnboarding} className="py-2 px-1 rounded-xl bg-[#F8FAFC] hover:bg-[#22C55E] hover:text-white border border-[#E5E7EB] text-[#111827] font-extrabold text-[11px] transition-all text-center">Amazon</button>
                  <button onClick={openOnboarding} className="py-2 px-1 rounded-xl bg-[#F8FAFC] hover:bg-[#F97316] hover:text-white border border-[#E5E7EB] text-[#111827] font-extrabold text-[11px] transition-all text-center">Blinkit</button>
                  <button onClick={openOnboarding} className="py-2 px-1 rounded-xl bg-[#F8FAFC] hover:bg-[#06B6D4] hover:text-white border border-[#E5E7EB] text-[#111827] font-extrabold text-[11px] transition-all text-center">BigBasket</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. WORKOUT PREVIEW */}
      {/* ========================================================================= */}
      <section id="workouts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#06B6D4]">Training Guidance</span>
          <h2 className="text-3xl font-extrabold text-[#111827]">Workout Routines Preview</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Chest & Triceps Push-up',
              emoji: '🤸',
              muscle: 'Chest & Triceps',
              calories: '140 kcal',
              difficulty: 'Beginner'
            },
            {
              title: 'Bodyweight Goblet Squats',
              emoji: '🏋️',
              muscle: 'Quadriceps & Glutes',
              calories: '180 kcal',
              difficulty: 'Intermediate'
            },
            {
              title: 'Core Isometric Plank',
              emoji: '🧘',
              muscle: 'Abdominals & Core',
              calories: '90 kcal',
              difficulty: 'All Levels'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-[#E5E7EB] p-6 rounded-3xl shadow-sm space-y-4 text-left flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl p-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB]">{item.emoji}</span>
                  <span className="px-3 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] text-[10px] font-black uppercase">
                    {item.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#111827]">{item.title}</h3>
                <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] grid grid-cols-2 gap-2 text-xs font-bold">
                  <div>
                    <span className="text-[10px] font-bold text-[#6B7280] uppercase block">Target</span>
                    <span className="text-[#111827] font-extrabold">{item.muscle}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#6B7280] uppercase block">Burn</span>
                    <span className="text-[#F97316] font-extrabold">{item.calories}</span>
                  </div>
                </div>
              </div>

              <button onClick={() => { setActiveTab('workouts'); window.scrollTo(0,0); }} className="w-full py-2.5 rounded-2xl bg-[#F8FAFC] hover:bg-slate-100 border border-[#E5E7EB] text-[#111827] text-xs font-bold transition-all">
                View Routine Steps →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. NUTRITION CALCULATOR (TDEE & BMR) */}
      {/* ========================================================================= */}
      <section id="nutrition" className="max-w-5xl mx-auto px-4">
        <div className="bg-white border border-[#E5E7EB] p-8 sm:p-10 rounded-3xl shadow-sm space-y-6 text-left">
          
          <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 text-[#F97316] flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#111827]">Nutrition & TDEE Engine</h3>
              <p className="text-xs text-[#6B7280]">Calculate your exact Basal Metabolic Rate & Total Daily Energy Expenditure.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Gender Toggle */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#111827]">Gender</span>
              <div className="flex rounded-xl bg-[#F8FAFC] p-1 border border-[#E5E7EB]">
                <button 
                  onClick={() => setTdeeGender('male')} 
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${tdeeGender === 'male' ? 'bg-[#22C55E] text-white' : 'text-[#6B7280]'}`}
                >
                  Male
                </button>
                <button 
                  onClick={() => setTdeeGender('female')} 
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${tdeeGender === 'female' ? 'bg-[#22C55E] text-white' : 'text-[#6B7280]'}`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Age Input */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#111827]">Age (Years)</span>
              <input 
                type="number" 
                value={tdeeAge} 
                onChange={(e) => setTdeeAge(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-bold text-[#111827]"
              />
            </div>

            {/* Activity Multiplier */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#111827]">Activity Level</span>
              <select 
                value={tdeeActivity} 
                onChange={(e) => setTdeeActivity(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-bold text-[#111827]"
              >
                <option value={1.2}>Sedentary (Office Work)</option>
                <option value={1.375}>Moderate (3-4 workouts/wk)</option>
                <option value={1.55}>Active (5-6 workouts/wk)</option>
              </select>
            </div>

          </div>

          {/* Results Summary Bar */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] grid grid-cols-2 gap-4 text-center">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#6B7280] block">Basal Metabolic Rate (BMR)</span>
              <span className="text-xl font-black text-[#111827]">{bmr} kcal</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-[#6B7280] block">Total Daily Expenditure (TDEE)</span>
              <span className="text-xl font-black text-[#22C55E]">{calculatedTdee} kcal</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-[#111827]">Frequently Asked Questions</h2>
          <p className="text-xs text-[#6B7280]">Got questions? We have answers.</p>
        </div>

        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-[#111827] hover:text-[#22C55E] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-[#22C55E]' : 'text-[#6B7280]'}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-[#6B7280] leading-relaxed border-t border-[#E5E7EB] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
