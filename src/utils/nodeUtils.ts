import type { Edge } from '@xyflow/react';

/**
 * Get all descendants of a node (excluding the node itself)
 * Used to calculate hidden node count for collapsed nodes
 * @param nodeId - The ID of the node
 * @param edges - The edges array from the graph
 * @returns Set of descendant node IDs (excluding the node itself)
 */
export function getNodeChildren(nodeId: string, edges: Edge[]): Set<string> {
  // Find all descendants using BFS
  const descendants = new Set<string>();
  const queue = [nodeId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    descendants.add(current);
    const children = edges.filter((e) => e.source === current).map((e) => e.target);
    queue.push(...children);
  }
  
  // Remove the node itself, return only children
  descendants.delete(nodeId);
  return descendants;
}
