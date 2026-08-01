import React from 'react';
import { motion } from 'framer-motion';
import { X, Clock, ChefHat, Flame, DollarSign, Star, Play } from 'lucide-react';
import type { FoodItem } from '../../types';

interface Props {
  food: FoodItem;
  onClose: () => void;
}

export const RecipeModal: React.FC<Props> = ({ food, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
      >
        {/* Banner image with overlay */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
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
          <div className="grid grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs">
            <div>
              <span className="text-slate-400 font-bold block text-[10px]">CALORIES</span>
              <span className="text-sm font-black text-emerald-400">{food.calories} kcal</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block text-[10px]">PROTEIN</span>
              <span className="text-sm font-black text-cyan-400">{food.protein}g</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block text-[10px]">PREP TIME</span>
              <span className="text-sm font-black text-purple-400">{food.cookingTime}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block text-[10px]">HEALTH SCORE</span>
              <span className="text-sm font-black text-amber-400">{food.healthyRating}/10</span>
            </div>
          </div>

          {/* Ingredients list */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-emerald-400" />
              <span>Ingredients Required</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
              {food.ingredients.map((ing, i) => (
                <li key={i} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cooking Instructions */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-white">
              Step-by-Step Cooking Guide
            </h3>
            <ol className="space-y-3 text-xs text-slate-300 font-medium">
              {food.cookingSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed mt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Video Placeholder */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-white">
              Video Masterclass
            </h3>
            <div className="relative h-44 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group cursor-pointer overflow-hidden">
              <img src={food.image} alt="Video preview" className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform" />
              <div className="absolute w-14 h-14 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-slate-950 ml-1" />
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
