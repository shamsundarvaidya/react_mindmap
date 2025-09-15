import type { PayloadAction } from "@reduxjs/toolkit";
import type { MindMapState, NodeData } from "../../types/mindmap";
import type { Node, NodeChange } from "@xyflow/react";
import { applyNodeChanges } from "@xyflow/react";

export function selectNodeInMap(state: MindMapState, action: PayloadAction<string>) {
  console.log("Selected node ID:", action.payload);
  state.selectedNodeId = action.payload;
}

export function applyNodeChangesAction(
  state: MindMapState,
  action: PayloadAction<NodeChange<Node<NodeData>>[]>
) {
  console.log("Applying node changes");
  state.nodes = applyNodeChanges<Node<NodeData>>(
    action.payload,
    state.nodes
  );
}


