import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface NoteIndicatorState {
  showNoteIndicator: boolean;
}

const initialState: NoteIndicatorState = {
  showNoteIndicator: true,
};

const noteIndicatorSlice = createSlice({
  name: 'noteIndicator',
  initialState,
  reducers: {
    setShowNoteIndicator(state, action: PayloadAction<boolean>) {
      state.showNoteIndicator = action.payload;
    },
  },
});

export const { setShowNoteIndicator } = noteIndicatorSlice.actions;
export default noteIndicatorSlice.reducer;
