import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Utensils, 
  Dumbbell, 
  Clock, 
  Bot, 
  LineChart, 
  Calculator, 
  Settings, 
  Menu, 
  X, 
  Sparkles,
  Flame,
  Flower2,
  ChevronDown
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { InfinityLogo } from '../common/InfinityLogo';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, openOnboarding } = useUser();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // Clean 6 primary nav items
  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Activity },
    { id: 'dashboard', label: 'Dashboard', icon: Flame },
    { id: 'meals', label: 'Nutrition', icon: Utensils },
    { id: 'workouts', label: 'Workout', icon: Dumbbell },
    { id: 'progress', label: 'Progress', icon: LineChart },
    { id: 'aicoach', label: 'AI Coach', icon: Bot },
  ];

  // Secondary items nested inside "More"
  const moreNavItems = [
    { id: 'fasting', label: 'Fasting Timer', icon: Clock },
    { id: 'yoga', label: 'Yoga & Mindfulness', icon: Flower2 },
    { id: 'calculators', label: 'Calculators Hub', icon: Calculator },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const isMoreActive = moreNavItems.some((item) => item.id === activeTab);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setMoreOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0B0F17]/80 border-b border-white/[0.08] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <InfinityLogo size="md" showText={true} />
        </div>

        {/* Desktop Navigation Links (Clean 6 items + More) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/[0.08]">
          {mainNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive 
                    ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                isMoreActive 
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180 text-emerald-400' : ''}`} />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-52 p-2 rounded-2xl bg-[#0F172A]/95 border border-white/10 shadow-2xl backdrop-blur-2xl space-y-1"
                >
                  {moreNavItems.map((subItem) => {
                    const Icon = subItem.icon;
                    const isActive = activeTab === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => handleNavClick(subItem.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive 
                            ? 'bg-emerald-500/10 text-emerald-400 font-bold' 
                            : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                        <span>{subItem.label}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right Action Icons: Language & Start Journey CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <LanguageSelector />
          
          <button
            onClick={openOnboarding}
            className="relative group overflow-hidden rounded-full p-px font-bold text-xs focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-full animate-pulse-glow" />
            <span className="relative block px-5 py-2 rounded-full bg-[#0B0F17] text-emerald-400 group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-slate-950 font-extrabold transition-all duration-300 flex items-center gap-2 shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('startJourney')}</span>
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-b border-white/10 bg-[#0B0F17]/95 backdrop-blur-2xl px-4 py-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <LanguageSelector />
              <button
                onClick={() => { setMobileMenuOpen(false); openOnboarding(); }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-black shadow-lg"
              >
                {t('startJourney')}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[...mainNavItems, ...moreNavItems].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
