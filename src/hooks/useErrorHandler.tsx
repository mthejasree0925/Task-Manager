import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { errorService } from '../services/errorService';

export const useErrorHandler = () => {
  const { user } = useAuth();

  const handleError = useCallback(async (error: any, context?: string) => {
    console.error('Error occurred:', error, context);

    if (user) {
      try {
        await errorService.logError({
          message: error.message || 'Unknown error',
          userId: user.id,
          statusCode: error.statusCode || 500,
          route: context || 'unknown',
        });
      } catch (logError) {
        console.error('Failed to log error:', logError);
      }
    }

    // Navigate to error page for server errors
    if (error.statusCode >= 500) {
      // You can use navigation here if needed
      console.log('Would navigate to error page for server error');
    }
  }, [user]);

  return { handleError };
};
