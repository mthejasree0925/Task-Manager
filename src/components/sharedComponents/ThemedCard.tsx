import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemedCardProps {
  children: React.ReactNode;
  elevated?: boolean;
  style?: any;
}

export const ThemedCard: React.FC<ThemedCardProps> = ({
  children,
  elevated = false,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: elevated 
            ? theme.colors.surface.cardElevated 
            : theme.colors.surface.card,
          borderRadius: theme.borderRadius.md,
          ...(elevated ? theme.shadows.md : theme.shadows.sm),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});