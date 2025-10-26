import type { PayloadAction } from "@reduxjs/toolkit";
import type { MindMapState, NodeData } from "../../types/mindmap";
import type { Node, Edge } from "@xyflow/react";

export function deleteNodeAndDescendants(state: MindMapState, action: PayloadAction<string[]>) {
  const idsToDelete = new Set(action.payload);
  
  // Filter out nodes and edges with matching IDs
  state.nodes = state.nodes.filter((node: Node<NodeData>) => !idsToDelete.has(node.id));
  state.edges = state.edges.filter(
    (edge: Edge) => !idsToDelete.has(edge.source) && !idsToDelete.has(edge.target)
  );
  
  // Deselect if deleted
  if (state.selectedNodeId && idsToDelete.has(state.selectedNodeId)) {
    state.selectedNodeId = null;
  }
}
