import React from 'react';
import { motion } from 'framer-motion';
import { X, ChefHat, Play } from 'lucide-react';
import type { FoodItem } from '../../types';

interface Props {
  food: FoodItem;
  onClose: () => void;
}

export const RecipeModal: React.FC<Props> = ({ food, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-white border border-[#E5E7EB] rounded-2xl shadow-xl overflow-hidden my-8 text-left text-[#111827]"
      >
        {/* Banner image with overlay */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 text-[#111827] hover:bg-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-[#22C55E] text-white text-[10px] font-black uppercase tracking-wider">
              {food.dietType.toUpperCase()} • {food.category.replace('_', ' ').toUpperCase()}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {food.name}
            </h2>
          </div>
        </div>

        {/* Modal content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-center text-xs">
            <div>
              <span className="text-[#6B7280] font-bold block text-[10px]">CALORIES</span>
              <span className="text-sm font-black text-[#111827]">{food.calories} kcal</span>
            </div>
            <div>
              <span className="text-[#6B7280] font-bold block text-[10px]">PROTEIN</span>
              <span className="text-sm font-black text-[#22C55E]">{food.protein}g</span>
            </div>
            <div>
              <span className="text-[#6B7280] font-bold block text-[10px]">PREP TIME</span>
              <span className="text-sm font-black text-[#06B6D4]">{food.cookingTime}</span>
            </div>
            <div>
              <span className="text-[#6B7280] font-bold block text-[10px]">HEALTH SCORE</span>
              <span className="text-sm font-black text-[#F97316]">{food.healthyRating}/10</span>
            </div>
          </div>

          {/* Ingredients list */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-[#111827] flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-[#22C55E]" />
              <span>Ingredients Required</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-[#111827]">
              {food.ingredients.map((ing, i) => (
                <li key={i} className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cooking Instructions */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-[#111827]">
              Step-by-Step Cooking Guide
            </h3>
            <ol className="space-y-3 text-xs text-[#6B7280] font-medium">
              {food.cookingSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                  <span className="w-6 h-6 rounded-full bg-[#22C55E]/10 text-[#22C55E] font-extrabold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed mt-0.5 text-[#111827]">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Video Placeholder */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-[#111827]">
              Video Masterclass
            </h3>
            <div className="relative h-44 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center group cursor-pointer overflow-hidden">
              <img src={food.image} alt="Video preview" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" />
              <div className="absolute w-14 h-14 rounded-full bg-[#22C55E] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white ml-1" />
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
