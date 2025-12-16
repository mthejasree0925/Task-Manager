import React from 'react';
import { lightTheme } from '../../constants/theme';
import { createUser } from '../__factories__/userFactory';

export const mockAuthContext = {
  user: createUser(),
  login: (jest.fn() as any) as () => Promise<any>,
  logout: (jest.fn() as any) as () => Promise<void>,
  loading: false,
  isAuthenticated: true,
  isAdmin: false,
};

export const mockThemeContext = {
  theme: lightTheme,
  themeMode: 'light' as const,
  isDark: false,
  toggleTheme: (jest.fn() as any) as () => void,
  setThemeMode: (jest.fn() as any) as (mode: 'light' | 'dark') => void,
  loading: false,
};

export const mockTranslationContext = {
  t: (key: string, params?: any) => {
    if (params) {
      return `${key} ${JSON.stringify(params)}`;
    }
    return key;
  },
  locale: 'en',
  changeLanguage: (jest.fn() as any) as (locale: string) => Promise<void>,
  loading: false,
};

export const MockProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
