import { createSlice } from '@reduxjs/toolkit';
import { setShowNoteIndicatorReducer } from './reducers/noteIndicatorReducers';

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
    setShowNoteIndicator: setShowNoteIndicatorReducer,
  },
});

export const { setShowNoteIndicator } = noteIndicatorSlice.actions;
export default noteIndicatorSlice.reducer;
