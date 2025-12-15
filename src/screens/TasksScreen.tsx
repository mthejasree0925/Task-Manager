import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useTasks } from '../hooks/usetasks';
import { useAuthContext as useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { Button } from '../components/sharedComponents/Button';
import { ThemedCard } from '../components/sharedComponents/ThemedCard';
import { ThemedText } from '../components/sharedComponents/ThemedText';
import { ThemedView } from '../components/sharedComponents/ThemedView';
import { TaskForm } from '../components/TaskForm';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../contexts/ThemeContext';
import { Task } from '../types';
import { showAlert } from '../utils/alertHelper';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useFeatureFlags } from '../hooks/useFeatureFlags';

type TasksScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export const TasksScreen: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    tasks,
    loading,
    pagination,
    totalTasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    setPagination,
    setFilters,
    refreshTasks,
  } = useTasks();

  const { user } = useAuth();
  const navigation = useNavigation<TasksScreenNavigationProp>();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { handleError } = useErrorHandler(); // Add this
  const { isFeatureEnabled } = useFeatureFlags();
  const { width, height } = useWindowDimensions();
  // Check if screen is wide enough for side-by-side layout
  const isWideScreen = width > height && width > 768; // Landscape or wide screen

  const handleAddTask = async (data: { title: string; description: string }) => {
    try {
      await addTask(data.title, data.description);
      setShowAddForm(false);
    } catch (error) {
      await handleError(error, 'TasksScreen-addTask');
      showAlert(t('common.error'), t('tasks.addError'));
    }
  };

  const handleDeleteTask = (taskId: string) => {
    showAlert(
      t('tasks.deleteTask'),
      t('tasks.deleteConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTask(taskId);
            } catch (error) {
              await handleError(error, 'TasksScreen-deleteTask'); // Add this
              showAlert(t('common.error'), t('tasks.deleteError'));
            }
          },
        },
      ]
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshTasks();
    setRefreshing(false);
  };

  const handleTaskPress = (task: Task) => {
    navigation.push('TaskDetails', { taskId: task.id });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilters({ search: query });
  };

  const totalPages = Math.ceil(totalTasks / pagination.limit);
  const currentPage = pagination.page;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPagination(prev => ({ ...prev, page }));
    }
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <ThemedCard style={styles.taskCard}>
      <TouchableOpacity onPress={() => handleTaskPress(item)}>
        <View style={styles.taskHeader}>
          <ThemedText size="lg" weight="semibold" style={styles.taskTitle}>
            {item.title}
          </ThemedText>
          <View style={styles.taskActions}>
            <Button
              title={item.completed ? '✓' : '○'}
              onPress={() => toggleTaskCompletion(item.id)}
              variant={item.completed ? 'primary' : 'secondary'}
              style={styles.completionButton}
            />
            <Button
              title={t('common.delete')}
              onPress={() => handleDeleteTask(item.id)}
              variant="secondary"
              style={styles.deleteButton}
            />
          </View>
        </View>

        <ThemedText variant="secondary" style={styles.taskDescription} numberOfLines={2}>
          {item.description}
        </ThemedText>

        <View style={styles.taskFooter}>
          <ThemedText
            size="sm"
            weight="medium"
            variant={item.completed ? 'success' : 'warning'}
          >
            {item.completed ? t('tasks.completed') : t('tasks.pending')}
          </ThemedText>
          <ThemedText variant="tertiary" size="xs">
            {new Date(item.createdAt).toLocaleDateString()}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </ThemedCard>
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <View style={[styles.pagination, { backgroundColor: theme.colors.background.primary }]}>
        <Button
          title="‹"
          onPress={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={styles.paginationButton}
        />

        <ThemedText variant="secondary" style={styles.paginationText}>
          {t('common.page')} {currentPage} {t('common.of')} {totalPages}
        </ThemedText>

        <Button
          title="›"
          onPress={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={styles.paginationButton}
        />
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>

      <View style={[styles.header, { backgroundColor: theme.colors.background.primary }]}>
        <ThemedText size="xxxl" weight="bold">
          {t('tasks.title')}
        </ThemedText>
        <ThemedText variant="secondary">
          {user?.name} ({user?.role === 'ROLE_ADMIN' ? t('profile.roleAdmin') : t('profile.roleMember')})
        </ThemedText>
      </View>
      <View style={{ flex: 1, flexDirection: isWideScreen ? 'row' : 'column' }}>

        <View style={isWideScreen ? { flex: 0.5 } : {}}>
          {isFeatureEnabled('enableTaskSearch') && 
          <ThemedCard style={styles.searchCard}>
            <TextInput
              style={[
                styles.searchInput,
                {
                  color: theme.colors.text.primary,
                }
              ]}
              placeholder={t('tasks.searchPlaceholder')}
              placeholderTextColor={theme.colors.text.tertiary}
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </ThemedCard>}

          {showAddForm ? (
            <TaskForm
              onSubmit={handleAddTask}
              loading={loading}
              onCancel={() => setShowAddForm(false)}
            />
          ) : (
            <Button
              title={t('tasks.addTask')}
              onPress={() => setShowAddForm(true)}
              style={styles.addButton}
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={tasks}
            renderItem={renderTaskItem}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[theme.colors.primary[500]]}
                tintColor={theme.colors.primary[500]}
              />
            }
            ListEmptyComponent={
              <ThemedCard style={styles.emptyCard}>
                <ThemedText variant="secondary" style={styles.emptyText}>
                  {t('tasks.noTasks')}
                </ThemedText>
              </ThemedCard>
            }
            contentContainerStyle={styles.listContent}
          />

          {renderPagination()}
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  searchCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  searchInput: {
    fontSize: 16,
    padding: 0,
  },
  addButton: {
    margin: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  taskCard: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  taskTitle: {
    flex: 1,
    marginRight: 12,
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completionButton: {
    minWidth: 44,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  deleteButton: {
    minWidth: 60,
    paddingHorizontal: 8,
  },
  taskDescription: {
    marginBottom: 12,
    lineHeight: 20,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyCard: {
    margin: 16,
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
  },
  paginationButton: {
    minWidth: 44,
    paddingHorizontal: 12,
  },
  paginationText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
});