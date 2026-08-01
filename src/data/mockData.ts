import type { FoodItem, ExerciseItem, YogaPose, FastingPlan, AchievementBadge } from '../types';

export const mockFoodItems: FoodItem[] = [
  {
    id: 'food-1',
    name: 'Grilled Tofu & Quinoa Power Bowl',
    category: 'lunch',
    dietType: 'vegan',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
    calories: 520,
    protein: 32,
    carbs: 58,
    fat: 16,
    fiber: 11,
    sugar: 4,
    sodium: 420,
    calcium: 350,
    iron: 6.2,
    vitC: 45,
    vitD: 100,
    servingSize: '1 Large Bowl (400g)',
    cookingTime: '20 mins',
    difficulty: 'Easy',
    priceEstimate: 4.50,
    healthyRating: 9.8,
    ingredients: ['200g Organic Firm Tofu', '1 cup Cooked Quinoa', '1/2 Avocado', '1 cup Steamed Broccoli', '1 tbsp Sesame Oil', '1 tbsp Low Sodium Soy Sauce'],
    cookingSteps: [
      'Press and slice firm tofu into 1-inch cubes.',
      'Sauté tofu cubes in sesame oil over medium heat until golden brown on all sides (8 mins).',
      'Cook quinoa according to package instructions with a pinch of sea salt.',
      'Steam broccoli florets for 4 minutes until vibrant green.',
      'Assemble quinoa base, top with grilled tofu, broccoli, sliced avocado, and drizzle low sodium soy sauce.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=organic+quinoa+tofu',
      blinkit: 'https://blinkit.com/s/?q=tofu',
      bigbasket: 'https://www.bigbasket.com/ps/?q=quinoa',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=tofu',
      zepto: 'https://www.zeptonow.com/search?q=tofu'
    },
    alternatives: [
      { name: 'Paneer (Cottage Cheese)', calories: 560, protein: 34, carbs: 12, fat: 38, priceEstimate: 4.20, reason: 'Rich in dairy protein & calcium for non-vegans' },
      { name: 'Soy Chunks', calories: 480, protein: 42, carbs: 30, fat: 4, priceEstimate: 2.10, reason: 'Ultra lean high-protein budget alternative' },
      { name: 'Boiled Chickpeas', calories: 510, protein: 22, carbs: 70, fat: 10, priceEstimate: 1.80, reason: 'High fiber plant carbohydrate & protein blend' }
    ]
  },
  {
    id: 'food-2',
    name: 'Grilled Herb Chicken Breast & Sweet Potato',
    category: 'dinner',
    dietType: 'non-veg',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=800&auto=format&fit=crop',
    calories: 580,
    protein: 48,
    carbs: 45,
    fat: 14,
    fiber: 8,
    sugar: 6,
    sodium: 380,
    calcium: 120,
    iron: 4.5,
    vitC: 30,
    vitD: 80,
    servingSize: '1 Plate (350g)',
    cookingTime: '25 mins',
    difficulty: 'Medium',
    priceEstimate: 6.80,
    healthyRating: 9.6,
    ingredients: ['250g Skinless Chicken Breast', '200g Roasted Sweet Potato', '1 tbsp Extra Virgin Olive Oil', 'Rosemary, Thyme, Garlic Powder', '1 cup Asparagus Spears'],
    cookingSteps: [
      'Marinate chicken breast with olive oil, minced garlic, rosemary, and sea salt for 15 mins.',
      'Preheat oven to 200°C (400°F). Cubed sweet potatoes and toss with olive oil.',
      'Roast sweet potatoes for 20 minutes until tender.',
      'Grill chicken breast on medium-high heat for 6-7 minutes per side until internal temperature reaches 75°C (165°F).',
      'Serve chicken alongside roasted sweet potatoes and seared asparagus.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=fresh+chicken+breast',
      blinkit: 'https://blinkit.com/s/?q=chicken+breast',
      bigbasket: 'https://www.bigbasket.com/ps/?q=chicken+breast',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=chicken',
      zepto: 'https://www.zeptonow.com/search?q=chicken'
    },
    alternatives: [
      { name: 'Wild Caught Salmon', calories: 620, protein: 42, carbs: 40, fat: 22, priceEstimate: 9.50, reason: 'High Omega-3 fatty acids & heart health benefits' },
      { name: 'Boiled Egg Whites (8 Eggs)', calories: 420, protein: 44, carbs: 35, fat: 4, priceEstimate: 3.00, reason: 'Ultra pure low fat protein source' },
      { name: 'Lean Turkey Breast', calories: 550, protein: 46, carbs: 42, fat: 12, priceEstimate: 7.20, reason: 'Lean poultry alternative with high tryptophan' }
    ]
  },
  {
    id: 'food-3',
    name: 'Avocado Egg & Spinach Protein Wrap',
    category: 'breakfast',
    dietType: 'non-veg',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop',
    calories: 440,
    protein: 26,
    carbs: 34,
    fat: 22,
    fiber: 9,
    sugar: 2,
    sodium: 480,
    calcium: 220,
    iron: 5.1,
    vitC: 25,
    vitD: 210,
    servingSize: '1 Whole Wrap (280g)',
    cookingTime: '12 mins',
    difficulty: 'Easy',
    priceEstimate: 3.80,
    healthyRating: 9.4,
    ingredients: ['2 Organic Whole Eggs', '1 Whole Wheat Tortilla', '1/2 Hass Avocado', '1 cup Fresh Baby Spinach', '1 tbsp Greek Yogurt Spread'],
    cookingSteps: [
      'Whisk eggs with a pinch of black pepper and sea salt.',
      'Scramble eggs in a non-stick pan over low heat for 3 minutes.',
      'Warm whole wheat tortilla on a dry skillet for 30 seconds.',
      'Spread mashed avocado and Greek yogurt over wrap base.',
      'Layer scrambled eggs and fresh baby spinach, roll tightly and cut diagonally.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=organic+eggs',
      blinkit: 'https://blinkit.com/s/?q=eggs',
      bigbasket: 'https://www.bigbasket.com/ps/?q=eggs',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=eggs',
      zepto: 'https://www.zeptonow.com/search?q=eggs'
    },
    alternatives: [
      { name: 'Tofu & Spinach Scramble Wrap', calories: 410, protein: 24, carbs: 38, fat: 18, priceEstimate: 3.20, reason: '100% Vegan plant-powered morning wrap' },
      { name: 'Paneer Bhurji Wrap', calories: 490, protein: 28, carbs: 32, fat: 26, priceEstimate: 3.50, reason: 'Rich Indian vegetarian cottage cheese scramble' }
    ]
  },
  {
    id: 'food-4',
    name: 'Greek Yogurt Berry & Almond Parfait',
    category: 'pre_workout',
    dietType: 'veg',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop',
    calories: 340,
    protein: 24,
    carbs: 42,
    fat: 9,
    fiber: 7,
    sugar: 18,
    sodium: 110,
    calcium: 420,
    iron: 2.1,
    vitC: 35,
    vitD: 120,
    servingSize: '1 Glass Jar (250g)',
    cookingTime: '5 mins',
    difficulty: 'Easy',
    priceEstimate: 3.20,
    healthyRating: 9.7,
    ingredients: ['200g Plain Unsugared Greek Yogurt', '1/2 cup Fresh Blueberries & Strawberries', '2 tbsp Sliced Almonds', '1 tbsp Raw Honey', '1 tbsp Chia Seeds'],
    cookingSteps: [
      'Spoon half of Greek yogurt into a glass jar.',
      'Add a layer of mixed berries and chia seeds.',
      'Top with remaining Greek yogurt, sliced almonds, and a drizzle of raw honey.',
      'Enjoy immediately or chill for 30 minutes before your workout.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=greek+yogurt',
      blinkit: 'https://blinkit.com/s/?q=greek+yogurt',
      bigbasket: 'https://www.bigbasket.com/ps/?q=greek+yogurt',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=yogurt',
      zepto: 'https://www.zeptonow.com/search?q=yogurt'
    },
    alternatives: [
      { name: 'Coconut Milk Berry Parfait', calories: 310, protein: 8, carbs: 45, fat: 12, priceEstimate: 3.60, reason: 'Lactose-free dairy alternative' },
      { name: 'Oatmeal Whey Protein Bowl', calories: 380, protein: 30, carbs: 50, fat: 7, priceEstimate: 2.80, reason: 'Sustained complex carbohydrate energy source' }
    ]
  },
  {
    id: 'food-5',
    name: 'Whey Isolate Protein Smoothie & Banana',
    category: 'post_workout',
    dietType: 'veg',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=800&auto=format&fit=crop',
    calories: 310,
    protein: 36,
    carbs: 32,
    fat: 4,
    fiber: 5,
    sugar: 14,
    sodium: 180,
    calcium: 300,
    iron: 1.8,
    vitC: 12,
    vitD: 150,
    servingSize: '1 Shake (450ml)',
    cookingTime: '3 mins',
    difficulty: 'Easy',
    priceEstimate: 2.50,
    healthyRating: 9.9,
    ingredients: ['1 Scoop Whey Protein Isolate (Vanilla)', '1 Ripe Banana', '300ml Unsweetened Almond Milk', '1 tbsp Peanut Butter'],
    cookingSteps: [
      'Add almond milk, whey protein scoop, peeled banana, and peanut butter to blender.',
      'Blend on high speed for 45 seconds until velvety smooth.',
      'Pour into shaker bottle and drink within 45 minutes after workout for fast muscle recovery.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=whey+protein+isolate',
      blinkit: 'https://blinkit.com/s/?q=whey+protein',
      bigbasket: 'https://www.bigbasket.com/ps/?q=whey+protein',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=protein',
      zepto: 'https://www.zeptonow.com/search?q=protein'
    },
    alternatives: [
      { name: 'Plant Pea & Rice Protein Shake', calories: 290, protein: 32, carbs: 28, fat: 5, priceEstimate: 2.70, reason: 'Hypoallergenic vegan post-workout shake' },
      { name: 'Chocolate Low-Fat Milk', calories: 280, protein: 18, carbs: 42, fat: 5, priceEstimate: 1.50, reason: 'Natural 4:1 carb-to-protein golden recovery ratio' }
    ]
  }
];

export const mockExerciseItems: ExerciseItem[] = [
  {
    id: 'ex-1',
    title: 'Barbell Incline Bench Press',
    category: 'muscle_building',
    illustration: '🏋️‍♂️',
    targetedMuscles: ['Upper Chest', 'Anterior Deltoids', 'Triceps'],
    sets: 4,
    reps: '8 - 12 reps',
    restTimeSec: 90,
    caloriesBurned: 140,
    difficulty: 'Intermediate'
  },
  {
    id: 'ex-2',
    title: 'Weighted Dumbbell Goblet Squat',
    category: 'weight_gain',
    illustration: '🦵',
    targetedMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    sets: 4,
    reps: '10 - 15 reps',
    restTimeSec: 75,
    caloriesBurned: 180,
    difficulty: 'Beginner'
  },
  {
    id: 'ex-3',
    title: 'HIIT Kettlebell Swing & Burpees Combo',
    category: 'fat_loss',
    illustration: '🔥',
    targetedMuscles: ['Full Body', 'Cardiovascular System', 'Posterior Chain'],
    sets: 5,
    reps: '45 sec ON / 15 sec OFF',
    restTimeSec: 60,
    caloriesBurned: 260,
    difficulty: 'Pro'
  },
  {
    id: 'ex-4',
    title: 'Bodyweight Push-Up & Mountain Climbers',
    category: 'home',
    illustration: '🏠',
    targetedMuscles: ['Chest', 'Shoulders', 'Abs', 'Triceps'],
    sets: 3,
    reps: '15 Push-ups + 30 Climbers',
    restTimeSec: 45,
    caloriesBurned: 110,
    difficulty: 'Beginner'
  },
  {
    id: 'ex-5',
    title: 'Deadlift (Conventional Strength)',
    category: 'gym',
    illustration: '⚡',
    targetedMuscles: ['Erector Spinae', 'Latissimus Dorsi', 'Hamstrings', 'Glutes'],
    sets: 4,
    reps: '5 reps (Heavy)',
    restTimeSec: 120,
    caloriesBurned: 210,
    difficulty: 'Pro'
  }
];

export const mockYogaPoses: YogaPose[] = [
  {
    id: 'yoga-1',
    title: 'Surya Namaskar (Sun Salutation Flow)',
    sanskritName: 'Surya Namaskar',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop',
    benefits: ['Improves full body flexibility', 'Boosts blood circulation', 'Stimulates digestion', 'Energizes body for morning'],
    breathingGuide: 'Synchronize movement with inhalation on extension, exhalation on fold.',
    durationMinutes: 15,
    difficulty: 'Moderate',
    bodyPartTargeted: 'Full Body Spine & Hamstrings',
    routineType: 'morning'
  },
  {
    id: 'yoga-2',
    title: 'Vrikshasana (Tree Pose Balance)',
    sanskritName: 'Vrikshasana',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    benefits: ['Enhances neuromuscular balance', 'Strengthens ankles & thighs', 'Opens hip flexors', 'Sharpens mental focus'],
    breathingGuide: 'Inhale deep through nose, fix gaze on stationary spot in front.',
    durationMinutes: 10,
    difficulty: 'Easy',
    bodyPartTargeted: 'Ankles, Thighs & Core',
    routineType: 'morning'
  },
  {
    id: 'yoga-3',
    title: 'Bhujangasana (Cobra Pose Spine Extension)',
    sanskritName: 'Bhujangasana',
    image: 'https://images.unsplash.com/photo-1510894347048-471d14f8c8f4?q=80&w=800&auto=format&fit=crop',
    benefits: ['Relieves lower back pain', 'Expands chest and lung capacity', 'Tones abdominal organs', 'Reduces stress'],
    breathingGuide: 'Inhale while gently lifting chest keeping pelvis grounded, exhale while lowering down.',
    durationMinutes: 8,
    difficulty: 'Easy',
    bodyPartTargeted: 'Spine, Lower Back & Chest',
    routineType: 'evening'
  },
  {
    id: 'yoga-4',
    title: 'Mindful Anapana Meditation & Breathing',
    sanskritName: 'Pranayama',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    benefits: ['Lowers cortisol stress hormone', 'Improves sleep latency', 'Reduces resting heart rate', 'Enhances mental clarity'],
    breathingGuide: '4 seconds inhalation, 4 seconds hold, 6 seconds slow exhalation.',
    durationMinutes: 20,
    difficulty: 'Easy',
    bodyPartTargeted: 'Nervous System & Mind',
    routineType: 'meditation'
  }
];

export const mockFastingPlans: FastingPlan[] = [
  {
    id: 'fast-16-8',
    name: '16:8 LeanGains Protocol',
    fastingHours: 16,
    eatingHours: 8,
    description: 'The gold standard for fat loss and muscle retention. Fast for 16 hours overnight, eat within an 8-hour window (e.g., 12 PM - 8 PM).',
    suitableForGoal: 'lose',
    safetyTips: ['Stay hydrated with black coffee, green tea, or electrolyte water during fast.', 'Do not overeat during eating window.']
  },
  {
    id: 'fast-14-10',
    name: '14:10 Beginner Gentle Fast',
    fastingHours: 14,
    eatingHours: 10,
    description: 'Ideal starting protocol for beginners. Great for blood sugar stabilization and circadian rhythm alignment.',
    suitableForGoal: 'maintain',
    safetyTips: ['Finish dinner by 8 PM and eat breakfast at 10 AM.', 'Ensure adequate protein intake.']
  },
  {
    id: 'fast-18-6',
    name: '18:6 Deep Autophagy Fast',
    fastingHours: 18,
    eatingHours: 6,
    description: 'Accelerated fat oxidation and enhanced cellular repair (autophagy). Best for experienced fasters.',
    suitableForGoal: 'lose',
    safetyTips: ['Replenish sodium and magnesium during fast.', 'Break fast with light protein & healthy fats before heavy carb meals.']
  },
  {
    id: 'fast-omad',
    name: 'OMAD (One Meal A Day 23:1)',
    fastingHours: 23,
    eatingHours: 1,
    description: '23 hours fasting with 1 nutrient-dense meal per day. Maximum caloric restriction and deep ketosis.',
    suitableForGoal: 'lose',
    safetyTips: ['Consult physician if you take medications.', 'Meal must meet full micro and macro requirements.']
  }
];

export const mockAchievements: AchievementBadge[] = [
  {
    id: 'ach-1',
    title: '7 Day Streak Champion',
    description: 'Log your nutrition and water daily for 7 consecutive days.',
    icon: '🔥',
    unlocked: true,
    unlockedAt: 'Yesterday'
  },
  {
    id: 'ach-2',
    title: 'Hydration Master',
    description: 'Reach 3.5 Liters of pure water intake in a single day.',
    icon: '💧',
    unlocked: true,
    unlockedAt: '2 days ago'
  },
  {
    id: 'ach-3',
    title: 'Protein Mastermind',
    description: 'Hit 100% of your daily protein macronutrient target.',
    icon: '🍗',
    unlocked: true,
    unlockedAt: '3 days ago'
  },
  {
    id: 'ach-4',
    title: '30 Day Elite Fitness',
    description: 'Complete 30 consecutive days in the InfinityFitAI ecosystem.',
    icon: '🏆',
    unlocked: false
  }
];
