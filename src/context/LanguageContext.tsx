import React, { createContext, useContext, useState } from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { IndianWelcomeAnimation } from '../components/common/IndianWelcomeAnimation';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  showIndianAnimation: boolean;
  closeIndianAnimation: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('infinityfit_lang');
    if (saved && ['en', 'hi'].includes(saved)) {
      return saved as Language;
    }
    return 'en';
  });

  const [showIndianAnimation, setShowIndianAnimation] = useState<boolean>(false);

  const changeLanguage = (lang: Language) => {
    if (lang === 'hi') {
      setShowIndianAnimation(true);
    }
    setLanguage(lang);
    localStorage.setItem('infinityfit_lang', lang);
  };

  const t = (key: string): string => {
    const dict = translations[language] || translations['en'];
    return dict[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: changeLanguage, 
        t,
        showIndianAnimation,
        closeIndianAnimation: () => setShowIndianAnimation(false)
      }}
    >
      {children}
      <IndianWelcomeAnimation 
        show={showIndianAnimation} 
        onClose={() => setShowIndianAnimation(false)} 
      />
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
