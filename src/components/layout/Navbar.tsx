import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { InfinityLogo } from '../common/InfinityLogo';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, openOnboarding } = useUser();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Requested simple navigation list
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'meals', label: 'Meal Planner' },
    { id: 'workouts', label: 'Workout' },
    { id: 'aicoach', label: 'AI Coach' },
    { id: 'pricing', label: 'Pricing' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'features' || id === 'pricing') {
      setActiveTab('home');
      setMobileMenuOpen(false);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E5E7EB] transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <InfinityLogo size="md" showText={true} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F8FAFC] px-3 py-1.5 rounded-full border border-[#E5E7EB]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 ${
                  isActive 
                    ? 'text-[#22C55E] bg-white border border-[#E5E7EB] shadow-xs' 
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Language & Get Started CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <LanguageSelector />
          
          <button
            onClick={openOnboarding}
            className="px-6 py-2.5 rounded-full bg-[#22C55E] hover:bg-[#16a34a] text-white font-extrabold text-xs transition-all shadow-sm flex items-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] focus:outline-none"
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
            className="sm:hidden border-b border-[#E5E7EB] bg-white px-4 py-6 space-y-4 shadow-lg"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <LanguageSelector />
              <button
                onClick={() => { setMobileMenuOpen(false); openOnboarding(); }}
                className="px-5 py-2.5 rounded-full bg-[#22C55E] text-white text-xs font-extrabold shadow-sm"
              >
                Get Started
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
                      isActive 
                        ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30' 
                        : 'text-[#111827] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {item.label}
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
