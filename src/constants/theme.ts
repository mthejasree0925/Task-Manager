import { colors, commonColors } from './colors';

// Light theme
export const lightTheme = {
  colors: {
    // Background colors
    background: {
      primary: commonColors.white,
      secondary: colors.neutral[50],
      tertiary: colors.neutral[100],
      inverse: colors.neutral[900],
    },

    // Surface colors
    surface: {
      primary: commonColors.white,
      secondary: colors.neutral[50],
      tertiary: colors.neutral[100],
      card: commonColors.white,
      cardElevated: commonColors.white,
    },

    // Text colors
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[700],
      tertiary: colors.neutral[600],
      disabled: colors.neutral[500],
      inverse: commonColors.white,
      error: colors.error[500],
      success: colors.success[500],
      warning: colors.warning[700],
    },

    // Border colors
    border: {
      primary: colors.neutral[300],
      secondary: colors.neutral[200],
      focused: colors.primary[500],
      error: colors.error[500],
    },

    // Icon colors
    icon: {
      primary: colors.neutral[700],
      secondary: colors.neutral[600],
      disabled: colors.neutral[500],
      inverse: commonColors.white,
      error: colors.error[500],
      success: colors.success[500],
    },

    // Button colors
    button: {
      primary: {
        background: colors.primary[500],
        text: commonColors.white,
        border: colors.primary[500],
      },
      secondary: {
        background: commonColors.transparent,
        text: colors.primary[500],
        border: colors.primary[500],
      },
      disabled: {
        background: colors.neutral[300],
        text: colors.neutral[500],
        border: colors.neutral[300],
      },
    },

    // Status colors
    status: {
      success: colors.success[500],
      warning: colors.warning[500],
      error: colors.error[500],
      info: colors.info[500],
    },

    // Common colors
    common: commonColors,
    ...colors,
  },

  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  // Border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
  },

  // Typography
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  // Shadows
  shadows: {
    sm: {
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// Dark theme
export const darkTheme: typeof lightTheme = {
  ...lightTheme,
  colors: {
    // Background colors
    background: {
      primary: colors.neutral[900],
      secondary: colors.neutral[800],
      tertiary: colors.neutral[700],
      inverse: commonColors.white,
    },

    // Surface colors
    surface: {
      primary: colors.neutral[800],
      secondary: colors.neutral[700],
      tertiary: colors.neutral[600],
      card: colors.neutral[800],
      cardElevated: colors.neutral[700],
    },

    // Text colors
    text: {
      primary: commonColors.white,
      secondary: colors.neutral[300],
      tertiary: colors.neutral[400],
      disabled: colors.neutral[500],
      inverse: colors.neutral[900],
      error: colors.error[400],
      success: colors.success[400],
      warning: colors.warning[400],
    },

    // Border colors
    border: {
      primary: colors.neutral[600],
      secondary: colors.neutral[700],
      focused: colors.primary[400],
      error: colors.error[400],
    },

    // Icon colors
    icon: {
      primary: colors.neutral[300],
      secondary: colors.neutral[400],
      disabled: colors.neutral[500],
      inverse: colors.neutral[900],
      error: colors.error[400],
      success: colors.success[400],
    },

    // Button colors
    button: {
      primary: {
        background: colors.primary[400],
        text: colors.neutral[900],
        border: colors.primary[400],
      },
      secondary: {
        background: commonColors.transparent,
        text: colors.primary[400],
        border: colors.primary[400],
      },
      disabled: {
        background: colors.neutral[600],
        text: colors.neutral[500],
        border: colors.neutral[600],
      },
    },

    // Status colors
    status: {
      success: colors.success[400],
      warning: colors.warning[400],
      error: colors.error[400],
      info: colors.info[400],
    },

    // Common colors
    common: commonColors,
    ...colors,
  },
};

export type Theme = typeof lightTheme;
export type ThemeMode = 'light' | 'dark';