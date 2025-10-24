import { useAppDispatch, useAppSelector } from "../store";
import { addNode, applyLayout } from "../store/mindmapSlice";

export function useAddNode() {
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);

  const handleAddNode = () => {
    if (selectedNodeId) {
      dispatch(addNode());
      dispatch(applyLayout("None"));
    }
  };

  return {
    handleAddNode,
    selectedNodeId,
    canAddNode: !!selectedNodeId,
  };
}