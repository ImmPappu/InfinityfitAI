import type { UserProfile, HealthCalculations } from '../types';

export function calculateHealthMetrics(profile: UserProfile): HealthCalculations {
  const { weightKg, heightCm, age, gender, activityLevel, goal } = profile;

  // 1. BMI Calculation
  const heightM = heightCm / 100;
  const bmiRaw = heightM > 0 ? weightKg / (heightM * heightM) : 22;
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

  // 2. BMR (Mifflin-St Jeor Equation)
  let bmrBase = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  if (gender === 'male') {
    bmrBase += 5;
  } else if (gender === 'female') {
    bmrBase -= 161;
  } else {
    bmrBase -= 78;
  }
  const bmr = Math.round(bmrBase);

  // 3. Activity Multipliers
  const activityMap: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    athlete: 1.9,
  };
  const multiplier = activityMap[activityLevel] || 1.375;
  const tdee = Math.round(bmr * multiplier);

  // 4. Daily Calories for Goal
  const maintenanceCalories = tdee;
  const caloriesToLose = Math.max(1200, tdee - 500);
  const caloriesToGain = tdee + 450;

  let dailyCalories = maintenanceCalories;
  if (goal === 'lose') {
    dailyCalories = caloriesToLose;
  } else if (goal === 'gain') {
    dailyCalories = caloriesToGain;
  }

  // 5. Macronutrients
  let proteinFactor = 1.8;
  if (goal === 'gain') proteinFactor = 2.2;
  if (goal === 'lose') proteinFactor = 2.0;

  const proteinGrams = Math.round(weightKg * proteinFactor);
  const fatCalories = dailyCalories * 0.25;
  const fatGrams = Math.round(fatCalories / 9);

  const proteinCalories = proteinGrams * 4;
  const remainingCalories = Math.max(0, dailyCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(remainingCalories / 4);

  const fiberGrams = Math.round((dailyCalories / 1000) * 14);
  const sugarLimitGrams = Math.round((dailyCalories * 0.08) / 4);
  const sodiumLimitMg = 2300;

  // 6. Water Intake
  let baseWater = weightKg * 0.035;
  if (activityLevel === 'active' || activityLevel === 'athlete') baseWater += 0.75;
  const idealWaterLiters = Math.round(baseWater * 10) / 10;

  // 7. Micronutrients
  const isFemale = gender === 'female';

  return {
    bmi,
    bmiCategory,
    bmiColor,
    healthyWeightMin,
    healthyWeightMax,
    bmr,
    tdee,
    dailyCalories,
    maintenanceCalories,
    caloriesToGain,
    caloriesToLose,
    idealWaterLiters,
    proteinGrams,
    carbGrams,
    fatGrams,
    fiberGrams,
    sugarLimitGrams,
    sodiumLimitMg,
    calciumMg: 1000,
    ironMg: isFemale ? 18 : 8,
    vitAMcg: 900,
    vitCMg: 90,
    vitDIu: 800,
    vitB12Mcg: 2.4,
    magnesiumMg: isFemale ? 320 : 420,
    potassiumMg: 3400,
    omega3Grams: 1.6,
  };
}
