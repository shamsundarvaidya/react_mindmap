import { useCallback } from 'react';
import { useAppDispatch } from '../store';
import { toggleCollapse, applyLayout } from '../store/mindmapSlice';

/**
 * Hook to handle node collapse/expand with automatic layout update
 * Provides smooth, reactive collapse/expand behavior
 */
export function useToggleCollapse() {
  const dispatch = useAppDispatch();

  const handleToggleCollapse = useCallback((nodeId: string) => {
    // Toggle the collapse state
    dispatch(toggleCollapse(nodeId));
    
    // Automatically reapply layout to adjust positions
    // Using requestAnimationFrame ensures layout happens after state update
    // This creates a smooth, single-frame transition
    requestAnimationFrame(() => {
      dispatch(applyLayout("None"));
    });
  }, [dispatch]);

  return { handleToggleCollapse };
}
