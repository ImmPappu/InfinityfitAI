import React from 'react';
import { motion } from 'framer-motion';
import { X, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';
import type { FoodItem } from '../../types';

interface Props {
  food: FoodItem;
  onClose: () => void;
}

export const FoodAlternativesModal: React.FC<Props> = ({ food, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-teal-500/10 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <RefreshCw className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                Intelligent Swap Alternatives
              </h3>
              <p className="text-xs text-slate-400">
                Nutritionally matched replacements for {food.name}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          
          {/* Base Food summary */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Original Recipe Item</span>
              <strong className="text-white text-sm">{food.name}</strong>
            </div>
            <div className="text-right">
              <span className="text-emerald-400 font-extrabold block text-sm">{food.protein}g Protein</span>
              <span className="text-slate-400">{food.calories} kcal</span>
            </div>
          </div>

          {/* Recommended Alternatives list */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Nutritionally Equivalent Alternatives
            </h4>

            {food.alternatives && food.alternatives.length > 0 ? (
              food.alternatives.map((alt, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <h5 className="text-sm font-bold text-white">{alt.name}</h5>
                    </div>
                    <span className="text-xs font-extrabold text-cyan-400">${alt.priceEstimate.toFixed(2)} est.</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    💡 {alt.reason}
                  </p>

                  <div className="grid grid-cols-4 gap-2 pt-1 text-center text-[10px] font-bold">
                    <div className="p-1.5 rounded-lg bg-slate-900 text-slate-300">
                      <span>Cal: {alt.calories}</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <span>Pro: {alt.protein}g</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <span>Carb: {alt.carbs}g</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                      <span>Fat: {alt.fat}g</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 text-xs text-slate-400 text-center">
                Paneer ↔ Tofu ↔ Soy Chunks ↔ Chickpeas are ideal substitutes for this item.
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
};
