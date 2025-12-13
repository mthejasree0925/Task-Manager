export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  role: 'ROLE_MEMBER' | 'ROLE_ADMIN';
  name: string;
}

export interface AppError {
  id: string;
  message: string;
  timestamp: Date;
  userId: string;
  statusCode: number;
  route: string;
}

export type PaginationParams = {
  page: number;
  limit: number;
};

export type SortParams = {
  field: keyof Task;
  direction: 'asc' | 'desc';
};

export type FilterParams = {
  completed?: boolean;
  search?: string;
};

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: any;
  testID?: string;
}

// Add form data types
export interface TaskFormData {
  title: string;
  description: string;
}

// Add task creation data
export interface CreateTaskData {
  title: string;
  description: string;
  userId: string;
}