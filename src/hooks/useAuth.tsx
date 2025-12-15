import { useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';

const AUTH_STORAGE_KEY = 'user_session';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user session:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }, []);

  return {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ROLE_ADMIN',
  };
};