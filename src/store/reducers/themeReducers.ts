import type { PayloadAction } from '@reduxjs/toolkit';
import type { ThemeState } from '../themeSlice';
import { THEME_OPTIONS } from '../../constants/themes';

export function setThemeReducer(state: ThemeState, action: PayloadAction<string>) {
  const themeName = action.payload;
  // Validate theme exists in THEME_OPTIONS
  const theme = THEME_OPTIONS.find(t => t.name === themeName);
  if (theme) {
    state.selectedTheme = themeName;
    state.backgroundColor = theme.background;
  }
}

export function setEdgesAnimatedReducer(state: ThemeState, action: PayloadAction<boolean>) {
  state.edgesAnimated = action.payload;
}