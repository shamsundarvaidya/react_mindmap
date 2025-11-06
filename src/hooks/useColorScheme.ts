import { useAppDispatch, useAppSelector } from '../store';
import { setTheme } from '../store/themeSlice';
import { THEME_OPTIONS } from '../constants/themes';

// Define default theme constant
const DEFAULT_THEME = THEME_OPTIONS[0].name;

/**
 * Custom hook for managing the mind map theme (color scheme).
 * Provides functions to apply and reset themes.
 * 
 * @returns An object containing:
 * - `applyTheme`: Function to apply a theme by name
 * - `resetToDefaultTheme`: Function to reset to the default theme
 * - `currentTheme`: Currently selected theme name
 * - `availableThemes`: List of all available theme options
 * - `isDefaultTheme`: Whether the current theme is the default
 */
export function useColorScheme() {
  const dispatch = useAppDispatch();
  const selectedTheme = useAppSelector(state => state.theme.selectedTheme);

  const applyTheme = (themeName: string) => {
    // Validate theme exists
    const themeExists = THEME_OPTIONS.some(theme => theme.name === themeName);
    
    if (!themeExists) {
      console.warn(`Theme "${themeName}" not found. Using default theme.`);
      dispatch(setTheme(DEFAULT_THEME));
      return;
    }
    
    // Set the theme - nodes will re-render with new colors automatically
    dispatch(setTheme(themeName));
  };

  const resetToDefaultTheme = () => {
    // Reset to default theme - nodes will re-render with default colors
    dispatch(setTheme(DEFAULT_THEME));
  };

  return {
    applyTheme,
    resetToDefaultTheme,
    currentTheme: selectedTheme,
    availableThemes: THEME_OPTIONS,
    isDefaultTheme: selectedTheme === DEFAULT_THEME,
  };
}