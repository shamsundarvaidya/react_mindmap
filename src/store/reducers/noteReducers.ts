import type { PayloadAction } from "@reduxjs/toolkit";
import type { MindMapState, NodeData } from "../../types/mindmap";
import type { Node } from "@xyflow/react";

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