import type { PayloadAction } from "@reduxjs/toolkit";
import type { MindMapState } from "../../types/mindmap";
import { getLayoutedElements } from "../../utils/layoutHelper";

// export function applyLayoutToMap(state: MindMapState) {
//   const { nodes, edges } = getLayoutedElements(
//     state.nodes,
//     state.edges,
//     "LR"
//   );
//   state.nodes = nodes;
//   state.edges = edges;
// }

export function applyLayoutWithDirectionToMap(state: MindMapState, action: PayloadAction<"LR" | "TB" | "None">) {
  const direction = action.payload === "None" ? (state.layoutDirection || "LR") : action.payload;
  const { nodes, edges } = getLayoutedElements(
    state.nodes,
    state.edges,
    direction
  );
  state.nodes = nodes;
  state.edges = edges;
  state.layoutDirection = direction;
}
