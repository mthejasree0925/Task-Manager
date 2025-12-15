import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import { ButtonProps } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemedText } from './ThemedText';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getButtonStyles = () => {
    if (disabled) {
      return {
        backgroundColor: theme.colors.button.disabled.background,
        borderColor: theme.colors.button.disabled.border,
      };
    }

    if (variant === 'primary') {
      return {
        backgroundColor: theme.colors.button.primary.background,
        borderColor: theme.colors.button.primary.border,
      };
    }

    return {
      backgroundColor: theme.colors.button.secondary.background,
      borderColor: theme.colors.button.secondary.border,
    };
  };

  const getTextColor = () => {
    if (disabled) {
      return 'disabled';
    }
    return variant === 'primary' ? 'inverse' : 'primary';
  };

  const buttonStyle = [
    styles.button,
    getButtonStyles(),
    disabled && styles.disabled,
    style,
  ];

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress} disabled={disabled} {...props}>
        <View style={buttonStyle}>
          <ThemedText
            variant={getTextColor()}
            weight="semibold"
            style={styles.text}
          >
            {title}
          </ThemedText>
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={buttonStyle} {...props}>
      <ThemedText
        variant={getTextColor()}
        weight="semibold"
        style={styles.text}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: Platform.OS === 'ios' ? 16 : 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
  },
});