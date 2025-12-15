import React from 'react';
import { StatusBar } from "react-native";
import { AuthProvider } from './src/contexts/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { LocalizationProvider } from './src/contexts/LocalizationContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
    return (
       <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <LocalizationProvider>
            <AuthProvider>
              <AppNavigator />
              <StatusBar style="auto" />
            </AuthProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
    );
};

export default App;