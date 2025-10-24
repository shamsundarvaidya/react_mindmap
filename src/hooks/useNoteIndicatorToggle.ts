import { useAppDispatch, useAppSelector } from "../store";
import { setShowNoteIndicator } from "../store/appSettingsSlice";

export function useNoteIndicatorToggle() {
  const showNoteIndicator = useAppSelector((state) => state.appSettings.showNoteIndicator);
  const dispatch = useAppDispatch();

  const toggleNoteIndicator = (checked: boolean) => {
    dispatch(setShowNoteIndicator(checked));
  };

  return {
    showNoteIndicator,
    toggleNoteIndicator,
  };
}