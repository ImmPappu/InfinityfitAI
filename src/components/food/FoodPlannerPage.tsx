import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Flame, 
  Sparkles,
  Target
} from 'lucide-react';
import { mockFoodItems } from '../../data/mockData';
import type { FoodItem } from '../../types';
import { RecipeModal } from './RecipeModal';
import { FoodAlternativesModal } from './FoodAlternativesModal';
import { EcommerceBuyModal } from './EcommerceBuyModal';
import { useUser } from '../../context/UserContext';

export const FoodPlannerPage: React.FC = () => {
  const { profile, metrics } = useUser();

  // Auto-set diet filter based on user's diet preference
  const defaultDiet = (): string => {
    if (profile.dietPreference === 'veg') return 'veg';
    if (profile.dietPreference === 'vegan') return 'vegan';
    return 'all'; // non-veg users see everything
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDiet, setSelectedDiet] = useState<string>(defaultDiet);
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

  // Filter and sort meals dynamically based on user profile
  const filteredFoods = useMemo(() => {
    let foods = mockFoodItems.filter((food) => {
      if (selectedCategory !== 'all' && food.category !== selectedCategory) return false;
      if (selectedDiet !== 'all' && food.dietType !== selectedDiet) return false;
      if (highProteinOnly && food.protein < 25) return false;
      if (searchQuery && !food.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    // Sort by goal relevance:
    // - Weight loss: lower calorie meals first
    // - Weight gain: higher protein meals first
    // - Maintain: balanced (by health rating)
    if (profile.goal === 'lose') {
      foods = [...foods].sort((a, b) => a.calories - b.calories);
    } else if (profile.goal === 'gain') {
      foods = [...foods].sort((a, b) => b.protein - a.protein);
    } else {
      foods = [...foods].sort((a, b) => b.healthyRating - a.healthyRating);
    }

    return foods;
  }, [selectedCategory, selectedDiet, highProteinOnly, searchQuery, profile.goal]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Active Modals */}
      {recipeModalFood && <RecipeModal food={recipeModalFood} onClose={() => setRecipeModalFood(null)} />}
      {altModalFood && <FoodAlternativesModal food={altModalFood} onClose={() => setAltModalFood(null)} />}
      {buyModalFood && <EcommerceBuyModal food={buyModalFood} onClose={() => setBuyModalFood(null)} />}

      {/* Personalized Daily Target Banner */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#ECFDF5] border border-[#22C55E]/20 text-xs font-semibold text-[#111827]">
        <Target className="w-4 h-4 text-[#22C55E]" />
        <span>
          Your Daily Target: <strong className="text-[#22C55E]">{metrics.dailyCalories} kcal</strong> • <strong className="text-[#06B6D4]">{metrics.proteinGrams}g Protein</strong> • <strong className="text-[#F97316]">{metrics.carbGrams}g Carbs</strong> • <strong className="text-[#8B5CF6]">{metrics.fatGrams}g Fat</strong>
          {profile.goal === 'lose' && ' — Sorted by lowest calories first'}
          {profile.goal === 'gain' && ' — Sorted by highest protein first'}
        </span>
      </div>

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Precision Diet Planner</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
          Nutrient-Dense Culinary Ecosystem
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl font-medium">
          Every meal is calculated with full macros, 12 essential micronutrients, intelligent ingredient swaps (Paneer ↔ Tofu), and 10-minute grocery delivery integration.
        </p>

        {/* Search & Micro Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search recipes, ingredients (e.g. Tofu, Chicken)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-semibold text-[#111827] focus:outline-none focus:border-[#22C55E]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {['all', 'veg', 'non-veg', 'vegan'].map((diet) => (
              <button
                key={diet}
                onClick={() => setSelectedDiet(diet)}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                  selectedDiet === diet
                    ? 'bg-[#22C55E] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#6B7280] border border-[#E5E7EB] hover:text-[#111827]'
                }`}
              >
                {diet}
              </button>
            ))}

            <button
              onClick={() => setHighProteinOnly(!highProteinOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                highProteinOnly
                  ? 'bg-[#06B6D4] text-white'
                  : 'bg-[#F8FAFC] text-[#6B7280] border border-[#E5E7EB]'
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
                ? 'bg-[#22C55E] text-white shadow-sm'
                : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#111827]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FOOD CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => {
          const getEmoji = (name: string) => {
            const lower = name.toLowerCase();
            if (lower.includes('chicken')) return '🍗';
            if (lower.includes('paneer') || lower.includes('cheese')) return '🧀';
            if (lower.includes('tofu') || lower.includes('salad')) return '🥗';
            if (lower.includes('oat') || lower.includes('pancake')) return '🥞';
            if (lower.includes('egg') || lower.includes('bhurji')) return '🥚';
            if (lower.includes('fish') || lower.includes('salmon')) return '🐟';
            if (lower.includes('soya') || lower.includes('soy')) return '🫘';
            if (lower.includes('dal') || lower.includes('chana') || lower.includes('curry')) return '🍲';
            if (lower.includes('lassi') || lower.includes('yogurt') || lower.includes('smoothie')) return '🥤';
            return '🍲';
          };

          return (
            <motion.div
              key={food.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl bg-white border border-[#E5E7EB] shadow-sm overflow-hidden group hover:border-[#22C55E]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Title with Emoji Header */}
                <div className="p-4 pb-3 border-b border-[#E5E7EB] flex items-center justify-between">
                  <h3 className="text-lg font-black text-[#111827] flex items-center gap-2">
                    <span>{getEmoji(food.name)}</span>
                    <span>{food.name}</span>
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-black uppercase">
                    {food.dietType}
                  </span>
                </div>

                {/* Large Food Image */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 border border-[#E5E7EB] text-[#111827] text-xs font-extrabold backdrop-blur-md">
                    {food.cookingTime} prep • {food.servingSize}
                  </span>
                </div>

                {/* Protein and Calories Metrics */}
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-center text-xs font-bold">
                    <div>
                      <span className="text-[#22C55E] block text-[10px] uppercase font-bold">PROTEIN</span>
                      <span className="text-[#22C55E] text-sm font-black">{food.protein}g</span>
                    </div>
                    <div>
                      <span className="text-[#111827] block text-[10px] uppercase font-bold">CALORIES</span>
                      <span className="text-[#111827] text-sm font-black">{food.calories}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grocery Quick Buy Buttons (Amazon, Blinkit, BigBasket) */}
              <div className="p-5 pt-0 space-y-2 border-t border-[#E5E7EB] mt-2">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  Order Raw Ingredients
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setBuyModalFood(food)}
                    className="py-2.5 px-2 rounded-xl bg-[#F8FAFC] hover:bg-[#22C55E] hover:text-white border border-[#E5E7EB] text-[#111827] font-black text-xs transition-all text-center shadow-xs"
                  >
                    Amazon
                  </button>
                  <button
                    onClick={() => setBuyModalFood(food)}
                    className="py-2.5 px-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F97316] hover:text-white border border-[#E5E7EB] text-[#111827] font-black text-xs transition-all text-center shadow-xs"
                  >
                    Blinkit
                  </button>
                  <button
                    onClick={() => setBuyModalFood(food)}
                    className="py-2.5 px-2 rounded-xl bg-[#F8FAFC] hover:bg-[#06B6D4] hover:text-white border border-[#E5E7EB] text-[#111827] font-black text-xs transition-all text-center shadow-xs"
                  >
                    BigBasket
                  </button>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
