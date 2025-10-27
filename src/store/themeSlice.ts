import { createSlice } from '@reduxjs/toolkit';
import { THEME_OPTIONS } from '../constants/themes';
import { setThemeReducer, setEdgesAnimatedReducer } from './reducers/themeReducers';

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
    setTheme: setThemeReducer,
    setEdgesAnimated: setEdgesAnimatedReducer,
  },
});

export const { setTheme, setEdgesAnimated } = themeSlice.actions;
export default themeSlice.reducer;
