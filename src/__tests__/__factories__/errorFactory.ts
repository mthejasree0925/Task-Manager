import { AppError } from '../../types';

export const createAppError = (overrides?: Partial<AppError>): AppError => {
  const now = new Date();
  return {
    id: 'error-1',
    message: 'Test error message',
    timestamp: now,
    userId: 'user-1',
    statusCode: 500,
    route: '/test/route',
    ...overrides,
  };
};

export const createAppErrors = (count: number, overrides?: Partial<AppError>): AppError[] => {
  return Array.from({ length: count }, (_, index) =>
    createAppError({
      id: `error-${index + 1}`,
      message: `Error ${index + 1}`,
      statusCode: 400 + (index % 3) * 100,
      ...overrides,
    })
  );
};

