import '@testing-library/jest-native/extend-expect';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock expo modules
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

// Mock window.confirm and window.alert for web
if (typeof window !== 'undefined') {
  global.window = {
    ...global.window,
    confirm: jest.fn(),
    alert: jest.fn(),
  };
}

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  AsyncStorage.clear();
});

