import type { PayloadAction } from "@reduxjs/toolkit";
import type { MindMapState } from "../../types/mindmap";
import { findAllDescendants } from "../mindmapUtils";

export function deleteNodeAndDescendants(state: MindMapState, action: PayloadAction<string>) {
  const idToDelete = action.payload;
  const descendants = findAllDescendants(idToDelete, state.edges);
  // Filter out nodes and edges with matching IDs
  state.nodes = state.nodes.filter((node: any) => !descendants.has(node.id));
  state.edges = state.edges.filter(
    (edge: any) => !descendants.has(edge.source) && !descendants.has(edge.target)
  );
  // Deselect if deleted
  if (descendants.has(state.selectedNodeId!)) {
    state.selectedNodeId = null;
  }
}
