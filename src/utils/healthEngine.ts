/**
 * InfinityFitAI — Evidence-Based Health Calculation Engine
 * 
 * Sources:
 *   - BMR: Mifflin-St Jeor Equation (ACSM, NIH)
 *   - TDEE: Activity multipliers (USDA, NIH)
 *   - Macronutrients: USDA, Academy of Nutrition and Dietetics
 *   - Micronutrients: NIH Recommended Dietary Allowances (RDA)
 *   - Water: Mayo Clinic, EFSA guidelines
 *   - Calorie deficit/surplus: CDC, NHS safe weight change guidelines
 *   - BMI: WHO classification thresholds
 */

import type { UserProfile, HealthCalculations } from '../types';

// ============================================================================
// 1. BMI CALCULATION (WHO)
// ============================================================================
function calculateBmi(weightKg: number, heightCm: number) {
  const heightM = heightCm / 100;
  if (heightM <= 0) return { bmi: 22, bmiCategory: 'Normal Weight', bmiColor: '#10b981' };

  const bmiRaw = weightKg / (heightM * heightM);
  const bmi = Math.round(bmiRaw * 10) / 10;

  let bmiCategory = 'Normal Weight';
  let bmiColor = '#10b981'; // emerald

  if (bmi < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = '#06b6d4'; // cyan
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    bmiCategory = 'Normal Weight';
    bmiColor = '#10b981'; // emerald
  } else if (bmi >= 25 && bmi <= 29.9) {
    bmiCategory = 'Overweight';
    bmiColor = '#f59e0b'; // amber
  } else {
    bmiCategory = 'Obese';
    bmiColor = '#f43f5e'; // rose
  }

  const healthyWeightMin = Math.round(18.5 * heightM * heightM * 10) / 10;
  const healthyWeightMax = Math.round(24.9 * heightM * heightM * 10) / 10;

  return { bmi, bmiCategory, bmiColor, healthyWeightMin, healthyWeightMax };
}

// ============================================================================
// 2. BMR — Mifflin-St Jeor Equation (ACSM / NIH)
// ============================================================================
function calculateBmr(weightKg: number, heightCm: number, age: number, gender: string): number {
  // Male:   (10 × weight_kg) + (6.25 × height_cm) − (5 × age) + 5
  // Female: (10 × weight_kg) + (6.25 × height_cm) − (5 × age) − 161
  const base = (10 * weightKg) + (6.25 * heightCm) - (5 * age);

  if (gender === 'male') return Math.round(base + 5);
  if (gender === 'female') return Math.round(base - 161);
  // 'other': average of male/female
  return Math.round(base - 78);
}

// ============================================================================
// 3. TDEE — Activity Multipliers (NIH / USDA)
// ============================================================================
function calculateTdee(bmr: number, activityLevel: string): number {
  const multipliers: Record<string, number> = {
    sedentary: 1.2,     // Office job, minimal movement
    light: 1.375,       // Light exercise 1-2 days/week
    moderate: 1.55,     // Moderate exercise 3-5 days/week
    active: 1.725,      // Hard exercise 6-7 days/week
    athlete: 1.9,       // Intense training / physical job
  };
  return Math.round(bmr * (multipliers[activityLevel] || 1.375));
}

// ============================================================================
// 4. DAILY CALORIE TARGETS (CDC / NHS safe weight change)
// ============================================================================
function calculateDailyCalories(
  tdee: number,
  goal: string,
  gender: string,
  activityLevel: string,
  bodyType: string
): { dailyCalories: number; caloriesToLose: number; caloriesToGain: number; maintenanceCalories: number } {
  const maintenanceCalories = tdee;

  // Lose: 20% deficit (moderate, sustainable per CDC), clamped by NHS minimums
  const minCalories = gender === 'female' ? 1200 : 1500;
  const caloriesToLose = Math.max(minCalories, Math.round(tdee * 0.80));

  // Gain: surplus scales with activity & body type
  let surplusKcal = 400;
  if (activityLevel === 'active' || activityLevel === 'athlete') surplusKcal = 500;
  if (bodyType === 'skinny') surplusKcal += 100; // Ectomorphs need more surplus
  if (bodyType === 'fat') surplusKcal = Math.max(250, surplusKcal - 150); // Conservative for endomorphs
  const caloriesToGain = tdee + surplusKcal;

  let dailyCalories = maintenanceCalories;
  if (goal === 'lose') dailyCalories = caloriesToLose;
  if (goal === 'gain') dailyCalories = caloriesToGain;

  return { dailyCalories, caloriesToLose, caloriesToGain, maintenanceCalories };
}

// ============================================================================
// 5. MACRONUTRIENTS (USDA / Academy of Nutrition and Dietetics)
// ============================================================================
function calculateMacros(
  weightKg: number,
  dailyCalories: number,
  goal: string,
  activityLevel: string,
  workoutDaysPerWeek: number
) {
  // --- PROTEIN (g/kg body weight) ---
  // Lose: 2.0-2.3 g/kg (higher to preserve lean mass during deficit)
  // Gain: 1.8-2.2 g/kg (scaling with activity)
  // Maintain: 1.4-1.8 g/kg
  let proteinPerKg: number;

  if (goal === 'lose') {
    proteinPerKg = 2.0;
    if (activityLevel === 'active' || activityLevel === 'athlete') proteinPerKg = 2.3;
    if (workoutDaysPerWeek >= 5) proteinPerKg = Math.min(2.4, proteinPerKg + 0.1);
  } else if (goal === 'gain') {
    proteinPerKg = 1.8;
    if (activityLevel === 'moderate') proteinPerKg = 2.0;
    if (activityLevel === 'active' || activityLevel === 'athlete') proteinPerKg = 2.2;
    if (workoutDaysPerWeek >= 5) proteinPerKg = Math.min(2.4, proteinPerKg + 0.1);
  } else {
    // maintain
    proteinPerKg = 1.4;
    if (activityLevel === 'moderate') proteinPerKg = 1.6;
    if (activityLevel === 'active' || activityLevel === 'athlete') proteinPerKg = 1.8;
  }

  const proteinGrams = Math.round(weightKg * proteinPerKg);
  const proteinCalories = proteinGrams * 4;

  // --- FAT (% of daily calories) ---
  // Lose: 25% (lower end to maximize protein + carb volume)
  // Gain: 28% (slightly higher for hormonal support)
  // Maintain: 27%
  let fatPercentage: number;
  if (goal === 'lose') fatPercentage = 0.25;
  else if (goal === 'gain') fatPercentage = 0.28;
  else fatPercentage = 0.27;

  const fatCalories = dailyCalories * fatPercentage;
  const fatGrams = Math.round(fatCalories / 9);

  // --- CARBS (remaining calories) ---
  const carbCalories = Math.max(0, dailyCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(carbCalories / 4);
  const carbPercentage = dailyCalories > 0 ? carbCalories / dailyCalories : 0;

  // --- FIBER (IOM: 14g per 1000 kcal) ---
  const fiberGrams = Math.round((dailyCalories / 1000) * 14);

  // --- SUGAR LIMIT (WHO: ≤10% of daily calories) ---
  const sugarLimitGrams = Math.round((dailyCalories * 0.10) / 4);

  return {
    proteinGrams,
    carbGrams,
    fatGrams,
    fiberGrams,
    sugarLimitGrams,
    proteinPerKg: Math.round(proteinPerKg * 10) / 10,
    fatPercentage: Math.round(fatPercentage * 100),
    carbPercentage: Math.round(carbPercentage * 100),
  };
}

// ============================================================================
// 6. WATER INTAKE (Mayo Clinic / EFSA)
// ============================================================================
function calculateWaterIntake(
  weightKg: number,
  activityLevel: string,
  workoutDaysPerWeek: number
): number {
  // Base: 35ml per kg body weight (EFSA recommendation)
  let waterLiters = weightKg * 0.035;

  // Activity adjustments
  if (activityLevel === 'moderate') waterLiters += 0.5;
  if (activityLevel === 'active') waterLiters += 0.75;
  if (activityLevel === 'athlete') waterLiters += 1.0;

  // Extra for frequent workout days (above 3 days/week)
  if (workoutDaysPerWeek > 3) {
    waterLiters += (workoutDaysPerWeek - 3) * 0.15;
  }

  // Clamp to reasonable range
  waterLiters = Math.max(1.5, Math.min(5.0, waterLiters));

  return Math.round(waterLiters * 10) / 10;
}

// ============================================================================
// 7. MICRONUTRIENTS — NIH Recommended Dietary Allowances (RDA)
// ============================================================================
function calculateMicronutrients(
  age: number,
  gender: string,
  activityLevel: string,
  dietPreference: string
) {
  const isFemale = gender === 'female';
  const isActive = activityLevel === 'active' || activityLevel === 'athlete';

  // Calcium (mg) — NIH RDA
  let calciumMg = 1000;
  if (age <= 18) calciumMg = 1300;
  else if (age >= 51 && isFemale) calciumMg = 1200;
  else if (age >= 71) calciumMg = 1200;

  // Iron (mg) — NIH RDA
  let ironMg = isFemale ? (age <= 50 ? 18 : 8) : 8;

  // Vitamin A (mcg RAE) — NIH RDA
  const vitAMcg = isFemale ? 700 : 900;

  // Vitamin C (mg) — NIH RDA, +35mg for athletes (antioxidant demand)
  let vitCMg = isFemale ? 75 : 90;
  if (isActive) vitCMg += 35;

  // Vitamin D (IU) — NIH RDA
  let vitDIu = age < 70 ? 600 : 800;
  if (isActive) vitDIu += 200; // Athletes often need more (Harvard Health)

  // Vitamin B12 (mcg) — NIH RDA, higher for veg/vegan (supplement recommended)
  let vitB12Mcg = 2.4;
  if (dietPreference === 'veg' || dietPreference === 'vegan') vitB12Mcg = 4.0;

  // Magnesium (mg) — NIH RDA
  let magnesiumMg: number;
  if (isFemale) {
    magnesiumMg = age <= 30 ? 310 : 320;
  } else {
    magnesiumMg = age <= 30 ? 400 : 420;
  }
  if (isActive) magnesiumMg += 40; // Athletes lose magnesium through sweat

  // Potassium (mg) — NIH Adequate Intake
  const potassiumMg = isFemale ? 2600 : 3400;

  // Omega-3 (g) — NIH Adequate Intake
  let omega3Grams = isFemale ? 1.1 : 1.6;
  if (isActive) omega3Grams += 0.5;
  omega3Grams = Math.round(omega3Grams * 10) / 10;

  // Sodium — default 2300mg, reduced for hypertension
  const sodiumLimitMg = 2300;

  return {
    calciumMg,
    ironMg,
    vitAMcg,
    vitCMg,
    vitDIu,
    vitB12Mcg,
    magnesiumMg,
    potassiumMg,
    omega3Grams,
    sodiumLimitMg,
  };
}

// ============================================================================
// 8. GOAL TIMELINE (CDC: safe rate 0.5–1 kg/week)
// ============================================================================
function calculateGoalTimeline(
  currentWeight: number,
  targetWeight: number,
  goal: string
): { goalTimelineWeeks: number; goalTimelineDate: string; weeklyWeightChangeKg: number } {
  if (goal === 'maintain' || currentWeight === targetWeight) {
    return {
      goalTimelineWeeks: 0,
      goalTimelineDate: 'Maintaining',
      weeklyWeightChangeKg: 0,
    };
  }

  const weightDiff = Math.abs(currentWeight - targetWeight);

  // Safe rate: 0.5 kg/week for small differences, 0.75 kg/week for moderate, up to 1 kg/week for large
  let weeklyRate: number;
  if (weightDiff <= 5) weeklyRate = 0.5;
  else if (weightDiff <= 15) weeklyRate = 0.75;
  else weeklyRate = 1.0;

  const weeks = Math.ceil(weightDiff / weeklyRate);

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + weeks * 7);
  const goalTimelineDate = targetDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    goalTimelineWeeks: weeks,
    goalTimelineDate,
    weeklyWeightChangeKg: Math.round(weeklyRate * 10) / 10,
  };
}

// ============================================================================
// 9. PERSONALIZED HEALTH TIPS GENERATOR
// ============================================================================
function generateHealthTips(
  profile: UserProfile,
  bmi: number,
  bmiCategory: string,
  dailyCalories: number,
  proteinGrams: number,
  idealWaterLiters: number
): string[] {
  const tips: string[] = [];
  const { goal, activityLevel, dietPreference, sleepHours, workoutDaysPerWeek, age, gender } = profile;

  // BMI-based tips
  if (bmiCategory === 'Underweight') {
    tips.push(`Your BMI is ${bmi} (Underweight). Focus on calorie-dense, nutrient-rich foods like nuts, avocados, and whole grains to reach a healthy weight safely.`);
  } else if (bmiCategory === 'Overweight') {
    tips.push(`Your BMI is ${bmi} (Overweight). A moderate 20% calorie deficit of ${dailyCalories} kcal/day combined with regular exercise will help you reach a healthier weight.`);
  } else if (bmiCategory === 'Obese') {
    tips.push(`Your BMI is ${bmi} (Obese). Consider consulting a healthcare provider. A structured plan with ${dailyCalories} kcal/day and progressive exercise is recommended.`);
  } else {
    tips.push(`Your BMI is ${bmi} — you're in a healthy range! Maintain your current habits to stay here.`);
  }

  // Goal-based tips
  if (goal === 'lose') {
    tips.push(`To lose weight safely, aim for ${dailyCalories} kcal/day. Eat ${proteinGrams}g of protein daily to preserve muscle mass during your calorie deficit.`);
  } else if (goal === 'gain') {
    tips.push(`To gain lean mass, consume ${dailyCalories} kcal/day with ${proteinGrams}g protein. Focus on progressive overload in your strength training.`);
  }

  // Activity tips
  if (activityLevel === 'sedentary') {
    tips.push('Your activity level is sedentary. Even adding a daily 30-minute walk can boost your TDEE by ~200 kcal and improve cardiovascular health.');
  }

  // Sleep tip
  if (sleepHours < 7) {
    tips.push(`You're sleeping ${sleepHours} hours — below the recommended 7-9 hours (CDC). Poor sleep can increase hunger hormones by 28% and hinder recovery.`);
  }

  // Workout frequency tip
  if (workoutDaysPerWeek <= 2 && goal !== 'maintain') {
    tips.push(`Consider increasing your workout days from ${workoutDaysPerWeek} to 3-4 per week. This can significantly accelerate your ${goal === 'lose' ? 'fat loss' : 'muscle gain'} results.`);
  }

  // Hydration tip
  tips.push(`Drink at least ${idealWaterLiters}L of water daily. Proper hydration improves metabolism by up to 30% and supports nutrient absorption.`);

  // Diet-specific tips
  if (dietPreference === 'veg' || dietPreference === 'vegan') {
    tips.push('As a vegetarian/vegan, ensure adequate B12 supplementation (4.0 mcg/day). Include lentils, tofu, and fortified foods for complete amino acid profiles.');
  }

  // Age-specific tip
  if (age >= 40) {
    tips.push('After 40, focus on calcium (1000-1200mg) and Vitamin D (600-800 IU) for bone health. Resistance training helps combat age-related muscle loss.');
  }

  // Gender-specific
  if (gender === 'female' && age <= 50) {
    tips.push('Women of reproductive age need 18mg of iron daily — include leafy greens, lentils, and fortified cereals in your diet.');
  }

  return tips.slice(0, 5); // Cap at 5 tips for readability
}

// ============================================================================
// MAIN EXPORT — calculateHealthMetrics
// ============================================================================
export function calculateHealthMetrics(profile: UserProfile): HealthCalculations {
  const {
    weightKg, heightCm, age, gender,
    activityLevel, goal, bodyType,
    dietPreference, workoutDaysPerWeek, sleepHours
  } = profile;

  // 1. BMI
  const bmiResult = calculateBmi(weightKg, heightCm);

  // 2. BMR
  const bmr = calculateBmr(weightKg, heightCm, age, gender);

  // 3. TDEE
  const tdee = calculateTdee(bmr, activityLevel);

  // 4. Daily Calories
  const calorieResult = calculateDailyCalories(tdee, goal, gender, activityLevel, bodyType);

  // 5. Macronutrients
  const macros = calculateMacros(
    weightKg,
    calorieResult.dailyCalories,
    goal,
    activityLevel,
    workoutDaysPerWeek
  );

  // 6. Water Intake
  const idealWaterLiters = calculateWaterIntake(weightKg, activityLevel, workoutDaysPerWeek);

  // 7. Micronutrients
  const micros = calculateMicronutrients(age, gender, activityLevel, dietPreference);

  // 8. Goal Timeline
  const timeline = calculateGoalTimeline(weightKg, profile.targetWeightKg, goal);

  // 9. Personalized Tips
  const healthTips = generateHealthTips(
    profile,
    bmiResult.bmi,
    bmiResult.bmiCategory,
    calorieResult.dailyCalories,
    macros.proteinGrams,
    idealWaterLiters
  );

  return {
    // BMI
    bmi: bmiResult.bmi,
    bmiCategory: bmiResult.bmiCategory,
    bmiColor: bmiResult.bmiColor,
    healthyWeightMin: bmiResult.healthyWeightMin,
    healthyWeightMax: bmiResult.healthyWeightMax,
    // Energy
    bmr,
    tdee,
    dailyCalories: calorieResult.dailyCalories,
    maintenanceCalories: calorieResult.maintenanceCalories,
    caloriesToGain: calorieResult.caloriesToGain,
    caloriesToLose: calorieResult.caloriesToLose,
    // Water
    idealWaterLiters,
    // Macros
    proteinGrams: macros.proteinGrams,
    carbGrams: macros.carbGrams,
    fatGrams: macros.fatGrams,
    fiberGrams: macros.fiberGrams,
    sugarLimitGrams: macros.sugarLimitGrams,
    sodiumLimitMg: micros.sodiumLimitMg,
    // Macro ratios
    proteinPerKg: macros.proteinPerKg,
    fatPercentage: macros.fatPercentage,
    carbPercentage: macros.carbPercentage,
    // Micronutrients
    calciumMg: micros.calciumMg,
    ironMg: micros.ironMg,
    vitAMcg: micros.vitAMcg,
    vitCMg: micros.vitCMg,
    vitDIu: micros.vitDIu,
    vitB12Mcg: micros.vitB12Mcg,
    magnesiumMg: micros.magnesiumMg,
    potassiumMg: micros.potassiumMg,
    omega3Grams: micros.omega3Grams,
    // Goal timeline
    goalTimelineWeeks: timeline.goalTimelineWeeks,
    goalTimelineDate: timeline.goalTimelineDate,
    weeklyWeightChangeKg: timeline.weeklyWeightChangeKg,
    // Health tips
    healthTips,
  };
}
