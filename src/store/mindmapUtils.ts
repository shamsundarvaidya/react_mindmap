import type { Edge } from "@xyflow/react";

/**
 * Finds all descendants (including the node itself) of a given node in the edge list.
 */
export function findAllDescendants(nodeId: string, edges: Edge[]): Set<string> {
  const descendants = new Set<string>();
  const queue = [nodeId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    descendants.add(current);
    const children = edges.filter((e) => e.source === current).map((e) => e.target);
    queue.push(...children);
  }

  return descendants;
}
