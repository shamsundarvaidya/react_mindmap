import { createSlice } from '@reduxjs/toolkit';
import { THEME_OPTIONS } from '../constants/themes';
import { setThemeReducer } from './reducers/themeReducers';

export interface ThemeState {
  selectedTheme: string;
  backgroundColor: string;
}

const initialState: ThemeState = {
  selectedTheme: THEME_OPTIONS[0].name, // Default to Pastel
  backgroundColor: THEME_OPTIONS[0].background,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: setThemeReducer,
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
