import { useAppDispatch } from '../store';
import { setCanvasBg } from '../store/appSettingsSlice';

export function useCanvasBackground() {
  const dispatch = useAppDispatch();

  const setBackground = (color: string) => {
    dispatch(setCanvasBg(color));
  };

  return {
    setBackground,
  };
}