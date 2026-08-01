import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider, useUser } from './context/UserContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { OnboardingModal } from './components/onboarding/OnboardingModal';

// Feature Views
import { LandingPage } from './components/landing/LandingPage';
import { HealthDashboard } from './components/dashboard/HealthDashboard';
import { FoodPlannerPage } from './components/food/FoodPlannerPage';
import { WorkoutPlannerPage } from './components/workout/WorkoutPlannerPage';
import { YogaSection } from './components/workout/YogaSection';
import { IntermittentFastingPage } from './components/fasting/IntermittentFastingPage';
import { ProgressTrackerPage } from './components/progress/ProgressTrackerPage';
import { AiCoachPage } from './components/ai-coach/AiCoachPage';
import { CalculatorsHub } from './components/calculators/CalculatorsHub';
import { SettingsPage } from './components/settings/SettingsPage';

const MainAppContent: React.FC = () => {
  const { activeTab } = useUser();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <LandingPage />;
      case 'dashboard':
        return <HealthDashboard />;
      case 'meals':
        return <FoodPlannerPage />;
      case 'workouts':
        return <WorkoutPlannerPage />;
      case 'yoga':
        return <YogaSection />;
      case 'fasting':
        return <IntermittentFastingPage />;
      case 'progress':
        return <ProgressTrackerPage />;
      case 'aicoach':
        return <AiCoachPage />;
      case 'calculators':
        return <CalculatorsHub />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {renderActiveTab()}
        </main>
      </div>

      <OnboardingModal />
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <MainAppContent />
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
