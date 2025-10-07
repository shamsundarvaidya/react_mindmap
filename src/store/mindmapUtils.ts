import type { Node, Edge } from "@xyflow/react";
import type { NodeData } from "../types/mindmap";

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

// NEW: compute hidden node ids based on collapsed nodes
export function getHiddenNodeIds(
  nodes: Node<NodeData>[],
  edges: Edge[],
): Set<string> {
  const hidden = new Set<string>();
  const collapsedIds = nodes.filter(n => n.data?.collapsed).map(n => n.id);

  for (const cid of collapsedIds) {
    const all = findAllDescendants(cid, edges);
    all.delete(cid); // do not hide the collapsed node itself
    for (const id of all) hidden.add(id);
  }
  return hidden;
}

// NEW: filter nodes/edges to visible ones
export function filterVisibleGraph(
  nodes: Node<NodeData>[],
  edges: Edge[],
): { nodes: Node<NodeData>[]; edges: Edge[]; hiddenIds: Set<string> } {
  const hiddenIds = getHiddenNodeIds(nodes, edges);
  const vNodes = nodes.filter(n => !hiddenIds.has(n.id));
  const vNodeIds = new Set(vNodes.map(n => n.id));
  const vEdges = edges.filter(e => vNodeIds.has(e.source) && vNodeIds.has(e.target));
  return { nodes: vNodes, edges: vEdges, hiddenIds };
}
