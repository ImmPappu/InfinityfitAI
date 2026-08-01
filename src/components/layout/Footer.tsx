import React from 'react';
import { ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { InfinityLogo } from '../common/InfinityLogo';

export const Footer: React.FC = () => {
  const { setActiveTab, openOnboarding } = useUser();

  return (
    <footer className="w-full bg-white border-t border-[#E5E7EB] text-[#6B7280] py-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#E5E7EB]">
          
          {/* Brand Intro */}
          <div className="space-y-4 md:col-span-1">
            <InfinityLogo size="md" showText={true} />
            <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
              Train Smarter. Eat Better. Live Stronger.
            </p>
            <p className="text-[11px] text-[#6B7280] leading-relaxed">
              High precision SaaS health ecosystem engineered with clinical Mifflin-St Jeor algorithms.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#22C55E]">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span>HIPAA Compliant Data Standard</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#111827] mb-4">
              Core Platform
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button onClick={() => { setActiveTab('meals'); window.scrollTo(0,0); }} className="hover:text-[#22C55E] transition-colors">
                  AI Nutrition & Meal Planner
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('workouts'); window.scrollTo(0,0); }} className="hover:text-[#22C55E] transition-colors">
                  Smart Workout Engine
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('fasting'); window.scrollTo(0,0); }} className="hover:text-[#22C55E] transition-colors">
                  Intermittent Fasting Ring
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('yoga'); window.scrollTo(0,0); }} className="hover:text-[#22C55E] transition-colors">
                  Yoga & Mindfulness
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('aicoach'); window.scrollTo(0,0); }} className="hover:text-[#22C55E] transition-colors">
                  AI FitBot Coach
                </button>
              </li>
            </ul>
          </div>

          {/* Standalone SEO Calculators */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#111827] mb-4">
              Calculators Engine
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button onClick={() => { setActiveTab('calculators'); window.scrollTo(0,0); }} className="hover:text-[#22C55E] transition-colors">
                  BMI Calculator
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('calculators'); window.scrollTo(0,0); }} className="hover:text-[#22C55E] transition-colors">
                  BMR Calculator (Mifflin-St Jeor)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('calculators'); window.scrollTo(0,0); }} className="hover:text-[#22C55E] transition-colors">
                  TDEE & Calorie Deficit
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('calculators'); window.scrollTo(0,0); }} className="hover:text-[#22C55E] transition-colors">
                  Macronutrient Splitter
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('calculators'); window.scrollTo(0,0); }} className="hover:text-[#22C55E] transition-colors">
                  Hydration Target Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* CTA & App Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#111827] mb-4">
              Get Started
            </h4>
            <p className="text-xs text-[#6B7280]">
              Calculate your personal macros, diet plan, and fitness metrics in under 60 seconds.
            </p>
            <button
              onClick={openOnboarding}
              className="w-full py-3 px-4 rounded-full bg-[#22C55E] hover:bg-[#16a34a] text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] gap-4">
          <p>© {new Date().getFullYear()} InfinityFitAI Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-[#F97316] fill-[#F97316] inline" />
            <span>for health & longevity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
