import type { PayloadAction } from '@reduxjs/toolkit';
import type { ThemeState } from '../themeSlice';
import { getThemeByName } from '../../constants/themes';

export function setThemeReducer(state: ThemeState, action: PayloadAction<string>) {
  const themeName = action.payload;
  console.log("Theme selected", themeName);
    state.selectedTheme = getThemeByName(themeName);
}