import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import { useAuthContext as useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { Button } from '../components/sharedComponents/Button';
import { ThemedCard } from '../components/sharedComponents/ThemedCard';
import { ThemedText } from '../components/sharedComponents/ThemedText';
import { ThemedView } from '../components/sharedComponents/ThemedView';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../contexts/ThemeContext';
import { errorService } from '../services/errorService';
import { AppError } from '../types';
import { showAlert } from '../utils/alertHelper';

type ErrorsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export const ErrorsScreen: React.FC = () => {
  const [errors, setErrors] = useState<AppError[]>([]); 
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const { user, isAdmin } = useAuth();
  const navigation = useNavigation<ErrorsScreenNavigationProp>();
  const { t } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    if (!isAdmin) {
      navigation.navigate('Tasks');
      return;
    }
    loadErrors();
  }, [isAdmin, navigation]);

  const loadErrors = async () => {
    try {
      const errorLogs = await errorService.getStoredErrors();
      setErrors(errorLogs);
    } catch (error) {
      console.error('Failed to load errors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadErrors();
    setRefreshing(false);
  };

  const handleClearErrors = () => {
    showAlert(
      t('errors.clearErrors'),
      t('errors.clearConfirmation'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('errors.clear'),
          style: 'destructive',
          onPress: clearAllErrors,
        },
      ]
    );
  };

  const clearAllErrors = async () => {
    try {
      await errorService.clearErrors();
      setErrors([]);
      showAlert(t('common.success'), t('errors.clearedSuccess'));
    } catch (error) {
      showAlert(t('common.error'), t('errors.clearError'));
    }
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 500) return theme.colors.error[500];
    if (statusCode >= 400) return theme.colors.warning[500];
    return theme.colors.info[500];
  };

  const getStatusText = (statusCode: number) => {
    if (statusCode >= 500) return t('errors.serverError');
    if (statusCode >= 400) return t('errors.clientError');
    return t('errors.info');
  };

  const renderErrorItem = ({ item }: { item: AppError }) => (
    <ThemedCard style={styles.errorCard}>
      <View style={styles.errorHeader}>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: getStatusColor(item.statusCode) },
            ]}
          />
          <ThemedText size="sm" weight="semibold" style={styles.statusCode}>
            {item.statusCode}
          </ThemedText>
          <ThemedText variant="secondary" size="xs" style={styles.statusText}>
            {getStatusText(item.statusCode)}
          </ThemedText>
        </View>
        <ThemedText variant="tertiary" size="xs">
          {new Date(item.timestamp).toLocaleString()}
        </ThemedText>
      </View>
      
      <ThemedText style={styles.errorMessage}>
        {item.message}
      </ThemedText>
      
      <View style={[styles.errorMeta, { backgroundColor: theme.colors.background.secondary }]}>
        <View style={styles.metaItem}>
          <ThemedText variant="secondary" size="xs" style={styles.metaLabel}>
            {t('errors.route')}:
          </ThemedText>
          <ThemedText size="xs" style={styles.metaValue}>
            {item.route}
          </ThemedText>
        </View>
        <View style={styles.metaItem}>
          <ThemedText variant="secondary" size="xs" style={styles.metaLabel}>
            {t('errors.userId')}:
          </ThemedText>
          <ThemedText size="xs" style={styles.metaValue}>
            {item.userId}
          </ThemedText>
        </View>
      </View>
    </ThemedCard>
  );

  if (!isAdmin) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText variant="error" size="xl" weight="bold" style={styles.accessDeniedText}>
          {t('errors.accessDenied')}
        </ThemedText>
        <ThemedText variant="secondary" style={styles.accessDeniedSubtext}>
          {t('errors.adminOnly')}
        </ThemedText>
        <Button
          title={t('errors.goToTasks')}
          onPress={() => navigation.navigate('Tasks')}
          style={styles.backButton}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: theme.colors.background.primary }]}>
        <ThemedText size="xxxl" weight="bold">
          {t('errors.title')}
        </ThemedText>
        <ThemedText variant="secondary">
          {t('errors.totalErrors', { count: errors.length })}
        </ThemedText>
        
        {errors.length > 0 && (
          <Button
            title={t('errors.clearAll')}
            onPress={handleClearErrors}
            variant="secondary"
            style={styles.clearButton}
          />
        )}
      </View>

      <FlatList
        data={errors.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())}
        renderItem={renderErrorItem}
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
            <ThemedText variant="secondary" size="lg" style={styles.emptyText}>
              {t('errors.noErrors')}
            </ThemedText>
            <ThemedText variant="tertiary" style={styles.emptySubtext}>
              {t('errors.noErrorsDescription')}
            </ThemedText>
          </ThemedCard>
        }
        contentContainerStyle={styles.listContent}
      />
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
  accessDeniedText: {
    marginBottom: 8,
    textAlign: 'center',
  },
  accessDeniedSubtext: {
    marginBottom: 24,
    textAlign: 'center',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  clearButton: {
    alignSelf: 'flex-start',
  },
  listContent: {
    paddingBottom: 20,
  },
  errorCard: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  errorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusCode: {
    marginRight: 8,
  },
  statusText: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  errorMessage: {
    marginBottom: 12,
    lineHeight: 20,
  },
  errorMeta: {
    borderRadius: 6,
    padding: 12,
  },
  metaItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  metaLabel: {
    width: 60,
  },
  metaValue: {
    flex: 1,
  },
  emptyCard: {
    margin: 16,
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    textAlign: 'center',
  },
  backButton: {
    marginTop: 16,
  },
});