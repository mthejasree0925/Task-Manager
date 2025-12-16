import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskService } from '../taskService';
import { createTask, createTaskData } from '../../__tests__/__factories__/taskFactory';

describe('taskService', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  describe('getUserTasks', () => {
    it('should return empty array when no tasks exist', async () => {
      const tasks = await taskService.getUserTasks('user-1');
      expect(tasks).toEqual([]);
    });

    it('should return tasks for specific user', async () => {
      const now = new Date();
      const task1 = createTask({ id: '1', userId: 'user-1', createdAt: new Date(now.getTime() - 2000) });
      const task2 = createTask({ id: '2', userId: 'user-2', createdAt: now });
      const task3 = createTask({ id: '3', userId: 'user-1', createdAt: new Date(now.getTime() - 1000) });

      await AsyncStorage.setItem('user_tasks', JSON.stringify([task1, task2, task3]));

      const tasks = await taskService.getUserTasks('user-1');
      expect(tasks).toHaveLength(2);
      // Tasks are sorted by createdAt descending, so task3 (newer) should come first
      expect(tasks[0].id).toBe('3');
      expect(tasks[1].id).toBe('1');
    });

    it('should sort tasks by createdAt descending', async () => {
      const now = new Date();
      const task1 = createTask({ id: '1', userId: 'user-1', createdAt: new Date(now.getTime() - 1000) });
      const task2 = createTask({ id: '2', userId: 'user-1', createdAt: new Date(now.getTime() - 2000) });
      const task3 = createTask({ id: '3', userId: 'user-1', createdAt: now });

      await AsyncStorage.setItem('user_tasks', JSON.stringify([task1, task2, task3]));

      const tasks = await taskService.getUserTasks('user-1');
      expect(tasks[0].id).toBe('3');
      expect(tasks[1].id).toBe('1');
      expect(tasks[2].id).toBe('2');
    });

    it('should handle errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(AsyncStorage, 'getItem').mockRejectedValueOnce(new Error('Storage error'));
      const tasks = await taskService.getUserTasks('user-1');
      expect(tasks).toEqual([]);
      consoleSpy.mockRestore();
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const taskData = createTaskData({ userId: 'user-1' });
      const task = await taskService.createTask(taskData);

      expect(task).toMatchObject({
        title: taskData.title,
        description: taskData.description,
        userId: taskData.userId,
        completed: false,
      });
      expect(task.id).toBeDefined();
      expect(task.createdAt).toBeInstanceOf(Date);
      expect(task.updatedAt).toBeInstanceOf(Date);
    });

    it('should save task to storage', async () => {
      const taskData = createTaskData({ userId: 'user-1' });
      const task = await taskService.createTask(taskData);

      const stored = await AsyncStorage.getItem('user_tasks');
      const tasks = JSON.parse(stored || '[]');
      expect(tasks).toHaveLength(1);
      expect(tasks[0].id).toBe(task.id);
    });

    it('should throw error on failure', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce(new Error('Storage error'));
      const taskData = createTaskData();

      await expect(taskService.createTask(taskData)).rejects.toThrow('Failed to create task');
      consoleSpy.mockRestore();
    });
  });

  describe('updateTask', () => {
    it('should update existing task', async () => {
      const task = createTask({ id: '1', userId: 'user-1' });
      await AsyncStorage.setItem('user_tasks', JSON.stringify([task]));

      const updates = { title: 'Updated Title', completed: true };
      const updatedTask = await taskService.updateTask('1', updates);

      expect(updatedTask.title).toBe('Updated Title');
      expect(updatedTask.completed).toBe(true);
      expect(updatedTask.updatedAt).toBeInstanceOf(Date);
    });

    it('should throw error if task not found', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      await expect(taskService.updateTask('non-existent', { title: 'New' })).rejects.toThrow(
        'Failed to update task'
      );
      consoleSpy.mockRestore();
    });

    it('should throw error on storage failure', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const task = createTask({ id: '1' });
      await AsyncStorage.setItem('user_tasks', JSON.stringify([task]));
      jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce(new Error('Storage error'));

      await expect(taskService.updateTask('1', { title: 'New' })).rejects.toThrow(
        'Failed to update task'
      );
      consoleSpy.mockRestore();
    });
  });

  describe('deleteTask', () => {
    it('should delete task from storage', async () => {
      const task1 = createTask({ id: '1' });
      const task2 = createTask({ id: '2' });
      await AsyncStorage.setItem('user_tasks', JSON.stringify([task1, task2]));

      await taskService.deleteTask('1');

      const stored = await AsyncStorage.getItem('user_tasks');
      const tasks = JSON.parse(stored || '[]');
      expect(tasks).toHaveLength(1);
      expect(tasks[0].id).toBe('2');
    });

    it('should throw error on storage failure', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const task = createTask({ id: '1' });
      await AsyncStorage.setItem('user_tasks', JSON.stringify([task]));
      jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce(new Error('Storage error'));

      await expect(taskService.deleteTask('1')).rejects.toThrow('Failed to delete task');
      consoleSpy.mockRestore();
    });
  });
});

