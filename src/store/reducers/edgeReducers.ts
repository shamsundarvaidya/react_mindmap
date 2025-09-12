import type { PayloadAction } from "@reduxjs/toolkit";
import type { MindMapState } from "../../types/mindmap";
import type { EdgeChange } from "@xyflow/react";
import { applyEdgeChanges } from "@xyflow/react";

export function applyEdgeChangesAction(
  state: MindMapState,
  action: PayloadAction<EdgeChange[]>
) {
  console.log("Applying edge changes");
  state.edges = applyEdgeChanges(action.payload, state.edges);
}
