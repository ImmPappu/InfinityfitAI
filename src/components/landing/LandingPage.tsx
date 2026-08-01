import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Sparkles, 
  ChevronRight, 
  Utensils, 
  Dumbbell, 
  Clock, 
  Bot, 
  ChevronDown,
  Star,
  Zap,
  Flame,
  Send
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const LandingPage: React.FC = () => {
  const { openOnboarding, setActiveTab } = useUser();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [demoInput, setDemoInput] = useState('');
  const [demoMessages, setDemoMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your InfinityfitAI Coach. Ask me anything about your macros, diet swaps, or workout routine.' },
    { sender: 'user', text: 'Can I swap 200g Paneer for Tofu while preserving my 32g protein target?' },
    { sender: 'bot', text: 'Yes! 180g of Organic Firm Tofu yields exactly 32.4g protein while dropping total fat by 58% and saving 140 kcal.' }
  ]);

  const handleDemoSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoInput.trim()) return;
    const userQuery = demoInput;
    setDemoMessages((prev) => [
      ...prev,
      { sender: 'user', text: userQuery },
      { sender: 'bot', text: `Analyzing "${userQuery}"... For optimal performance, maintain a 300 kcal deficit and pair with 40g post-workout whey.` }
    ]);
    setDemoInput('');
  };

  const faqs = [
    {
      q: "How does InfinityfitAI calculate my daily nutrition and calorie targets?",
      a: "InfinityfitAI uses the clinical Mifflin-St Jeor formula to calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). We apply specific caloric adjustments tailored to your target weight goals."
    },
    {
      q: "What makes the AI Food Planner different from basic calorie counters?",
      a: "Unlike standard loggers, InfinityfitAI provides full macronutrient & 12-micronutrient tracking, instant ingredient swap recommendations (e.g. Paneer ↔ Tofu ↔ Soy Chunks), and direct e-commerce links to purchase ingredients."
    },
    {
      q: "Is the Intermittent Fasting timer customizable?",
      a: "Yes. InfinityfitAI supports popular fasting protocols (16:8, 14:10, 18:6, OMAD) with live progress tracking, eating window countdowns, and hydration reminders."
    },
    {
      q: "Can I export my meal and workout plans as a PDF report?",
      a: "With one click, you can export a clean, high-resolution PDF health blueprint to share with your personal trainer or nutritionist."
    }
  ];

  return (
    <div className="space-y-36 pb-24 text-slate-100">
      
      {/* 1. HERO SECTION (Full Viewport Fill, Large Headline, One Sentence, 2 CTAs, Right Illustration) */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 lg:pt-16 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Next-Gen Health SaaS Platform</span>
              </motion.div>

              {/* Massive Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
              >
                Train Smarter. <br />
                Eat Better. <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Live Stronger.
                </span>
              </motion.h1>

              {/* One Sentence Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-400 max-w-xl font-normal leading-relaxed"
              >
                The precision AI health platform engineered for hyper-personalized nutrition, adaptive workout algorithms, and real-time body analytics.
              </motion.p>

              {/* Primary & Secondary CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 pt-2"
              >
                <button
                  onClick={openOnboarding}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3 group"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Start Free Blueprint</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 text-slate-200 border border-white/10 font-bold text-sm backdrop-blur-xl transition-all flex items-center justify-center gap-2"
                >
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Explore Demo Dashboard</span>
                </button>
              </motion.div>

            </div>

            {/* Right Column: Sleek Product Illustration */}
            <div className="lg:col-span-5 relative flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-full max-w-md p-6 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-2xl space-y-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black">
                      <Flame className="w-5 h-5 text-slate-950" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">Daily Macro Overview</h4>
                      <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Live Health Sync</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    Optimal
                  </span>
                </div>

                {/* Progress Visual Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Calories Burned</span>
                    <span className="text-emerald-400 font-extrabold">2,140 / 2,400 kcal</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full w-[88%]" />
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 text-center">
                    <span className="block text-[10px] text-slate-400 font-semibold uppercase">Protein</span>
                    <span className="text-sm font-extrabold text-white">142g</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 text-center">
                    <span className="block text-[10px] text-slate-400 font-semibold uppercase">Carbs</span>
                    <span className="text-sm font-extrabold text-white">180g</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 text-center">
                    <span className="block text-[10px] text-slate-400 font-semibold uppercase">Fats</span>
                    <span className="text-sm font-extrabold text-white">54g</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUSTED BY USERS / SOCIAL PROOF BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-y border-white/[0.08] py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-white tracking-tight">50,000+</span>
            <span className="text-xs text-slate-400 font-medium">Active Athletes & Users</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">4.9 / 5.0</span>
            <span className="text-xs text-slate-400 font-medium">User Rating ⭐⭐⭐⭐⭐</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-white tracking-tight">99.4%</span>
            <span className="text-xs text-slate-400 font-medium">Clinical Formula Precision</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-400 tracking-tight">WHOOP Standard</span>
            <span className="text-xs text-slate-400 font-medium">Apple Health Quality</span>
          </div>
        </div>
      </section>

      {/* 3. KEY BENEFITS (3 Spacious Focused Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-emerald-400">Why InfinityfitAI</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Engineered for Personal Longevity</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Mifflin-St Jeor Clinical Precision",
              desc: "Accurately calculates your BMR and TDEE based on exact metabolic multipliers, eliminating guessing games."
            },
            {
              title: "12-Micronutrient & Macro Balance",
              desc: "Go beyond basic calories. Track essential Vitamin C, D, Iron, Calcium, and Fiber for peak cellular energy."
            },
            {
              title: "Intelligent Swap Engine",
              desc: "Instantly swap ingredients (e.g., Paneer to Tofu) while preserving exact macro targets and dietary preferences."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl hover:border-emerald-500/30 transition-all space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                0{idx + 1}
              </div>
              <h4 className="text-xl font-bold text-white tracking-tight">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURES GRID (4 Highlighted Modules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-cyan-400">Core Ecosystem</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Everything in One Calm Interface</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              id: 'meals',
              title: 'AI Nutrition & Meal Planner',
              desc: 'Personalized meal schedules with 12 micronutrient breakdowns, macro targets, and direct e-commerce ingredient ordering.',
              icon: Utensils
            },
            {
              id: 'workouts',
              title: 'Smart Workout Engine',
              desc: 'Algorithmically curated strength, cardio, and home workouts with exercise target muscle guides and burn rates.',
              icon: Dumbbell
            },
            {
              id: 'fasting',
              title: 'Intermittent Fasting Ring',
              desc: 'Live circular progress countdowns for 16:8, 18:6, and OMAD fasting protocols with hydration reminders.',
              icon: Clock
            },
            {
              id: 'aicoach',
              title: 'AI Health FitBot Coach',
              desc: '24/7 conversational assistant for real-time diet recommendations, recovery advice, and macro calculations.',
              icon: Bot
            }
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                onClick={() => { setActiveTab(feature.id); window.scrollTo(0,0); }}
                className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl hover:border-emerald-500/30 hover:-translate-y-1 transition-all cursor-pointer group space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {feature.desc}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 pt-2">
                  <span>Open Feature</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. AI DEMO INTERACTIVE PREVIEW */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-emerald-400">Interactive AI Demo</h2>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">Test the AI FitBot Assistant</h3>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">InfinityfitAI Assistant</h4>
                <span className="text-[10px] text-slate-400">Conversational Nutrition Specialist</span>
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {demoMessages.map((msg, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                  msg.sender === 'user'
                    ? 'ml-auto bg-emerald-500/20 border border-emerald-500/30 text-emerald-200'
                    : 'bg-slate-950/80 border border-white/5 text-slate-300'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleDemoSend} className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
              placeholder="Ask AI Coach a question..."
              className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
            <button
              type="submit"
              className="p-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
            >
              <Send className="w-4 h-4 fill-slate-950" />
            </button>
          </form>
        </div>
      </section>

      {/* 6. SCREENSHOTS / PRODUCT PREVIEW CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-cyan-400">Product Interface</h2>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">Crafted with Uncompromising Quality</h3>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/5 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">Nutrition Module</span>
            <h4 className="text-lg font-bold text-white">Complete Macro Split</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Visual bar breakdown of protein, carbs, fats, and essential micronutrients.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/5 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">Fasting Engine</span>
            <h4 className="text-lg font-bold text-white">Live Progress Ring</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Circular countdown timers for 16:8 protocols with metabolic state indicators.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/5 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400">PDF Generator</span>
            <h4 className="text-lg font-bold text-white">Exportable Reports</h4>
            <p className="text-xs text-slate-400 leading-relaxed">High-resolution clinical PDF blueprints downloadable with a single tap.</p>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-emerald-400">Member Testimonials</h2>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">Trusted by Athletes & Physicians</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Marcus Vance',
              role: 'Sports Physician',
              text: 'The Mifflin-St Jeor precision in InfinityfitAI rivals medical software. Extremely clean UI.',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
            },
            {
              name: 'Elena Rostova',
              role: 'CrossFit Athlete',
              text: 'The intelligent swap modal lets me swap paneer for tofu with exact macro preservation.',
              avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop'
            },
            {
              name: 'Rahul Sharma',
              role: 'Software Architect',
              text: 'The fasting timer and daily macro logger feel like Apple Health or Linear. Unbelievably smooth.',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
            }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, r) => (
                  <Star key={r} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">"{item.text}"</p>
              <div className="flex items-center gap-3 pt-2">
                <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                <div>
                  <h5 className="text-xs font-bold text-white">{item.name}</h5>
                  <span className="text-[10px] text-slate-400">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h3>
          <p className="text-xs text-slate-400">Got questions about InfinityfitAI? We have answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-900/80 border border-white/[0.08] overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-100 hover:text-emerald-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-emerald-400' : 'text-slate-500'}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-500/30 text-center space-y-6 backdrop-blur-2xl">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Ready to Elevate Your Physical Health?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">Generate your personalized AI macro blueprint and workout schedule in under 60 seconds.</p>
          <button
            onClick={openOnboarding}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-black text-xs shadow-xl shadow-emerald-500/25 hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>Generate My AI Blueprint Now</span>
          </button>
        </div>
      </section>

    </div>
  );
};
