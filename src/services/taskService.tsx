import { Task, CreateTaskData } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_STORAGE_KEY = 'user_tasks';

export const taskService = {
  async getUserTasks(userId: string): Promise<Task[]> {
    try {
      const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      const allTasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

      // Filter tasks by user ID and parse dates
      return allTasks
        .filter(task => task.userId === userId)
        .map(task => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Failed to get user tasks:', error);
      return [];
    }
  },

  async createTask(taskData: CreateTaskData): Promise<Task> {
    try {
      const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      const allTasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.title,
        description: taskData.description,
        completed: false,
        userId: taskData.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      allTasks.push(newTask);
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(allTasks));

      return newTask;
    } catch (error) {
      console.error('Failed to create task:', error);
      throw new Error('Failed to create task');
    }
  },

  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    try {
      const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      const allTasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

      const taskIndex = allTasks.findIndex(task => task.id === taskId);
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }

      const updatedTask: Task = {
        ...allTasks[taskIndex],
        ...updates,
        updatedAt: new Date(),
      };

      allTasks[taskIndex] = updatedTask;
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(allTasks));

      return updatedTask;
    } catch (error) {
      console.error('Failed to update task:', error);
      throw new Error('Failed to update task');
    }
  },

  async deleteTask(taskId: string): Promise<void> {
    try {
      const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      const allTasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

      const filteredTasks = allTasks.filter(task => task.id !== taskId);
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(filteredTasks));
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw new Error('Failed to delete task');
    }
  },
};
