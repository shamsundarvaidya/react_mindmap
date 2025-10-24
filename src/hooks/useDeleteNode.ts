import { useAppDispatch, useAppSelector } from "../store";
import { deleteNode, applyLayout } from "../store/mindmapSlice";

export function useDeleteNode() {
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);
  const edges = useAppSelector((state) => state.mindmap.edges);

  const isRootNode = (id: string) => {
    return !edges.some((e) => e.target === id);
  };

  const handleDeleteNode = () => {
    if (!selectedNodeId) return;
    
    if (isRootNode(selectedNodeId)) {
      alert("Cannot delete the root node.");
      return;
    }
    
    const confirmed = window.confirm(
      "Are you sure you want to delete this node and all its children?"
    );
    
    if (confirmed) {
      dispatch(deleteNode(selectedNodeId));
      dispatch(applyLayout("None"));
    }
  };

  return {
    handleDeleteNode,
    selectedNodeId,
    canDeleteNode: !!selectedNodeId,
    isRootSelected: selectedNodeId ? isRootNode(selectedNodeId) : false,
  };
}