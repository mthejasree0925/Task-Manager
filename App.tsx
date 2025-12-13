import React from 'react';
import { StatusBar } from "react-native";
import { AuthProvider } from './src/contexts/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
const App = () => {
    return (
        <AuthProvider>
            <AppNavigator />
            <StatusBar style="auto" />
        </AuthProvider>

    );
};

export default App;