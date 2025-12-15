import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemedTextProps extends TextProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'error' | 'success' | 'warning';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  children?: React.ReactNode;
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  variant = 'primary',
  size = 'md',
  weight = 'regular',
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getTextColor = () => {
    switch (variant) {
      case 'secondary':
        return theme.colors.text.secondary;
      case 'tertiary':
        return theme.colors.text.tertiary;
      case 'inverse':
        return theme.colors.text.inverse;
      case 'error':
        return theme.colors.text.error;
      case 'success':
        return theme.colors.text.success;
      case 'warning':
        return theme.colors.text.warning;
      default:
        return theme.colors.text.primary;
    }
  };

  const textStyle = {
    color: getTextColor(),
    fontSize: theme.typography.sizes[size],
    fontWeight: theme.typography.weights[weight],
  };

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
};