import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';

interface IndianWelcomeAnimationProps {
  show: boolean;
  onClose: () => void;
}

export const IndianWelcomeAnimation: React.FC<IndianWelcomeAnimationProps> = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md cursor-pointer"
        >
          {/* Main Card */}
          <motion.div
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative w-full max-w-sm rounded-3xl p-8 text-center overflow-hidden border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.25)] bg-slate-900/95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Indian Tricolor & Gold Ambient Glows */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            {/* Rotating Mandala Background Pattern */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
            >
              <svg className="w-80 h-80 text-amber-400" viewBox="0 0 200 200" fill="currentColor">
                <path d="M100 0 C110 30 130 50 160 50 C130 50 110 70 100 100 C90 70 70 50 40 50 C70 50 90 30 100 0 Z" />
                <path d="M100 100 C110 130 130 150 160 150 C130 150 110 170 100 200 C90 170 70 150 40 150 C70 150 90 130 100 100 Z" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </motion.div>

            {/* Floating Diya / Sparkle Elements */}
            <div className="relative z-10 space-y-5">
              
              {/* Namaste Icon with Golden Aura */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.6, ease: 'backOut' }}
                className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-emerald-500 p-0.5 shadow-xl flex items-center justify-center"
              >
                <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center text-4xl shadow-inner relative overflow-hidden">
                  <span className="animate-bounce">🙏</span>
                  <Sparkles className="w-4 h-4 text-amber-400 absolute top-2 right-2 animate-pulse" />
                </div>
              </motion.div>

              {/* Hindi Greetings & Welcome Message */}
              <div className="space-y-2">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider"
                >
                  🇮🇳 हिंदी भाषा चुनी गई
                </motion.span>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-black bg-gradient-to-r from-amber-300 via-orange-400 to-emerald-400 bg-clip-text text-transparent"
                >
                  नमस्ते!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm font-semibold text-slate-200"
                >
                  InfinityFitAI में आपका स्वागत है
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs text-slate-400"
                >
                  अपनी सेहत और पोषण की यात्रा का मज़ा लें ✨
                </motion.p>
              </div>

              {/* Dismiss Action */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-emerald-500 text-white font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>शुरू करें (Continue)</span>
                <Check className="w-4 h-4" />
              </motion.button>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
