/**
 * Material Design 3 (Material You) Theme Configuration
 * Based on Google's latest design system
 */

export const materialTheme = {
  // Primary color palette (Dynamic, can be generated from user preference)
  primary: {
    main: '#6750A4',
    container: '#EADDFF',
    onPrimary: '#FFFFFF',
    onContainer: '#21005D',
  },
  secondary: {
    main: '#625B71',
    container: '#E8DEF8',
    onSecondary: '#FFFFFF',
    onContainer: '#1D192B',
  },
  tertiary: {
    main: '#7D5260',
    container: '#FFD8E4',
    onTertiary: '#FFFFFF',
    onContainer: '#31111D',
  },
  error: {
    main: '#B3261E',
    container: '#F9DEDC',
    onError: '#FFFFFF',
    onContainer: '#410E0B',
  },
  success: {
    main: '#2E7D32',
    container: '#C8E6C9',
    onSuccess: '#FFFFFF',
    onContainer: '#1B5E20',
  },
  warning: {
    main: '#F57C00',
    container: '#FFE0B2',
    onWarning: '#FFFFFF',
    onContainer: '#E65100',
  },
  // Surface colors
  surface: {
    dim: '#DED8E1',
    main: '#FEF7FF',
    bright: '#FEF7FF',
    containerLowest: '#FFFFFF',
    containerLow: '#F7F2FA',
    container: '#F3EDF7',
    containerHigh: '#ECE6F0',
    containerHighest: '#E6E0E9',
  },
  // Outline colors
  outline: {
    main: '#79747E',
    variant: '#CAC4D0',
  },
  // Elevation & shadows (Material 3 uses tonal elevation)
  elevation: {
    level0: '0px 0px 0px 0px rgba(0, 0, 0, 0)',
    level1: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
    level2: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
    level3: '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
    level4: '0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
    level5: '0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
  },
  // Typography scale (Material 3)
  typography: {
    displayLarge: {
      fontSize: '57px',
      lineHeight: '64px',
      fontWeight: 400,
      letterSpacing: '-0.25px',
    },
    displayMedium: {
      fontSize: '45px',
      lineHeight: '52px',
      fontWeight: 400,
      letterSpacing: '0px',
    },
    displaySmall: {
      fontSize: '36px',
      lineHeight: '44px',
      fontWeight: 400,
      letterSpacing: '0px',
    },
    headlineLarge: {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: 400,
      letterSpacing: '0px',
    },
    headlineMedium: {
      fontSize: '28px',
      lineHeight: '36px',
      fontWeight: 400,
      letterSpacing: '0px',
    },
    headlineSmall: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 400,
      letterSpacing: '0px',
    },
    titleLarge: {
      fontSize: '22px',
      lineHeight: '28px',
      fontWeight: 400,
      letterSpacing: '0px',
    },
    titleMedium: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 500,
      letterSpacing: '0.15px',
    },
    titleSmall: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
      letterSpacing: '0.1px',
    },
    bodyLarge: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 400,
      letterSpacing: '0.5px',
    },
    bodyMedium: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
      letterSpacing: '0.25px',
    },
    bodySmall: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
      letterSpacing: '0.4px',
    },
    labelLarge: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
      letterSpacing: '0.1px',
    },
    labelMedium: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
    labelSmall: {
      fontSize: '11px',
      lineHeight: '16px',
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
  },
  // Shape (Material 3 uses more rounded corners)
  shape: {
    none: '0px',
    extraSmall: '4px',
    small: '8px',
    medium: '12px',
    large: '16px',
    extraLarge: '28px',
    full: '9999px',
  },
  // State layers (for hover, focus, pressed states)
  stateLayer: {
    hover: 'rgba(0, 0, 0, 0.08)',
    focus: 'rgba(0, 0, 0, 0.12)',
    pressed: 'rgba(0, 0, 0, 0.12)',
    dragged: 'rgba(0, 0, 0, 0.16)',
  },
};

// Dark theme variant
export const materialThemeDark = {
  primary: {
    main: '#D0BCFF',
    container: '#4F378B',
    onPrimary: '#371E73',
    onContainer: '#EADDFF',
  },
  secondary: {
    main: '#CCC2DC',
    container: '#4A4458',
    onSecondary: '#332D41',
    onContainer: '#E8DEF8',
  },
  tertiary: {
    main: '#EFB8C8',
    container: '#633B48',
    onTertiary: '#492532',
    onContainer: '#FFD8E4',
  },
  error: {
    main: '#F2B8B5',
    container: '#8C1D18',
    onError: '#601410',
    onContainer: '#F9DEDC',
  },
  success: {
    main: '#81C784',
    container: '#1B5E20',
    onSuccess: '#003300',
    onContainer: '#C8E6C9',
  },
  warning: {
    main: '#FFB74D',
    container: '#E65100',
    onWarning: '#4E2600',
    onContainer: '#FFE0B2',
  },
  surface: {
    dim: '#141218',
    main: '#141218',
    bright: '#3B383E',
    containerLowest: '#0F0D13',
    containerLow: '#1D1B20',
    container: '#211F26',
    containerHigh: '#2B2930',
    containerHighest: '#36343B',
  },
  outline: {
    main: '#938F99',
    variant: '#49454F',
  },
  elevation: {
    level0: '0px 0px 0px 0px rgba(0, 0, 0, 0)',
    level1: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
    level2: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
    level3: '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
    level4: '0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
    level5: '0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
  },
  stateLayer: {
    hover: 'rgba(255, 255, 255, 0.08)',
    focus: 'rgba(255, 255, 255, 0.12)',
    pressed: 'rgba(255, 255, 255, 0.12)',
    dragged: 'rgba(255, 255, 255, 0.16)',
  },
};

// Helper function to generate CSS variables
export const generateCSSVariables = (theme: typeof materialTheme, isDark = false) => {
  return `
    --md-sys-color-primary: ${theme.primary.main};
    --md-sys-color-primary-container: ${theme.primary.container};
    --md-sys-color-on-primary: ${theme.primary.onPrimary};
    --md-sys-color-on-primary-container: ${theme.primary.onContainer};
    
    --md-sys-color-secondary: ${theme.secondary.main};
    --md-sys-color-secondary-container: ${theme.secondary.container};
    --md-sys-color-on-secondary: ${theme.secondary.onSecondary};
    --md-sys-color-on-secondary-container: ${theme.secondary.onContainer};
    
    --md-sys-color-tertiary: ${theme.tertiary.main};
    --md-sys-color-tertiary-container: ${theme.tertiary.container};
    --md-sys-color-on-tertiary: ${theme.tertiary.onTertiary};
    --md-sys-color-on-tertiary-container: ${theme.tertiary.onContainer};
    
    --md-sys-color-error: ${theme.error.main};
    --md-sys-color-error-container: ${theme.error.container};
    --md-sys-color-on-error: ${theme.error.onError};
    --md-sys-color-on-error-container: ${theme.error.onContainer};
    
    --md-sys-color-surface: ${theme.surface.main};
    --md-sys-color-surface-dim: ${theme.surface.dim};
    --md-sys-color-surface-bright: ${theme.surface.bright};
    --md-sys-color-surface-container-lowest: ${theme.surface.containerLowest};
    --md-sys-color-surface-container-low: ${theme.surface.containerLow};
    --md-sys-color-surface-container: ${theme.surface.container};
    --md-sys-color-surface-container-high: ${theme.surface.containerHigh};
    --md-sys-color-surface-container-highest: ${theme.surface.containerHighest};
    
    --md-sys-color-outline: ${theme.outline.main};
    --md-sys-color-outline-variant: ${theme.outline.variant};
    
    --md-sys-elevation-level0: ${theme.elevation.level0};
    --md-sys-elevation-level1: ${theme.elevation.level1};
    --md-sys-elevation-level2: ${theme.elevation.level2};
    --md-sys-elevation-level3: ${theme.elevation.level3};
    --md-sys-elevation-level4: ${theme.elevation.level4};
    --md-sys-elevation-level5: ${theme.elevation.level5};
    
    --md-sys-shape-corner-none: ${theme.shape.none};
    --md-sys-shape-corner-extra-small: ${theme.shape.extraSmall};
    --md-sys-shape-corner-small: ${theme.shape.small};
    --md-sys-shape-corner-medium: ${theme.shape.medium};
    --md-sys-shape-corner-large: ${theme.shape.large};
    --md-sys-shape-corner-extra-large: ${theme.shape.extraLarge};
    --md-sys-shape-corner-full: ${theme.shape.full};
  `;
};
