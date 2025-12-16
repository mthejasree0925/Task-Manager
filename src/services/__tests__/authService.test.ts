import { authService } from '../authService';
import { createUser, createAdminUser } from '../../__tests__/__factories__/userFactory';

describe('authService', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('login', () => {
    it('should login admin user with correct credentials', async () => {
      const loginPromise = authService.login('admin@taskmanager.com', 'admin123');
      jest.advanceTimersByTime(1000);
      const user = await loginPromise;

      expect(user).toMatchObject({
        email: 'admin@taskmanager.com',
        role: 'ROLE_ADMIN',
        name: 'Admin User',
      });
      expect(user.id).toBe('1');
    });

    it('should login regular user with correct credentials', async () => {
      const loginPromise = authService.login('user@taskmanager.com', 'user123');
      jest.advanceTimersByTime(1000);
      const user = await loginPromise;

      expect(user).toMatchObject({
        email: 'user@taskmanager.com',
        role: 'ROLE_MEMBER',
        name: 'Regular User',
      });
      expect(user.id).toBe('2');
    });

    it('should throw error for invalid credentials', async () => {
      const loginPromise = authService.login('wrong@email.com', 'wrongpassword');
      jest.advanceTimersByTime(1000);

      await expect(loginPromise).rejects.toThrow('Invalid credentials');
    });

    it('should throw error for wrong password', async () => {
      const loginPromise = authService.login('admin@taskmanager.com', 'wrongpassword');
      jest.advanceTimersByTime(1000);

      await expect(loginPromise).rejects.toThrow('Invalid credentials');
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      const logoutPromise = authService.logout();
      jest.advanceTimersByTime(500);
      await expect(logoutPromise).resolves.toBeUndefined();
    });
  });
});

