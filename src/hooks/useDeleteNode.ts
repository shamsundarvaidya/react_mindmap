import { useAppDispatch, useAppSelector } from "../store";
import { deleteNode, applyLayout } from "../store/mindmapSlice";

export function useDeleteNode() {
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);
  const edges = useAppSelector((state) => state.mindmap.edges);

  const isRootNode = (id: string) => {
    return !edges.some((e) => e.target === id);
  };

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
      // Calculate descendants only when actually deleting
      const descendants = getNodeDescendants(selectedNodeId);
      dispatch(deleteNode(descendants));
      dispatch(applyLayout("None"));
    }
  };

  return {
    handleDeleteNode,
    canDeleteNode: !!selectedNodeId,
  };
}