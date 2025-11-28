import type { Node, Edge } from "@xyflow/react";
import type { NodeData } from "../types/mindmap";

// Return all nodes and edges
export function filterVisibleGraph(
  nodes: Node<NodeData>[],
  edges: Edge[],
): { nodes: Node<NodeData>[]; edges: Edge[] } {
  return { nodes, edges };
}
