import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuthContext as useAuth } from '../contexts/AuthContext';
import { Button } from '../components/sharedComponents/Button';
import { useTranslation } from '../hooks/useTranslation';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useTheme } from '../contexts/ThemeContext';
import { ThemedText } from '../components/sharedComponents/ThemedText';
import { ThemedCard } from '../components/sharedComponents/ThemedCard';
import { ThemedView } from '../components/sharedComponents/ThemedView';
import { showAlert } from '../utils/alertHelper';

export const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useTranslation();
  const { handleError } = useErrorHandler();
  const { theme } = useTheme();

  const handleSignIn = async () => {
    if (!email || !password) {
      showAlert(t('common.error'), t('auth.fillAllFields'));
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error: any) {
      handleError(error, 'SignInScreen');
      showAlert(
        t('auth.signIn'),
        error.message || t('auth.invalidCredentials')
      );
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = {
    admin: { email: 'admin@taskmanager.com', password: 'admin123' },
    user: { email: 'user@taskmanager.com', password: 'user123' },
  };

  const fillDemoCredentials = (role: 'admin' | 'user') => {
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <ThemedText size="xxxl" weight="bold" style={styles.title}>
              {t('auth.appName')}
            </ThemedText>

            <ThemedCard elevated style={styles.card}>
              <ThemedText size="xl" weight="semibold" style={styles.subtitle}>
                {t('auth.signIn')}
              </ThemedText>

              <TextInput
                style={styles.input}
                placeholder={t('auth.email')}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />

              <TextInput
                style={styles.input}
                placeholder={t('auth.password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
              />

              <Button
                title={loading ? t('common.loading') : t('auth.signIn')}
                onPress={handleSignIn}
                disabled={loading}
                style={styles.signInButton}
              />

              <View style={styles.demoSection}>
                <ThemedText variant="secondary" style={styles.demoTitle}>
                  {t('auth.demoCredentials')}
                </ThemedText>

                <Button
                  title={t('auth.useAdminAccount')}
                  onPress={() => fillDemoCredentials('admin')}
                  variant="secondary"
                  style={styles.demoButton}
                  disabled={loading}
                />

                <Button
                  title={t('auth.useMemberAccount')}
                  onPress={() => fillDemoCredentials('user')}
                  variant="secondary"
                  style={styles.demoButton}
                  disabled={loading}
                />
              </View>
            </ThemedCard>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginHorizontal: 0,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 16 : 12,
    fontSize: 16,
    marginBottom: 16,
  },
  signInButton: {
    marginTop: 8,
  },
  demoSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  demoButton: {
    marginBottom: 8,
  },
});