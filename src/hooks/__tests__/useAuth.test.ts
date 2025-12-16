import { renderHook, waitFor, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../useAuth';
import { createUser } from '../../__tests__/__factories__/userFactory';
import { authService } from '../../services/authService';

jest.mock('../../services/authService');

describe('useAuth', () => {
  beforeEach(() => {
    AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it('should load stored user on mount', async () => {
    const user = createUser();
    await AsyncStorage.setItem('user_session', JSON.stringify(user));

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toMatchObject(user);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should return null user when no stored session', async () => {
    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should login user successfully', async () => {
    const user = createUser();
    (authService.login as jest.Mock).mockResolvedValue(user);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    await waitFor(() => {
      expect(result.current.user).toMatchObject(user);
      expect(result.current.isAuthenticated).toBe(true);
    });

    const stored = await AsyncStorage.getItem('user_session');
    expect(JSON.parse(stored || '{}')).toMatchObject(user);
  });

  it('should logout user', async () => {
    const user = createUser();
    await AsyncStorage.setItem('user_session', JSON.stringify(user));
    (authService.logout as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.logout();
    });

    await waitFor(() => {
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    const stored = await AsyncStorage.getItem('user_session');
    expect(stored).toBeNull();
  });

  it('should identify admin user', async () => {
    const adminUser = createUser({ role: 'ROLE_ADMIN' });
    await AsyncStorage.setItem('user_session', JSON.stringify(adminUser));

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.isAdmin).toBe(true);
  });

  it('should identify non-admin user', async () => {
    const user = createUser({ role: 'ROLE_MEMBER' });
    await AsyncStorage.setItem('user_session', JSON.stringify(user));

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.isAdmin).toBe(false);
  });
});

