import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { THEME_OPTIONS } from '../constants/themes';

export interface ThemeState {
  selectedTheme: string;
  backgroundColor: string;
  edgesAnimated: boolean;
}

const initialState: ThemeState = {
  selectedTheme: THEME_OPTIONS[0].name, // Default to Pastel
  backgroundColor: THEME_OPTIONS[0].background,
  edgesAnimated: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      const themeName = action.payload;
      // Validate theme exists in THEME_OPTIONS
      const theme = THEME_OPTIONS.find(t => t.name === themeName);
      if (theme) {
        state.selectedTheme = themeName;
        state.backgroundColor = theme.background;
      }
    },
    setEdgesAnimated(state, action: PayloadAction<boolean>) {
      state.edgesAnimated = action.payload;
    },
  },
});

export const { setTheme, setEdgesAnimated } = themeSlice.actions;
export default themeSlice.reducer;
