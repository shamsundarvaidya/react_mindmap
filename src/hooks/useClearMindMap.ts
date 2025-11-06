import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { clear } from "../store/mindmapSlice";

/**
 * Custom hook for clearing the entire mind map.
 * Provides dialog state management for confirmation.
 * 
 * @returns An object containing:
 * - `isDialogOpen`: Boolean state for the confirmation dialog
 * - `openDialog`: Function to open the confirmation dialog
 * - `closeDialog`: Function to close the confirmation dialog
 * - `confirmClear`: Function to execute the clear action
 * - `canClear`: Boolean indicating if there's content to clear
 */
export function useClearMindMap() {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state) => state.mindmap.nodes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    if (nodes.length > 0) {
      setIsDialogOpen(true);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const confirmClear = () => {
    dispatch(clear());
    closeDialog();
  };

  return {
    isDialogOpen,
    openDialog,
    closeDialog,
    confirmClear,
    canClear: nodes.length > 0,
  };
}