import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<TabParamList>;
  TaskDetails: { taskId: string };
};

export type TabParamList = {
  Tasks: undefined;
  Errors: undefined;
  Profile: undefined;
  SignIn: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
};