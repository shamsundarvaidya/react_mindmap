import { useAppDispatch, useAppSelector } from '../store';
import { setEdgesAnimated } from '../store/themeSlice';

export function useEdgeAnimation() {
  const dispatch = useAppDispatch();
  const edgesAnimated = useAppSelector((s) => s.theme.edgesAnimated);

  const toggleEdgeAnimation = (enabled: boolean) => {
    dispatch(setEdgesAnimated(enabled));
  };

  return {
    edgesAnimated,
    toggleEdgeAnimation,
  };
}