import type { PayloadAction } from "@reduxjs/toolkit";
import type { MindMapState, NodeData } from "../../types/mindmap";
import type { Node } from "@xyflow/react";
import { getHiddenNodeIds } from "../mindmapUtils";

export function updateNodeLabel(
  state: MindMapState,
  action: PayloadAction<{ id: string; label: string }>
) {
  const { id, label } = action.payload;
  const node = state.nodes.find((n: Node<NodeData>) => n.id === id);
  if (node) {
    node.data.label = label;
  }
}

export function updateNodeColor(
  state: MindMapState,
  action: PayloadAction<{ id: string; color: string }>
) {
  
  const node = state.nodes.find((n: Node<NodeData>) => n.id === action.payload.id);
  if (node) {
    node.data = {
      ...node.data,
      color: action.payload.color,
    };
  }
}

type UpdateNodeNotePayload = { nodeId: string; note: string };

export function updateNodeNote(
  state: MindMapState,
  action: PayloadAction<UpdateNodeNotePayload>
){
  const { nodeId, note } = action.payload;
  const node = state.nodes.find((n: Node<NodeData>) => n.id === nodeId);
  if (node) {
    node.data.note = note
  }
}

// NEW: toggle collapse
export function toggleNodeCollapse(
  state: MindMapState,
  action: PayloadAction<string>
) {
  const id = action.payload;
  const node = state.nodes.find((n: Node<NodeData>) => n.id === id);
  if (!node) return;

  const next = !node.data?.collapsed;
  node.data = { ...node.data, collapsed: next };

  // If collapsing hides the currently selected node, reselect the toggled node
  if (next) {
    const hidden = getHiddenNodeIds(state.nodes as any, state.edges);
    if (state.selectedNodeId && hidden.has(state.selectedNodeId)) {
      state.selectedNodeId = id;
    }
  }
}
