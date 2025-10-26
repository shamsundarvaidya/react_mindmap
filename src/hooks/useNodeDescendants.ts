import { useMemo } from 'react';
import { useAppSelector } from '../store';

/**
 * Hook to find all descendants of a given node
 * @param nodeId - The ID of the node to find descendants for
 * @returns Set of descendant node IDs (including the node itself)
 */
export function useNodeDescendants(nodeId: string): Set<string> {
  const edges = useAppSelector((state) => state.mindmap.edges);

  return useMemo(() => {
    const descendants = new Set<string>();
    const queue = [nodeId];

    while (queue.length > 0) {
      const current = queue.shift()!;
      descendants.add(current);
      const children = edges.filter((e) => e.source === current).map((e) => e.target);
      queue.push(...children);
    }

    return descendants;
  }, [nodeId, edges]);
}

/**
 * Hook to get all descendants of a node (excluding the node itself)
 * @param nodeId - The ID of the node
 * @returns Set of descendant node IDs (excluding the node itself)
 */
export function useNodeChildren(nodeId: string): Set<string> {
  const allDescendants = useNodeDescendants(nodeId);
  
  return useMemo(() => {
    const children = new Set(allDescendants);
    children.delete(nodeId);
    return children;
  }, [allDescendants, nodeId]);
}
