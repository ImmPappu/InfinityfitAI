import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, 
  Search, 
  Filter, 
  Flame, 
  Clock, 
  ChefHat, 
  ShoppingBag, 
  RefreshCw, 
  Sparkles, 
  Star,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { mockFoodItems } from '../../data/mockData';
import type { FoodItem, DietPreference } from '../../types';
import { RecipeModal } from './RecipeModal';
import { FoodAlternativesModal } from './FoodAlternativesModal';
import { EcommerceBuyModal } from './EcommerceBuyModal';

export const FoodPlannerPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [highProteinOnly, setHighProteinOnly] = useState<boolean>(false);

  // Active Modals
  const [recipeModalFood, setRecipeModalFood] = useState<FoodItem | null>(null);
  const [altModalFood, setAltModalFood] = useState<FoodItem | null>(null);
  const [buyModalFood, setBuyModalFood] = useState<FoodItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Meals' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'pre_workout', label: 'Pre-Workout' },
    { id: 'post_workout', label: 'Post-Workout' },
  ];

  const filteredFoods = mockFoodItems.filter((food) => {
    if (selectedCategory !== 'all' && food.category !== selectedCategory) return false;
    if (selectedDiet !== 'all' && food.dietType !== selectedDiet) return false;
    if (highProteinOnly && food.protein < 25) return false;
    if (searchQuery && !food.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Active Modals */}
      {recipeModalFood && <RecipeModal food={recipeModalFood} onClose={() => setRecipeModalFood(null)} />}
      {altModalFood && <FoodAlternativesModal food={altModalFood} onClose={() => setAltModalFood(null)} />}
      {buyModalFood && <EcommerceBuyModal food={buyModalFood} onClose={() => setBuyModalFood(null)} />}

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-slate-800 backdrop-blur-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Precision Diet Planner</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Nutrient-Dense Culinary Ecosystem
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl font-medium">
          Every meal is calculated with full macros, 12 essential micronutrients, intelligent ingredient swaps (Paneer ↔ Tofu), and 10-minute grocery delivery integration.
        </p>

        {/* Search & Micro Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search recipes, ingredients (e.g. Tofu, Chicken)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {['all', 'veg', 'non-veg', 'vegan'].map((diet) => (
              <button
                key={diet}
                onClick={() => setSelectedDiet(diet)}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                  selectedDiet === diet
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {diet}
              </button>
            ))}

            <button
              onClick={() => setHighProteinOnly(!highProteinOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                highProteinOnly
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>25g+ Protein</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FOOD CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => (
          <motion.div
            key={food.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl overflow-hidden group hover:border-emerald-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-emerald-400 text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
                  {food.dietType.toUpperCase()}
                </span>

                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-black backdrop-blur-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{food.healthyRating}/10</span>
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                    {food.name}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-2 mt-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{food.cookingTime} prep • {food.servingSize}</span>
                  </span>
                </div>

                {/* Macros Grid */}
                <div className="grid grid-cols-4 gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-center text-[10px] font-bold">
                  <div>
                    <span className="text-slate-400 block">CALORIES</span>
                    <span className="text-white text-xs font-black">{food.calories}</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 block">PROTEIN</span>
                    <span className="text-emerald-400 text-xs font-black">{food.protein}g</span>
                  </div>
                  <div>
                    <span className="text-cyan-400 block">CARBS</span>
                    <span className="text-cyan-400 text-xs font-black">{food.carbs}g</span>
                  </div>
                  <div>
                    <span className="text-purple-400 block">FAT</span>
                    <span className="text-purple-400 text-xs font-black">{food.fat}g</span>
                  </div>
                </div>

                {/* Key Micros */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1">
                  <span>Vit C: {food.vitC}mg</span>
                  <span>Iron: {food.iron}mg</span>
                  <span>Calcium: {food.calcium}mg</span>
                </div>
              </div>
            </div>

            {/* Card Action Buttons Footer */}
            <div className="p-5 pt-0 space-y-2 border-t border-slate-800/40 mt-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAltModalFood(food)}
                  className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Swap Alt</span>
                </button>

                <button
                  onClick={() => setRecipeModalFood(food)}
                  className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition-all"
                >
                  <ChefHat className="w-3.5 h-3.5 text-purple-400" />
                  <span>Recipe</span>
                </button>
              </div>

              {/* Ecommerce Buy Now Button */}
              <button
                onClick={() => setBuyModalFood(food)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 fill-slate-950" />
                <span>Buy Ingredients (Blinkit/Zepto)</span>
              </button>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
};
