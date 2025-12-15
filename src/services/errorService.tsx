import { AppError } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ERRORS_STORAGE_KEY = 'app_errors';

export const errorService = {
  async logError(errorData: Omit<AppError, 'id' | 'timestamp'>): Promise<void> {
    try {
      const errors = await this.getStoredErrors();
      const newError: AppError = {
        ...errorData,
        id: Date.now().toString(),
        timestamp: new Date(),
      };

      errors.push(newError);
      await AsyncStorage.setItem(ERRORS_STORAGE_KEY, JSON.stringify(errors));
    } catch (error) {
      console.error('Failed to log error:', error);
    }
  },

  async getStoredErrors(): Promise<AppError[]> {
    try {
      const stored = await AsyncStorage.getItem(ERRORS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get stored errors:', error);
      return [];
    }
  },

  async clearErrors(): Promise<void> {
    try {
      await AsyncStorage.removeItem(ERRORS_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear errors:', error);
    }
  },
};