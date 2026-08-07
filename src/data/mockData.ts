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
  },
  {
    id: 'food-6',
    name: 'Palak Paneer & Multigrain Roti Thali',
    category: 'dinner',
    dietType: 'veg',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    calories: 510,
    protein: 36,
    carbs: 38,
    fat: 22,
    fiber: 9,
    sugar: 4,
    sodium: 440,
    calcium: 520,
    iron: 7.5,
    vitC: 40,
    vitD: 110,
    servingSize: '1 Thali (2 Rotis + 250g Palak Paneer)',
    cookingTime: '25 mins',
    difficulty: 'Medium',
    priceEstimate: 3.90,
    healthyRating: 9.7,
    ingredients: ['200g Fresh Low-Fat Paneer', '2 cups Fresh Spinach Puree', '2 Multigrain Rotis', '1 tbsp Ghee', 'Garlic, Cumin, Garam Masala'],
    cookingSteps: [
      'Blanch spinach leaves in boiling water for 2 mins, then blend into a smooth green puree.',
      'Sauté garlic, ginger, and cumin seeds in ghee until aromatic.',
      'Add spinach puree, garam masala, and sea salt; simmer on low heat for 5 mins.',
      'Gently fold in cubed fresh paneer and cook for another 3 mins.',
      'Serve warm with freshly cooked multigrain rotis.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=fresh+paneer',
      blinkit: 'https://blinkit.com/s/?q=paneer',
      bigbasket: 'https://www.bigbasket.com/ps/?q=paneer',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=paneer',
      zepto: 'https://www.zeptonow.com/search?q=paneer'
    },
    alternatives: [
      { name: 'Tofu Palak Gravy', calories: 430, protein: 32, carbs: 36, fat: 14, priceEstimate: 3.20, reason: 'Lower fat vegan cottage cheese substitute' },
      { name: 'Soy Chunks Curry', calories: 470, protein: 44, carbs: 32, fat: 8, priceEstimate: 2.30, reason: 'Lean plant protein powerhouse' }
    ]
  },
  {
    id: 'food-7',
    name: 'Spicy Soya Chunks Sukka & Brown Rice',
    category: 'lunch',
    dietType: 'vegan',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop',
    calories: 480,
    protein: 46,
    carbs: 52,
    fat: 8,
    fiber: 12,
    sugar: 3,
    sodium: 390,
    calcium: 280,
    iron: 9.1,
    vitC: 22,
    vitD: 0,
    servingSize: '1 Large Bowl (380g)',
    cookingTime: '20 mins',
    difficulty: 'Easy',
    priceEstimate: 2.60,
    healthyRating: 9.8,
    ingredients: ['100g Dehydrated Soya Chunks', '1 cup Cooked Brown Rice', '1 Medium Onion & Tomato', '1 tbsp Mustard Oil', 'Roasted Pepper & Curry Leaves'],
    cookingSteps: [
      'Boil soya chunks in salted water for 7 minutes, drain, and squeeze out excess water.',
      'Heat oil in a pan, add mustard seeds, curry leaves, chopped onions, and tomatoes.',
      'Add soya chunks with black pepper, coriander powder, and turmeric.',
      'Sauté until soya chunks turn crispy and well coated with spices.',
      'Serve alongside steamed fiber-rich brown rice.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=soya+chunks',
      blinkit: 'https://blinkit.com/s/?q=soya+chunks',
      bigbasket: 'https://www.bigbasket.com/ps/?q=soya+chunks',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=soya',
      zepto: 'https://www.zeptonow.com/search?q=soya'
    },
    alternatives: [
      { name: 'Grilled Tofu Steak', calories: 450, protein: 32, carbs: 40, fat: 15, priceEstimate: 4.10, reason: 'Soy isolate alternative with firm texture' }
    ]
  },
  {
    id: 'food-8',
    name: 'High-Protein Tadka Moong Dal & Quinoa Bowl',
    category: 'lunch',
    dietType: 'veg',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop',
    calories: 430,
    protein: 28,
    carbs: 62,
    fat: 9,
    fiber: 14,
    sugar: 4,
    sodium: 410,
    calcium: 180,
    iron: 6.8,
    vitC: 30,
    vitD: 60,
    servingSize: '1 Bowl (400g)',
    cookingTime: '25 mins',
    difficulty: 'Easy',
    priceEstimate: 2.80,
    healthyRating: 9.9,
    ingredients: ['1 cup Yellow Moong Dal (Split Mung)', '1/2 cup Cooked Quinoa', '1 tsp Desi Ghee', 'Cumin, Asafoetida, Turmeric', 'Fresh Coriander & Lemon'],
    cookingSteps: [
      'Pressure cook yellow moong dal with turmeric, pinch of salt, and water for 3 whistles.',
      'Prepare tadka by tempering cumin seeds and asafoetida in ghee.',
      'Pour golden tadka over cooked dal and squeeze fresh lemon juice.',
      'Serve over fluffy protein quinoa and garnish with coriander.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=moong+dal',
      blinkit: 'https://blinkit.com/s/?q=moong+dal',
      bigbasket: 'https://www.bigbasket.com/ps/?q=moong+dal',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=dal',
      zepto: 'https://www.zeptonow.com/search?q=dal'
    },
    alternatives: [
      { name: 'Toor Dal Tadka', calories: 410, protein: 25, carbs: 60, fat: 8, priceEstimate: 2.50, reason: 'Classic pigeon pea lentil comfort food' }
    ]
  },
  {
    id: 'food-9',
    name: 'Desi Masala Egg Bhurji & Multigrain Toast',
    category: 'breakfast',
    dietType: 'non-veg',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop',
    calories: 410,
    protein: 30,
    carbs: 28,
    fat: 20,
    fiber: 4,
    sugar: 3,
    sodium: 460,
    calcium: 160,
    iron: 4.8,
    vitC: 18,
    vitD: 240,
    servingSize: '1 Plate (4 Eggs + 2 Toast)',
    cookingTime: '10 mins',
    difficulty: 'Easy',
    priceEstimate: 2.90,
    healthyRating: 9.5,
    ingredients: ['2 Whole Eggs + 2 Egg Whites', '2 Slices Multigrain Bread', '1 Small Chopped Onion & Tomato', '1 Green Chili', '1 tsp Olive Oil'],
    cookingSteps: [
      'Beat 2 whole eggs and 2 egg whites in a bowl with turmeric, salt, and pepper.',
      'Sauté onions, tomatoes, and green chilies in olive oil until soft.',
      'Pour egg mixture into pan and scramble continuously over medium heat for 3 mins.',
      'Toast multigrain bread slices until crisp.',
      'Serve warm masala bhurji with toasted bread.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=fresh+eggs',
      blinkit: 'https://blinkit.com/s/?q=eggs',
      bigbasket: 'https://www.bigbasket.com/ps/?q=eggs',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=eggs',
      zepto: 'https://www.zeptonow.com/search?q=eggs'
    },
    alternatives: [
      { name: 'Paneer Bhurji', calories: 460, protein: 28, carbs: 22, fat: 24, priceEstimate: 3.40, reason: 'Vegetarian cottage cheese scramble alternative' }
    ]
  },
  {
    id: 'food-10',
    name: 'Indian Masala Fish Tikka Curry & Brown Rice',
    category: 'dinner',
    dietType: 'non-veg',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop',
    calories: 490,
    protein: 44,
    carbs: 42,
    fat: 14,
    fiber: 6,
    sugar: 3,
    sodium: 410,
    calcium: 140,
    iron: 3.9,
    vitC: 15,
    vitD: 350,
    servingSize: '1 Plate (250g Fish + 150g Rice)',
    cookingTime: '25 mins',
    difficulty: 'Medium',
    priceEstimate: 6.20,
    healthyRating: 9.8,
    ingredients: ['250g Fresh Kingfish/Rohu Fillet', '1 cup Brown Rice', '1 tbsp Mustard Oil', 'Ajwain, Ginger-Garlic Paste, Turmeric', 'Tomato Puree'],
    cookingSteps: [
      'Marinate fish fillet with lemon juice, ajwain, turmeric, and ginger-garlic paste for 15 mins.',
      'Pan-sear fish fillets in mustard oil for 3 mins each side.',
      'Prepare light tomato onion curry and simmer fish fillets in gravy for 5 mins.',
      'Serve warm alongside fiber-dense brown rice.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=fresh+fish+fillet',
      blinkit: 'https://blinkit.com/s/?q=fish',
      bigbasket: 'https://www.bigbasket.com/ps/?q=fish',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=fish',
      zepto: 'https://www.zeptonow.com/search?q=fish'
    },
    alternatives: [
      { name: 'Pan-Seared Salmon', calories: 540, protein: 42, carbs: 18, fat: 28, priceEstimate: 9.20, reason: 'High Omega-3 Western seafood option' }
    ]
  },
  {
    id: 'food-11',
    name: 'Pan-Seared Lemon Herb Salmon & Roasted Veggies',
    category: 'dinner',
    dietType: 'non-veg',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop',
    calories: 540,
    protein: 42,
    carbs: 18,
    fat: 28,
    fiber: 5,
    sugar: 2,
    sodium: 360,
    calcium: 110,
    iron: 3.2,
    vitC: 28,
    vitD: 520,
    servingSize: '1 Plate (220g Salmon + Veggies)',
    cookingTime: '20 mins',
    difficulty: 'Chef',
    priceEstimate: 8.90,
    healthyRating: 9.9,
    ingredients: ['220g Wild-Caught Salmon Fillet', '1 cup Asparagus & Zucchini', '1 tbsp Extra Virgin Olive Oil', 'Lemon Juice, Dill, Sea Salt'],
    cookingSteps: [
      'Season salmon fillet skin-side down with sea salt, crushed black pepper, and fresh dill.',
      'Heat olive oil in a skillet over high heat; sear salmon skin-side down for 4 mins until crispy.',
      'Flip salmon and sear for an additional 3 mins.',
      'Sauté asparagus and zucchini in remaining pan juices with a squeeze of fresh lemon.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=wild+salmon',
      blinkit: 'https://blinkit.com/s/?q=salmon',
      bigbasket: 'https://www.bigbasket.com/ps/?q=salmon',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=salmon',
      zepto: 'https://www.zeptonow.com/search?q=salmon'
    },
    alternatives: [
      { name: 'Grilled Sea Bass', calories: 460, protein: 40, carbs: 12, fat: 18, priceEstimate: 8.50, reason: 'Lean white fish alternative' }
    ]
  },
  {
    id: 'food-12',
    name: 'Indian High-Protein Kadai Chicken & Rice',
    category: 'lunch',
    dietType: 'non-veg',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop',
    calories: 570,
    protein: 52,
    carbs: 32,
    fat: 18,
    fiber: 6,
    sugar: 4,
    sodium: 430,
    calcium: 130,
    iron: 4.6,
    vitC: 35,
    vitD: 90,
    servingSize: '1 Portion (250g Chicken + Rice)',
    cookingTime: '30 mins',
    difficulty: 'Medium',
    priceEstimate: 6.50,
    healthyRating: 9.6,
    ingredients: ['250g Boneless Chicken Breast', '1 Bell Pepper (Capsicum)', '1 cup Cooked Brown Rice', '1 tbsp Olive Oil', 'Kadai Masala & Coriander'],
    cookingSteps: [
      'Cut chicken breast into 1-inch cubes and toss with kadai spices.',
      'Sauté diced capsicum and onion in olive oil until charred.',
      'Add chicken breast cubes and cook covered for 12 mins.',
      'Finish with freshly ground coriander seeds and serve with brown rice.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=boneless+chicken',
      blinkit: 'https://blinkit.com/s/?q=chicken',
      bigbasket: 'https://www.bigbasket.com/ps/?q=chicken',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=chicken',
      zepto: 'https://www.zeptonow.com/search?q=chicken'
    },
    alternatives: [
      { name: 'Chicken Breast Salad', calories: 480, protein: 48, carbs: 15, fat: 12, priceEstimate: 5.80, reason: 'Ultra low carb poultry option' }
    ]
  },
  {
    id: 'food-13',
    name: 'High-Protein Greek Yogurt Lassi & Makhana',
    category: 'snacks',
    dietType: 'veg',
    image: '/greek_yogurt_lassi_makhana.png',
    calories: 270,
    protein: 26,
    carbs: 32,
    fat: 5,
    fiber: 4,
    sugar: 10,
    sodium: 95,
    calcium: 480,
    iron: 2.4,
    vitC: 8,
    vitD: 140,
    servingSize: '1 Glass Lassi (350ml) + 30g Makhana',
    cookingTime: '5 mins',
    difficulty: 'Easy',
    priceEstimate: 2.70,
    healthyRating: 9.8,
    ingredients: ['250g Plain Unsugared Greek Yogurt', '100ml Cold Water', '30g Dry-Roasted Foxnuts (Makhana)', 'Cardamom Powder & Stevia'],
    cookingSteps: [
      'Blend Greek yogurt, cold water, crushed cardamom, and sweetener in a jar until frothy.',
      'Dry-roast makhana in a skillet with a pinch of rock salt and black pepper.',
      'Serve chilled lassi alongside crunchy roasted makhana as a high-protein afternoon snack.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=makhana+greek+yogurt',
      blinkit: 'https://blinkit.com/s/?q=greek+yogurt',
      bigbasket: 'https://www.bigbasket.com/ps/?q=makhana',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=yogurt',
      zepto: 'https://www.zeptonow.com/search?q=makhana'
    },
    alternatives: [
      { name: 'Protein Buttermilk (Chaas)', calories: 140, protein: 16, carbs: 12, fat: 3, priceEstimate: 1.50, reason: 'Light probiotic digestive drink' }
    ]
  },
  {
    id: 'food-14',
    name: 'Punjabi High-Protein Chana Masala & Spinach',
    category: 'dinner',
    dietType: 'veg',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&auto=format&fit=crop',
    calories: 460,
    protein: 29,
    carbs: 65,
    fat: 10,
    fiber: 16,
    sugar: 5,
    sodium: 420,
    calcium: 210,
    iron: 7.2,
    vitC: 28,
    vitD: 0,
    servingSize: '1 Large Bowl (380g)',
    cookingTime: '25 mins',
    difficulty: 'Medium',
    priceEstimate: 3.10,
    healthyRating: 9.7,
    ingredients: ['1.5 cups Boiled White Chickpeas', '1 cup Chopped Spinach', 'Tomato-Onion Puree', '1 tsp Ghee', 'Chana Masala Spices'],
    cookingSteps: [
      'Sauté onions, ginger, and garlic in ghee until golden.',
      'Add tomato puree and chana masala spice blend; cook until oil separates.',
      'Add boiled chickpeas and chopped spinach with 1 cup of water.',
      'Simmer on medium heat for 12 mins until gravy thickens.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=white+chana',
      blinkit: 'https://blinkit.com/s/?q=chana',
      bigbasket: 'https://www.bigbasket.com/ps/?q=chana',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=chana',
      zepto: 'https://www.zeptonow.com/search?q=chana'
    },
    alternatives: [
      { name: 'Rajma Masala (Kidney Beans)', calories: 450, protein: 27, carbs: 64, fat: 9, priceEstimate: 2.90, reason: 'High fiber Indian legume curry' }
    ]
  },
  {
    id: 'food-15',
    name: 'Cottage Cheese & Berry High-Protein Pancakes',
    category: 'breakfast',
    dietType: 'veg',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800&auto=format&fit=crop',
    calories: 420,
    protein: 34,
    carbs: 48,
    fat: 10,
    fiber: 7,
    sugar: 12,
    sodium: 280,
    calcium: 380,
    iron: 3.5,
    vitC: 24,
    vitD: 100,
    servingSize: '3 Stacked Pancakes (300g)',
    cookingTime: '15 mins',
    difficulty: 'Easy',
    priceEstimate: 3.80,
    healthyRating: 9.6,
    ingredients: ['150g Low-Fat Cottage Cheese / Paneer', '1 cup Oat Flour', '1 Scoop Vanilla Protein Powder', '1 Egg White', 'Fresh Strawberries'],
    cookingSteps: [
      'Blend cottage cheese, oat flour, vanilla protein powder, and egg white until a smooth batter forms.',
      'Ladle batter onto a hot non-stick griddle over medium heat.',
      'Cook for 2-3 mins per side until bubbles form and edges are golden brown.',
      'Serve stacked with fresh strawberries and sugar-free syrup.'
    ],
    storeLinks: {
      amazon: 'https://www.amazon.com/s?k=oat+flour+protein',
      blinkit: 'https://blinkit.com/s/?q=cottage+cheese',
      bigbasket: 'https://www.bigbasket.com/ps/?q=cottage+cheese',
      instamart: 'https://www.swiggy.com/instamart/search?custom_back=true&query=cottage+cheese',
      zepto: 'https://www.zeptonow.com/search?q=cottage+cheese'
    },
    alternatives: [
      { name: 'Oatmeal Protein Porridge', calories: 380, protein: 30, carbs: 50, fat: 7, priceEstimate: 2.80, reason: 'Quick high-protein breakfast cereal' }
    ]
  }
];

export const mockExerciseItems: ExerciseItem[] = [
  // ==========================================
  // HOME WORKOUTS (12 Routines)
  // ==========================================
  {
    id: 'home-gain-1',
    title: 'Diamond & Incline Push-Ups',
    category: 'weight_gain',
    location: 'home',
    goalType: 'weight_gain',
    illustration: '💪',
    targetedMuscles: ['Triceps', 'Inner Chest', 'Anterior Deltoids'],
    sets: 4,
    reps: '12 - 15 reps',
    restTimeSec: 60,
    caloriesBurned: 120,
    difficulty: 'Intermediate'
  },
  {
    id: 'home-gain-2',
    title: 'Bodyweight Deep Squats & Tempo Holds',
    category: 'weight_gain',
    location: 'home',
    goalType: 'weight_gain',
    illustration: '🦵',
    targetedMuscles: ['Quadriceps', 'Glutes', 'Calves'],
    sets: 4,
    reps: '15 - 20 reps',
    restTimeSec: 60,
    caloriesBurned: 140,
    difficulty: 'Beginner'
  },
  {
    id: 'home-gain-3',
    title: 'Chair Dips & Feet-Elevated Push-Ups',
    category: 'weight_gain',
    location: 'home',
    goalType: 'weight_gain',
    illustration: '🪑',
    targetedMuscles: ['Triceps', 'Upper Chest', 'Core'],
    sets: 4,
    reps: '12 reps',
    restTimeSec: 60,
    caloriesBurned: 130,
    difficulty: 'Intermediate'
  },
  {
    id: 'home-gain-4',
    title: 'Bulgarian Split Squats (Using Chair)',
    category: 'weight_gain',
    location: 'home',
    goalType: 'weight_gain',
    illustration: '🦵',
    targetedMuscles: ['Quads', 'Glutes', 'Hamstrings'],
    sets: 4,
    reps: '10 reps / leg',
    restTimeSec: 75,
    caloriesBurned: 150,
    difficulty: 'Intermediate'
  },
  {
    id: 'home-gain-5',
    title: 'Pike Push-Ups for Shoulder Hypertrophy',
    category: 'weight_gain',
    location: 'home',
    goalType: 'weight_gain',
    illustration: '🏔️',
    targetedMuscles: ['Deltoids', 'Upper Traps', 'Triceps'],
    sets: 4,
    reps: '10 - 12 reps',
    restTimeSec: 75,
    caloriesBurned: 125,
    difficulty: 'Pro'
  },
  {
    id: 'home-gain-6',
    title: 'Doorframe Bodyweight Rows & Isometrics',
    category: 'weight_gain',
    location: 'home',
    goalType: 'weight_gain',
    illustration: '🚪',
    targetedMuscles: ['Rhomboids', 'Rear Delts', 'Biceps'],
    sets: 4,
    reps: '12 reps',
    restTimeSec: 60,
    caloriesBurned: 110,
    difficulty: 'Beginner'
  },
  {
    id: 'home-loss-1',
    title: 'Jumping Jacks & Burpee Blast',
    category: 'weight_loss',
    location: 'home',
    goalType: 'weight_loss',
    illustration: '🤸‍♂️',
    targetedMuscles: ['Full Body', 'Cardio', 'Calves'],
    sets: 4,
    reps: '45 sec ON / 15 sec OFF',
    restTimeSec: 45,
    caloriesBurned: 220,
    difficulty: 'Intermediate'
  },
  {
    id: 'home-loss-2',
    title: 'High Knees & Mountain Climbers Circuit',
    category: 'weight_loss',
    location: 'home',
    goalType: 'weight_loss',
    illustration: '🏃‍♂️',
    targetedMuscles: ['Abs', 'Hip Flexors', 'Cardio System'],
    sets: 4,
    reps: '40 sec ON / 20 sec OFF',
    restTimeSec: 45,
    caloriesBurned: 240,
    difficulty: 'Beginner'
  },
  {
    id: 'home-loss-3',
    title: 'Shadow Boxing & Plank Jacks Combo',
    category: 'weight_loss',
    location: 'home',
    goalType: 'weight_loss',
    illustration: '🥊',
    targetedMuscles: ['Shoulders', 'Core', 'Stamina'],
    sets: 4,
    reps: '50 sec ON / 10 sec OFF',
    restTimeSec: 45,
    caloriesBurned: 210,
    difficulty: 'Intermediate'
  },
  {
    id: 'home-loss-4',
    title: 'Bear Crawls & Skater Jumps',
    category: 'weight_loss',
    location: 'home',
    goalType: 'weight_loss',
    illustration: '🐻',
    targetedMuscles: ['Full Body Agility', 'Glutes', 'Core'],
    sets: 4,
    reps: '12 reps per direction',
    restTimeSec: 60,
    caloriesBurned: 230,
    difficulty: 'Pro'
  },
  {
    id: 'home-loss-5',
    title: 'Bicycle Crunches & V-Ups Core Burner',
    category: 'weight_loss',
    location: 'home',
    goalType: 'weight_loss',
    illustration: '🧘‍♂️',
    targetedMuscles: ['Rectus Abdominis', 'Obliques'],
    sets: 4,
    reps: '20 reps total',
    restTimeSec: 45,
    caloriesBurned: 130,
    difficulty: 'Beginner'
  },
  {
    id: 'home-loss-6',
    title: 'Shadow Jump Rope & Flutter Kicks',
    category: 'weight_loss',
    location: 'home',
    goalType: 'weight_loss',
    illustration: '🪢',
    targetedMuscles: ['Lower Abs', 'Calves', 'Endurance'],
    sets: 4,
    reps: '60 sec nonstop',
    restTimeSec: 30,
    caloriesBurned: 250,
    difficulty: 'Intermediate'
  },

  // ==========================================
  // GYM WORKOUTS (12 Routines)
  // ==========================================
  {
    id: 'gym-gain-1',
    title: 'Heavy Barbell Flat Bench Press',
    category: 'weight_gain',
    location: 'gym',
    goalType: 'weight_gain',
    illustration: '🏋️‍♂️',
    targetedMuscles: ['Pectoralis Major', 'Triceps', 'Front Delts'],
    sets: 4,
    reps: '8 - 10 reps',
    restTimeSec: 90,
    caloriesBurned: 160,
    difficulty: 'Intermediate'
  },
  {
    id: 'gym-gain-2',
    title: 'Barbell Back Squat (Hypertrophy Range)',
    category: 'weight_gain',
    location: 'gym',
    goalType: 'weight_gain',
    illustration: '🦵',
    targetedMuscles: ['Quadriceps', 'Glutes', 'Erector Spinae'],
    sets: 4,
    reps: '8 - 12 reps',
    restTimeSec: 90,
    caloriesBurned: 210,
    difficulty: 'Intermediate'
  },
  {
    id: 'gym-gain-3',
    title: 'Conventional Barbell Deadlift',
    category: 'weight_gain',
    location: 'gym',
    goalType: 'weight_gain',
    illustration: '⚡',
    targetedMuscles: ['Posterior Chain', 'Hamstrings', 'Lats'],
    sets: 4,
    reps: '5 - 8 reps',
    restTimeSec: 120,
    caloriesBurned: 240,
    difficulty: 'Pro'
  },
  {
    id: 'gym-gain-4',
    title: 'Seated Overhead Dumbbell Shoulder Press',
    category: 'weight_gain',
    location: 'gym',
    goalType: 'weight_gain',
    illustration: '🏋️',
    targetedMuscles: ['Anterior & Lateral Deltoids', 'Triceps'],
    sets: 4,
    reps: '10 - 12 reps',
    restTimeSec: 75,
    caloriesBurned: 140,
    difficulty: 'Intermediate'
  },
  {
    id: 'gym-gain-5',
    title: 'Wide Grip Lat Pulldown & Cable Rows',
    category: 'weight_gain',
    location: 'gym',
    goalType: 'weight_gain',
    illustration: '🚣‍♂️',
    targetedMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    sets: 4,
    reps: '10 - 12 reps',
    restTimeSec: 75,
    caloriesBurned: 155,
    difficulty: 'Beginner'
  },
  {
    id: 'gym-gain-6',
    title: 'Dumbbell Bicep Curls & Triceps Cable Pushdowns',
    category: 'weight_gain',
    location: 'gym',
    goalType: 'weight_gain',
    illustration: '💪',
    targetedMuscles: ['Biceps Brachii', 'Triceps Lateral Head'],
    sets: 4,
    reps: '12 - 15 reps',
    restTimeSec: 60,
    caloriesBurned: 135,
    difficulty: 'Beginner'
  },
  {
    id: 'gym-loss-1',
    title: 'Treadmill High Incline Power Walk & Sprint',
    category: 'weight_loss',
    location: 'gym',
    goalType: 'weight_loss',
    illustration: '🏃‍♀️',
    targetedMuscles: ['Hamstrings', 'Calves', 'Calorie Burn'],
    sets: 5,
    reps: '3 min Sprint / 2 min Walk',
    restTimeSec: 30,
    caloriesBurned: 320,
    difficulty: 'Intermediate'
  },
  {
    id: 'gym-loss-2',
    title: 'Assault Air Bike & Rowing Machine HIIT',
    category: 'weight_loss',
    location: 'gym',
    goalType: 'weight_loss',
    illustration: '🚴‍♂️',
    targetedMuscles: ['Full Body VO2 Max', 'Shoulders', 'Lats'],
    sets: 5,
    reps: '30 sec All Out Sprint',
    restTimeSec: 45,
    caloriesBurned: 340,
    difficulty: 'Pro'
  },
  {
    id: 'gym-loss-3',
    title: 'Kettlebell Clean & Press Conditioning',
    category: 'weight_loss',
    location: 'gym',
    goalType: 'weight_loss',
    illustration: '🏋️‍♀️',
    targetedMuscles: ['Full Body Explosiveness', 'Core'],
    sets: 4,
    reps: '12 reps',
    restTimeSec: 60,
    caloriesBurned: 270,
    difficulty: 'Intermediate'
  },
  {
    id: 'gym-loss-4',
    title: 'Heavy Battle Ropes & Plyo Box Jumps',
    category: 'weight_loss',
    location: 'gym',
    goalType: 'weight_loss',
    illustration: '💥',
    targetedMuscles: ['Shoulders', 'Fast-Twitch Leg Fibers'],
    sets: 4,
    reps: '45 sec Waves + 10 Box Jumps',
    restTimeSec: 60,
    caloriesBurned: 290,
    difficulty: 'Pro'
  },
  {
    id: 'gym-loss-5',
    title: 'Leg Press & Dumbbell Romanian Deadlifts',
    category: 'weight_loss',
    location: 'gym',
    goalType: 'weight_loss',
    illustration: '🦵',
    targetedMuscles: ['Hamstrings', 'Glutes', 'Quads'],
    sets: 4,
    reps: '12 - 15 reps',
    restTimeSec: 60,
    caloriesBurned: 190,
    difficulty: 'Intermediate'
  },
  {
    id: 'gym-loss-6',
    title: 'Elliptical Cross Trainer Fat-Burn Drive',
    category: 'weight_loss',
    location: 'gym',
    goalType: 'weight_loss',
    illustration: '🏃',
    targetedMuscles: ['Low-Impact Cardio', 'Glutes', 'Arms'],
    sets: 1,
    reps: '25 Minutes Continuous',
    restTimeSec: 0,
    caloriesBurned: 280,
    difficulty: 'Beginner'
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
