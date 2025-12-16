import { useState, useEffect, useCallback, useMemo } from 'react';
import { Task, PaginationParams, SortParams, FilterParams } from '../types';
import { useAuth } from './useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskService } from '../services/taskService';

const FILTERS_STORAGE_KEY = 'task_filters';

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 5,
  });
  const [sort, setSort] = useState<SortParams>({
    field: 'createdAt',
    direction: 'desc',
  });
  const [filters, setFilters] = useState<FilterParams>({});

  useEffect(() => {
    loadTasks();
    loadStoredFilters();
  }, [user?.id]);

  const loadStoredFilters = async () => {
    try {
      const storedFilters = await AsyncStorage.getItem(FILTERS_STORAGE_KEY);
      if (storedFilters) {
        setFilters(JSON.parse(storedFilters));
      }
    } catch (error) {
      console.error('Failed to load filters:', error);
    }
  };

  const saveFilters = async (newFilters: FilterParams) => {
    try {
      await AsyncStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(newFilters));
    } catch (error) {
      console.error('Failed to save filters:', error);
    }
  };

  const loadTasks = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const userTasks = await taskService.getUserTasks(user.id);
      setTasks(userTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const addTask = useCallback(async (title: string, description: string) => {
    if (!user) return;

    try {
      const newTask = await taskService.createTask({
        title,
        description,
        userId: user.id,
      });
      setTasks(prev => [newTask, ...prev]);
    } catch (error) {
      throw error;
    }
  }, [user?.id]);

  const updateTask = useCallback(async (taskId: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, updates);
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ));
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (error) {
      throw error;
    }
  }, []);

  const toggleTaskCompletion = useCallback(async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      await updateTask(taskId, { completed: !task.completed });
    }
  }, [tasks, updateTask]);

  // Generic utility function for filtering and sorting
  const useFilteredAndSortedTasks = <T extends Task>(
    items: T[],
    sortConfig: SortParams,
    filterConfig: FilterParams
  ): T[] => {
    return useMemo(() => {
      let filtered = items.filter(item => {
        if (filterConfig.completed !== undefined && item.completed !== filterConfig.completed) {
          return false;
        }
        if (filterConfig.search && !item.title.toLowerCase().includes(filterConfig.search.toLowerCase())) {
          return false;
        }
        return true;
      });

      return filtered.sort((a, b) => {
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];

        if (sortConfig.direction === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }, [items, sortConfig, filterConfig]);
  };

  const filteredAndSortedTasks = useFilteredAndSortedTasks(tasks, sort, filters);

  const paginatedTasks = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.limit;
    return filteredAndSortedTasks.slice(startIndex, startIndex + pagination.limit);
  }, [filteredAndSortedTasks, pagination]);

  const updateFilters = useCallback((newFilters: FilterParams) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
    saveFilters(newFilters);
  }, []);

  return {
    tasks: paginatedTasks,
    allTasks: tasks,
    loading,
    pagination,
    sort,
    filters,
    totalTasks: filteredAndSortedTasks.length,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    setPagination,
    setSort,
    setFilters: updateFilters,
    refreshTasks: loadTasks,
  };
};