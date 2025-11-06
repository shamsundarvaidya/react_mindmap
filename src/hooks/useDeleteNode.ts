import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { deleteNode, applyLayout } from "../store/mindmapSlice";
import { LAYOUT_TYPES } from "../constants/layouts";

/**
 * Custom hook for deleting nodes from the mind map.
 * Provides dialog state management and validation for node deletion.
 * Prevents deletion of root nodes and handles descendant cleanup.
 * 
 * @returns An object containing:
 * - `isDialogOpen`: Boolean state for the confirmation dialog
 * - `openDialog`: Function to open the confirmation dialog
 * - `closeDialog`: Function to close the confirmation dialog
 * - `confirmDelete`: Function to execute the delete action
 * - `canDelete`: Boolean indicating if selected node can be deleted
 * - `isRootSelected`: Boolean indicating if root node is selected
 * - `childrenCount`: Number of children that will be deleted (excluding the node itself)
 */
export function useDeleteNode() {
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);
  const edges = useAppSelector((state) => state.mindmap.edges);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /**
   * Check if a node is the root node (has no incoming edges)
   */
  const isRootNode = (id: string): boolean => {
    return !edges.some((e) => e.target === id);
  };

  /**
   * Get all descendants of a node (including the node itself)
   */
  const getNodeDescendants = (nodeId: string): string[] => {
    const descendants = new Set<string>();
    const queue = [nodeId];

    while (queue.length > 0) {
      const current = queue.shift()!;
      descendants.add(current);
      const children = edges.filter((e) => e.source === current).map((e) => e.target);
      queue.push(...children);
    }

    return Array.from(descendants);
  };

  // Calculate state values
  const isRootSelected = selectedNodeId ? isRootNode(selectedNodeId) : false;
  const canDelete = !!selectedNodeId && !isRootSelected;
  const descendantIds = selectedNodeId ? getNodeDescendants(selectedNodeId) : [];
  const childrenCount = descendantIds.length - 1; // Exclude the node itself

  const openDialog = () => {
    if (canDelete) {
      setIsDialogOpen(true);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const confirmDelete = () => {
    if (selectedNodeId && canDelete) {
      dispatch(deleteNode(descendantIds));
      dispatch(applyLayout(LAYOUT_TYPES.NONE));
      closeDialog();
    }
  };

  return {
    isDialogOpen,
    openDialog,
    closeDialog,
    confirmDelete,
    canDelete,
    isRootSelected,
    childrenCount,
  };
}