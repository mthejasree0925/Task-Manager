import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useTasks } from '../hooks/usetasks';
import { Button } from '../components/sharedComponents/Button';
import { ThemedCard } from '../components/sharedComponents/ThemedCard';
import { ThemedText } from '../components/sharedComponents/ThemedText';
import { ThemedView } from '../components/sharedComponents/ThemedView';
import { TaskForm } from '../components/TaskForm';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../contexts/ThemeContext';
import { Task } from '../types';
import { showAlert } from '../utils/alertHelper';

type TaskDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskDetails'>;
type TaskDetailsScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;

export const TaskDetailsScreen: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  
  const navigation = useNavigation<TaskDetailsScreenNavigationProp>();
  const route = useRoute<TaskDetailsScreenRouteProp>();
  const { taskId } = route.params;
  
  const { allTasks, updateTask, deleteTask, toggleTaskCompletion } = useTasks();
  const { t } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    loadTask();
  }, [taskId, allTasks]);

  const loadTask = () => {
    const foundTask = allTasks.find(t => t.id === taskId);
    setTask(foundTask || null);
    setLoading(false);
  };

  const handleUpdateTask = async (data: { title: string; description: string }) => {
    try {
      await updateTask(taskId, data);
      setEditing(false);
      showAlert(t('common.success'), t('tasks.updateSuccess'));
    } catch (error) {
      showAlert(t('common.error'), t('tasks.updateError'));
    }
  };

  const handleDeleteTask = () => {
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
              navigation.goBack();
            } catch (error) {
              showAlert(t('common.error'), t('tasks.deleteError'));
            }
          },
        },
      ]
    );
  };

  const handleToggleCompletion = async () => {
    try {
      await toggleTaskCompletion(taskId);
    } catch (error) {
      showAlert(t('common.error'), t('tasks.statusUpdateError'));
    }
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Main', { screen: 'Tasks' });
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        <ThemedText variant="secondary" style={styles.loadingText}>
          {t('common.loading')}
        </ThemedText>
      </ThemedView>
    );
  }

  if (!task) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText variant="secondary" size="lg" style={styles.errorText}>
          {t('tasks.taskNotFound')}
        </ThemedText>
        <Button 
          title={t('common.goBack')} 
          onPress={handleGoBack} 
          style={styles.backButton} 
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={[styles.header, { backgroundColor: theme.colors.background.primary }]}>
          <Button
            title={t('common.back')}
            onPress={handleGoBack}
            variant="secondary"
            style={styles.backButton}
          />
        </View>

        {editing ? (
          <ThemedCard style={styles.card}>
            <ThemedText size="xl" weight="semibold" style={styles.editTitle}>
              {t('tasks.editTask')}
            </ThemedText>
            <TaskForm
              onSubmit={handleUpdateTask}
              initialData={{
                title: task.title,
                description: task.description,
              }}
              onCancel={() => setEditing(false)}
            />
          </ThemedCard>
        ) : (
          <ThemedCard style={styles.card}>
            <View style={styles.taskHeader}>
              <View style={styles.titleContainer}>
                <ThemedText size="xl" weight="bold" style={styles.title}>
                  {task.title}
                </ThemedText>
                <View style={[
                  styles.statusBadge,
                  { 
                    backgroundColor: task.completed 
                      ? theme.colors.success[50] 
                      : theme.colors.warning[50] 
                  }
                ]}>
                  <ThemedText 
                    size="xs" 
                    weight="semibold"
                    variant={task.completed ? 'success' : 'warning'}
                  >
                    {task.completed ? t('tasks.completed') : t('tasks.pending')}
                  </ThemedText>
                </View>
              </View>
              
              <View style={styles.actionButtons}>
                <Button
                  title={task.completed ? t('tasks.markIncomplete') : t('tasks.markComplete')}
                  onPress={handleToggleCompletion}
                  variant={task.completed ? 'secondary' : 'primary'}
                  style={styles.statusButton}
                />
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText size="lg" weight="semibold" style={styles.sectionTitle}>
                {t('tasks.description')}
              </ThemedText>
              <ThemedText variant="secondary" style={styles.description}>
                {task.description}
              </ThemedText>
            </View>

            <View style={[styles.metaSection, { backgroundColor: theme.colors.background.secondary }]}>
              <View style={styles.metaItem}>
                <ThemedText variant="secondary" size="sm" style={styles.metaLabel}>
                  {t('tasks.created')}
                </ThemedText>
                <ThemedText size="sm" style={styles.metaValue}>
                  {new Date(task.createdAt).toLocaleString()}
                </ThemedText>
              </View>
              
              <View style={styles.metaItem}>
                <ThemedText variant="secondary" size="sm" style={styles.metaLabel}>
                  {t('tasks.lastUpdated')}
                </ThemedText>
                <ThemedText size="sm" style={styles.metaValue}>
                  {new Date(task.updatedAt).toLocaleString()}
                </ThemedText>
              </View>
              
              <View style={styles.metaItem}>
                <ThemedText variant="secondary" size="sm" style={styles.metaLabel}>
                  {t('tasks.taskId')}
                </ThemedText>
                <ThemedText size="sm" style={styles.metaValue} numberOfLines={1} ellipsizeMode="middle">
                  {task.id}
                </ThemedText>
              </View>
            </View>

            <View style={styles.footerActions}>
              <Button
                title={t('tasks.editTask')}
                onPress={() => setEditing(true)}
                variant="secondary"
                style={styles.editButton}
              />
              
              <Button
                title={t('tasks.deleteTask')}
                onPress={handleDeleteTask}
                variant="secondary"
                style={styles.deleteButton}
              />
            </View>
          </ThemedCard>
        )}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
  },
  errorText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  card: {
    margin: 16,
  },
  editTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  taskHeader: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  title: {
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statusButton: {
    minWidth: 160,
    marginBottom: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  description: {
    lineHeight: 24,
  },
  metaSection: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaLabel: {
    width: 100,
  },
  metaValue: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  editButton: {
    flex: 1,
  },
  deleteButton: {
    flex: 1,
  },
});