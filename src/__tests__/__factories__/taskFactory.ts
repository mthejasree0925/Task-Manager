import { Task, CreateTaskData } from '../../types';

export const createTask = (overrides?: Partial<Task>): Task => {
  const now = new Date();
  return {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdAt: now,
    updatedAt: now,
    userId: 'user-1',
    ...overrides,
  };
};

export const createTaskData = (overrides?: Partial<CreateTaskData>): CreateTaskData => ({
  title: 'New Task',
  description: 'New Description',
  userId: 'user-1',
  ...overrides,
});

export const createTasks = (count: number, overrides?: Partial<Task>): Task[] => {
  return Array.from({ length: count }, (_, index) =>
    createTask({
      id: `task-${index + 1}`,
      title: `Task ${index + 1}`,
      ...overrides,
    })
  );
};

