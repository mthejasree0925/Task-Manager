import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../hooks/useAuth';
import { RootStackParamList, TabParamList } from './types';
import { ErrorsScreen } from '../screens/ErrorsScreen';
import { TasksScreen } from '../screens/TasksScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TaskDetailsScreen } from '../screens/TaskDetailsScreen';


const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Tab.Navigator>
        <Tab.Screen name="SignIn" component={SignInScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Tasks" component={TasksScreen} />
      {user.role === 'ROLE_ADMIN' && (
        <Tab.Screen name="Errors" component={ErrorsScreen} />
      )}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

