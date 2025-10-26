import { useAppDispatch, useAppSelector } from '../store';
import { setTheme } from '../store/themeSlice';
import { THEME_OPTIONS } from '../constants/themes';

export function useColorScheme() {
  const dispatch = useAppDispatch();
  const selectedTheme = useAppSelector(state => state.theme.selectedTheme);

  const applyScheme = (schemeName: string) => {
    // Simply set the theme - nodes will re-render with new colors automatically
    dispatch(setTheme(schemeName));
  };

  const resetColors = () => {
    // Reset to default theme - nodes will re-render with default colors
    dispatch(setTheme(THEME_OPTIONS[0].name));
  };

  return {
    applyScheme,
    resetColors,
    currentColorScheme: selectedTheme,
  };
}