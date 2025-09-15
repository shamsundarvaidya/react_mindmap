import type { PayloadAction } from "@reduxjs/toolkit";
import type { MindMapState, NodeData } from "../../types/mindmap";
import type { Node } from "@xyflow/react";

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
