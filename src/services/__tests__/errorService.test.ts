import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorService } from '../errorService';
import { createAppError } from '../../__tests__/__factories__/errorFactory';

describe('errorService', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  describe('logError', () => {
    it('should log error to storage', async () => {
      const errorData = {
        message: 'Test error',
        userId: 'user-1',
        statusCode: 500,
        route: '/test',
      };

      await errorService.logError(errorData);

      const stored = await AsyncStorage.getItem('app_errors');
      const errors = JSON.parse(stored || '[]');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toMatchObject({
        message: errorData.message,
        userId: errorData.userId,
        statusCode: errorData.statusCode,
        route: errorData.route,
      });
      expect(errors[0].id).toBeDefined();
      expect(errors[0].timestamp).toBeDefined();
    });

    it('should append to existing errors', async () => {
      const existingError = createAppError({ id: 'error-1' });
      await AsyncStorage.setItem('app_errors', JSON.stringify([existingError]));

      const errorData = {
        message: 'New error',
        userId: 'user-1',
        statusCode: 400,
        route: '/new',
      };

      await errorService.logError(errorData);

      const stored = await AsyncStorage.getItem('app_errors');
      const errors = JSON.parse(stored || '[]');
      expect(errors).toHaveLength(2);
    });

    it('should handle storage errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce(new Error('Storage error'));

      const errorData = {
        message: 'Test error',
        userId: 'user-1',
        statusCode: 500,
        route: '/test',
      };

      await expect(errorService.logError(errorData)).resolves.not.toThrow();
      consoleSpy.mockRestore();
    });
  });

  describe('getStoredErrors', () => {
    it('should return empty array when no errors exist', async () => {
      const errors = await errorService.getStoredErrors();
      expect(errors).toEqual([]);
    });

    it('should return stored errors', async () => {
      const error1 = createAppError({ id: 'error-1' });
      const error2 = createAppError({ id: 'error-2' });
      await AsyncStorage.setItem('app_errors', JSON.stringify([error1, error2]));

      const errors = await errorService.getStoredErrors();
      expect(errors).toHaveLength(2);
    });

    it('should handle storage errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(AsyncStorage, 'getItem').mockRejectedValueOnce(new Error('Storage error'));
      const errors = await errorService.getStoredErrors();
      expect(errors).toEqual([]);
      consoleSpy.mockRestore();
    });
  });

  describe('clearErrors', () => {
    it('should clear all errors from storage', async () => {
      const error = createAppError();
      await AsyncStorage.setItem('app_errors', JSON.stringify([error]));

      await errorService.clearErrors();

      const stored = await AsyncStorage.getItem('app_errors');
      expect(stored).toBeNull();
    });

    it('should handle storage errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(AsyncStorage, 'removeItem').mockRejectedValueOnce(new Error('Storage error'));
      await expect(errorService.clearErrors()).resolves.not.toThrow();
      consoleSpy.mockRestore();
    });
  });
});

