export type Gender = 'male' | 'female' | 'other';
export type Goal = 'gain' | 'lose' | 'maintain';
export type BodyType = 'skinny' | 'average' | 'fat';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'athlete';
export type DietPreference = 'veg' | 'non-veg' | 'vegan';
export type WorkoutExperience = 'beginner' | 'intermediate' | 'advanced';
export type HealthCondition = 'diabetes' | 'blood_pressure' | 'pcos' | 'thyroid' | 'none';
export type FoodAllergy = 'nuts' | 'dairy' | 'gluten' | 'soy' | 'seafood' | 'none';
export type Language = 'en' | 'hi' | 'es' | 'fr' | 'de';
export type UnitSystem = 'metric' | 'imperial';

export interface UserProfile {
  name: string;
  gender: Gender;
  age: number;
  heightCm: number; // Stored in metric internally
  weightKg: number;
  targetWeightKg: number;
  goal: Goal;
  bodyType: BodyType;
  activityLevel: ActivityLevel;
  dietPreference: DietPreference;
  workoutExperience: WorkoutExperience;
  healthConditions: HealthCondition[];
  allergies: FoodAllergy[];
  workoutDaysPerWeek: number;
  sleepHours: number;
  waterIntakeLiters: number;
  isOnboarded: boolean;
}

export interface HealthCalculations {
  bmi: number;
  bmiCategory: string;
  bmiColor: string;
  healthyWeightMin: number;
  healthyWeightMax: number;
  bmr: number;
  tdee: number;
  dailyCalories: number;
  maintenanceCalories: number;
  caloriesToGain: number;
  caloriesToLose: number;
  idealWaterLiters: number;
  // Macros (grams)
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  fiberGrams: number;
  sugarLimitGrams: number;
  sodiumLimitMg: number;
  // Micronutrients
  calciumMg: number;
  ironMg: number;
  vitAMcg: number;
  vitCMg: number;
  vitDIu: number;
  vitB12Mcg: number;
  magnesiumMg: number;
  potassiumMg: number;
  omega3Grams: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'pre_workout' | 'post_workout';
  dietType: DietPreference;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  calcium: number;
  iron: number;
  vitC: number;
  vitD: number;
  servingSize: string;
  cookingTime: string;
  difficulty: 'Easy' | 'Medium' | 'Chef';
  priceEstimate: number; // in local currency / USD equivalent
  healthyRating: number; // out of 10
  ingredients: string[];
  cookingSteps: string[];
  storeLinks: {
    amazon?: string;
    blinkit?: string;
    bigbasket?: string;
    instamart?: string;
    zepto?: string;
  };
  alternatives?: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    priceEstimate: number;
    reason: string;
  }[];
}

export interface ExerciseItem {
  id: string;
  title: string;
  category: 'weight_loss' | 'weight_gain' | 'muscle_building' | 'fat_loss' | 'home' | 'gym';
  illustration: string;
  targetedMuscles: string[];
  sets: number;
  reps: string;
  restTimeSec: number;
  caloriesBurned: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Pro';
}

export interface YogaPose {
  id: string;
  title: string;
  sanskritName: string;
  image: string;
  benefits: string[];
  breathingGuide: string;
  durationMinutes: number;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  bodyPartTargeted: string;
  routineType: 'morning' | 'evening' | 'meditation';
}

export interface FastingPlan {
  id: string;
  name: string;
  fastingHours: number;
  eatingHours: number;
  description: string;
  suitableForGoal: Goal;
  safetyTips: string[];
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  weightKg: number;
  caloriesConsumed: number;
  proteinGrams: number;
  waterLiters: number;
  sleepHours: number;
  workoutCompleted: boolean;
  mood: 'Awesome' | 'Good' | 'Neutral' | 'Tired';
  measurements?: {
    chestCm?: number;
    waistCm?: number;
    hipsCm?: number;
    bicepsCm?: number;
  };
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
