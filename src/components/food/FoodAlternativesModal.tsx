import React from 'react';
import { motion } from 'framer-motion';
import { X, RefreshCw, Sparkles } from 'lucide-react';
import type { FoodItem } from '../../types';

interface Props {
  food: FoodItem;
  onClose: () => void;
}

export const FoodAlternativesModal: React.FC<Props> = ({ food, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl bg-white border border-[#E5E7EB] rounded-2xl shadow-xl overflow-hidden my-8 text-left text-[#111827]"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#F8FAFC] border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#06B6D4]/10 text-[#06B6D4]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#111827]">
                Intelligent Swap Alternatives
              </h3>
              <p className="text-xs text-[#6B7280]">
                Nutritionally matched replacements for {food.name}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E7EB] rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          
          {/* Base Food summary */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] font-bold text-[#6B7280] block uppercase">Original Recipe Item</span>
              <strong className="text-[#111827] text-sm">{food.name}</strong>
            </div>
            <div className="text-right">
              <span className="text-[#22C55E] font-extrabold block text-sm">{food.protein}g Protein</span>
              <span className="text-[#6B7280]">{food.calories} kcal</span>
            </div>
          </div>

          {/* Recommended Alternatives list */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Nutritionally Equivalent Alternatives
            </h4>

            {food.alternatives && food.alternatives.length > 0 ? (
              food.alternatives.map((alt, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#22C55E]/40 hover:bg-[#F8FAFC] transition-all space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#22C55E]" />
                      <h5 className="text-sm font-bold text-[#111827]">{alt.name}</h5>
                    </div>
                    <span className="text-xs font-extrabold text-[#F97316]">₹180 est.</span>
                  </div>

                  <p className="text-xs text-[#6B7280] leading-relaxed font-medium">
                    💡 {alt.reason}
                  </p>

                  <div className="grid grid-cols-4 gap-2 pt-1 text-center text-[10px] font-bold">
                    <div className="p-1.5 rounded-lg bg-[#F8FAFC] text-[#111827] border border-[#E5E7EB]">
                      <span>Cal: {alt.calories}</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#22C55E]/10 text-[#22C55E]">
                      <span>Pro: {alt.protein}g</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#06B6D4]/10 text-[#06B6D4]">
                      <span>Carb: {alt.carbs}g</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#F97316]/10 text-[#F97316]">
                      <span>Fat: {alt.fat}g</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#6B7280] text-center">
                Paneer ↔ Tofu ↔ Soy Chunks ↔ Chickpeas are ideal substitutes for this item.
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
};
