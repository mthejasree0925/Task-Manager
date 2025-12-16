import React, { createContext, useContext, useState, useEffect } from 'react';
import { i18n, initI18n, setLocale } from '../i18n';

interface LocalizationContextType {
  locale: string;
  t: (key: string, options?: any) => string;
  changeLanguage: (locale: string) => Promise<void>;
  loading: boolean;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState(i18n.locale);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeI18n();
  }, []);

  const initializeI18n = async () => {
    try {
      await initI18n();
      setLocaleState(i18n.locale);
    } catch (error) {
      console.error('Failed to initialize localization:', error);
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = async (newLocale: string) => {
    try {
      setLoading(true);
      await setLocale(newLocale);
      setLocaleState(newLocale);
      
      // Force re-render by updating the state
      // This will trigger all components using the context to update
    } catch (error) {
      console.error('Failed to change language:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const t = (key: string, options?: any) => {
    return i18n.t(key, options);
  };

  const value = {
    locale,
    t,
    changeLanguage,
    loading,
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};