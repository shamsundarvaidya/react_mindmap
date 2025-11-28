import type { PayloadAction } from '@reduxjs/toolkit';
import type { ThemeState } from '../themeSlice';
import { getThemeByName } from '../../constants/themes';

export function setThemeReducer(state: ThemeState, action: PayloadAction<string>) {
  const themeName = action.payload;
    state.selectedTheme = getThemeByName(themeName);
}