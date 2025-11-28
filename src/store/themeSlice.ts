import { createSlice } from '@reduxjs/toolkit';
import { setThemeReducer } from './reducers/themeReducers';
import  { type ColorScheme, getDefaultTheme } from '../constants/themes';

export interface ThemeState {
  selectedTheme: ColorScheme;
}

const initialState: ThemeState = {
  selectedTheme: getDefaultTheme(), // Default to Light
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
