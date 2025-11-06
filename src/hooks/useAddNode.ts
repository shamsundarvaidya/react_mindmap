import { useAppDispatch, useAppSelector } from "../store";
import { addNode, applyLayout } from "../store/mindmapSlice";
import { LAYOUT_TYPES } from "../constants/layouts";

/**
 * Custom hook for adding a child node to the currently selected node in the mind map.
 * 
 * @returns An object containing:
 * - `handleAddNode`: Function to add a new child node to the selected node
 * - `canAddNode`: Boolean indicating whether a node can be added (requires a selected node)
 */
export function useAddNode() {
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);

  const handleAddNode = () => {
    if (selectedNodeId) {
      dispatch(addNode());
      dispatch(applyLayout(LAYOUT_TYPES.NONE));
    }
  };

  return {
    handleAddNode,
    canAddNode: !!selectedNodeId,
  };
}