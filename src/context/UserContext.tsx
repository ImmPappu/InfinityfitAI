import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { UserProfile, HealthCalculations, UnitSystem, DailyLog } from '../types';
import { calculateHealthMetrics } from '../utils/healthEngine';

const defaultProfile: UserProfile = {
  name: 'Alex Vance',
  gender: 'male',
  age: 27,
  heightCm: 178,
  weightKg: 74,
  targetWeightKg: 68,
  goal: 'lose',
  bodyType: 'average',
  activityLevel: 'moderate',
  dietPreference: 'veg',
  workoutExperience: 'intermediate',
  healthConditions: ['none'],
  allergies: ['none'],
  workoutDaysPerWeek: 5,
  sleepHours: 8,
  waterIntakeLiters: 3.5,
  isOnboarded: true,
};

interface UserContextType {
  profile: UserProfile;
  metrics: HealthCalculations;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isOnboardingOpen: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unitSystem: UnitSystem;
  setUnitSystem: (unit: UnitSystem) => void;
  dailyLogs: DailyLog[];
  addLogEntry: (log: Partial<DailyLog>) => void;
  // Fasting state
  fastingState: {
    isFasting: boolean;
    startTime: number | null; // timestamp ms
    protocolHours: number;
  };
  startFast: (hours: number) => void;
  endFast: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fitfusion_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultProfile;
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [unitSystem, setUnitSystemState] = useState<UnitSystem>('metric');

  // Fasting Timer state persistence
  const [fastingState, setFastingState] = useState<{
    isFasting: boolean;
    startTime: number | null;
    protocolHours: number;
  }>(() => {
    const saved = localStorage.getItem('fitfusion_fasting');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return { isFasting: false, startTime: null, protocolHours: 16 };
  });

  // Demo logs history
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>(() => {
    const saved = localStorage.getItem('fitfusion_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { date: '2026-07-26', weightKg: 75.2, caloriesConsumed: 2100, proteinGrams: 110, waterLiters: 3.0, sleepHours: 7.5, workoutCompleted: true, mood: 'Good' },
      { date: '2026-07-27', weightKg: 75.0, caloriesConsumed: 1950, proteinGrams: 120, waterLiters: 3.2, sleepHours: 8.0, workoutCompleted: true, mood: 'Awesome' },
      { date: '2026-07-28', weightKg: 74.6, caloriesConsumed: 2050, proteinGrams: 115, waterLiters: 3.5, sleepHours: 7.0, workoutCompleted: true, mood: 'Good' },
      { date: '2026-07-29', weightKg: 74.4, caloriesConsumed: 1890, proteinGrams: 125, waterLiters: 3.8, sleepHours: 8.2, workoutCompleted: true, mood: 'Awesome' },
      { date: '2026-07-30', weightKg: 74.2, caloriesConsumed: 1980, proteinGrams: 130, waterLiters: 3.5, sleepHours: 7.8, workoutCompleted: true, mood: 'Awesome' },
      { date: '2026-07-31', weightKg: 74.0, caloriesConsumed: 1920, proteinGrams: 128, waterLiters: 3.6, sleepHours: 8.0, workoutCompleted: true, mood: 'Awesome' },
    ];
  });

  // Calculate metrics on the fly whenever profile changes
  const metrics = useMemo(() => calculateHealthMetrics(profile), [profile]);

  useEffect(() => {
    localStorage.setItem('fitfusion_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('fitfusion_fasting', JSON.stringify(fastingState));
  }, [fastingState]);

  useEffect(() => {
    localStorage.setItem('fitfusion_logs', JSON.stringify(dailyLogs));
  }, [dailyLogs]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const setUnitSystem = (unit: UnitSystem) => {
    setUnitSystemState(unit);
  };

  const openOnboarding = () => setIsOnboardingOpen(true);
  const closeOnboarding = () => setIsOnboardingOpen(false);

  const addLogEntry = (newEntry: Partial<DailyLog>) => {
    const today = new Date().toISOString().split('T')[0];
    setDailyLogs((prev) => {
      const existingIdx = prev.findIndex((l) => l.date === today);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = { ...copy[existingIdx], ...newEntry };
        return copy;
      } else {
        const fullEntry: DailyLog = {
          date: today,
          weightKg: newEntry.weightKg ?? profile.weightKg,
          caloriesConsumed: newEntry.caloriesConsumed ?? 0,
          proteinGrams: newEntry.proteinGrams ?? 0,
          waterLiters: newEntry.waterLiters ?? 0,
          sleepHours: newEntry.sleepHours ?? profile.sleepHours,
          workoutCompleted: newEntry.workoutCompleted ?? false,
          mood: newEntry.mood ?? 'Awesome',
          measurements: newEntry.measurements,
        };
        return [...prev, fullEntry];
      }
    });
  };

  const startFast = (hours: number) => {
    setFastingState({
      isFasting: true,
      startTime: Date.now(),
      protocolHours: hours,
    });
  };

  const endFast = () => {
    setFastingState({
      isFasting: false,
      startTime: null,
      protocolHours: 16,
    });
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        metrics,
        updateProfile,
        isOnboardingOpen,
        openOnboarding,
        closeOnboarding,
        activeTab,
        setActiveTab,
        unitSystem,
        setUnitSystem,
        dailyLogs,
        addLogEntry,
        fastingState,
        startFast,
        endFast,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
