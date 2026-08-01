import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const DesignerThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Designer Theme"
      className="relative group focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-full p-1 transition-transform active:scale-95"
    >
      {/* External Glowing Ambient Halo */}
      <div className={`absolute -inset-1 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600' 
          : 'bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500'
      }`} />

      {/* Main Designer Capsule Container */}
      <div className="relative flex items-center justify-between w-20 h-10 px-1.5 rounded-full bg-slate-900/90 dark:bg-slate-950/90 border border-slate-700/60 dark:border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* Animated Background Micro Gradients */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-20 bg-gradient-to-r from-cyan-500 to-purple-600' : 'opacity-30 bg-gradient-to-r from-amber-300 to-yellow-400'}`} />

        {/* Sun Icon (Left Side) */}
        <div className={`z-10 flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-300 ${!isDarkMode ? 'text-amber-400 scale-110' : 'text-slate-500 hover:text-slate-300'}`}>
          <Sun className="w-4 h-4 stroke-[2.2]" />
        </div>

        {/* Moon Icon (Right Side) */}
        <div className={`z-10 flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-300 ${isDarkMode ? 'text-cyan-300 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
          <Moon className="w-4 h-4 stroke-[2.2]" />
        </div>

        {/* Sliding Designer Pill Thumb */}
        <motion.div
          className={`absolute top-1 w-8 h-8 rounded-full shadow-lg flex items-center justify-center border ${
            isDarkMode 
              ? 'bg-gradient-to-tr from-cyan-500 to-emerald-400 border-cyan-300/40 text-slate-950' 
              : 'bg-gradient-to-tr from-amber-400 to-yellow-300 border-amber-200 text-amber-950'
          }`}
          animate={{
            x: isDarkMode ? 40 : 0,
            rotate: isDarkMode ? 360 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 28,
          }}
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        </motion.div>
      </div>

      {/* Floating Tooltip Pill */}
      <span className="absolute top-12 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest bg-slate-900/90 text-slate-200 border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl z-50 whitespace-nowrap">
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};
