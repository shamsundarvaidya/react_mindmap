import { useAppDispatch, useAppSelector } from "../store";
import { setShowNoteIndicator } from "../store/noteIndicatorSlice";

export function useNoteIndicatorToggle() {
  const showNoteIndicator = useAppSelector((state) => state.noteIndicator.showNoteIndicator);
  const dispatch = useAppDispatch();

  const toggleNoteIndicator = (checked: boolean) => {
    dispatch(setShowNoteIndicator(checked));
  };

  return {
    showNoteIndicator,
    toggleNoteIndicator,
  };
}