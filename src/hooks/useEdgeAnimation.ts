import { useAppDispatch, useAppSelector } from '../store';
import { setEdgesAnimated } from '../store/appSettingsSlice';

export function useEdgeAnimation() {
  const dispatch = useAppDispatch();
  const edgesAnimated = useAppSelector((s) => s.appSettings.edgesAnimated);

  const toggleEdgeAnimation = (enabled: boolean) => {
    dispatch(setEdgesAnimated(enabled));
  };

  return {
    edgesAnimated,
    toggleEdgeAnimation,
  };
}