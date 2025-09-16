import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AppSettingsState {
  showNoteIndicator: boolean;
}

const initialState: AppSettingsState = {
  showNoteIndicator: true,
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setShowNoteIndicator(state, action: PayloadAction<boolean>) {
      state.showNoteIndicator = action.payload;
    },
  },
});

export const { setShowNoteIndicator } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
