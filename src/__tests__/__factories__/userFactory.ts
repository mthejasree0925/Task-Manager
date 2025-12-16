import { User } from '../../types';

export const createUser = (overrides?: Partial<User>): User => ({
  id: 'user-1',
  email: 'test@example.com',
  role: 'ROLE_MEMBER',
  name: 'Test User',
  ...overrides,
});

export const createAdminUser = (overrides?: Partial<User>): User =>
  createUser({
    id: 'admin-1',
    email: 'admin@example.com',
    role: 'ROLE_ADMIN',
    name: 'Admin User',
    ...overrides,
  });

