import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { updateColor } from '../store/mindmapSlice';
import { applyColorScheme, setColorScheme } from '../store/appSettingsSlice';

export function useColorScheme() {
  const dispatch = useAppDispatch();
  const { edges, nodes } = useAppSelector((s) => s.mindmap);
  const { colorScheme } = useAppSelector((s) => s.appSettings);

  const applyScheme = (schemeName: string) => {
    dispatch(applyColorScheme(schemeName));
  };

  const resetColors = () => {
    nodes.forEach((n) => dispatch(updateColor({ id: n.id, color: '#D3D3D3' })));
    dispatch(setColorScheme(null));
  };

  // Re-apply scheme when graph size changes so new nodes adopt colors
  useEffect(() => {
    if (colorScheme) {
      dispatch(applyColorScheme(colorScheme));
    }
     
  }, [nodes.length, edges.length, colorScheme, dispatch]);

  return {
    applyScheme,
    resetColors,
    currentColorScheme: colorScheme,
  };
}