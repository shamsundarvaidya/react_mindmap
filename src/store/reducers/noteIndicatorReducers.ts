import type { PayloadAction } from '@reduxjs/toolkit';
import type { NoteIndicatorState } from '../noteIndicatorSlice';

export function setShowNoteIndicatorReducer(state: NoteIndicatorState, action: PayloadAction<boolean>) {
  state.showNoteIndicator = action.payload;
}