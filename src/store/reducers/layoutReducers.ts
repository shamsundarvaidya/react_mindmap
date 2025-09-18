import type { PayloadAction } from "@reduxjs/toolkit";
import type { MindMapState } from "../../types/mindmap";
import { getLayoutedPositions } from "../../utils/layoutHelper";


// export function applyLayoutToMap(state: MindMapState) {
//   const { nodes, edges } = getLayoutedElements(
//     state.nodes,
//     state.edges,
//     "LR"
//   );
//   state.nodes = nodes;
//   state.edges = edges;
// }

export function applyLayoutToMap(state: MindMapState, action: PayloadAction<"LR" | "TB" | "RADIAL" | "None">) {
  const direction = action.payload === "None" ? (state.layoutDirection || "LR") : action.payload;
  const positions = getLayoutedPositions(
    state.nodes,
    state.edges,
    direction 
  );
  // Log positions in a formatted manner for verification
  if (typeof window !== 'undefined' && window.console) {
    const layoutLabel = `[Layout: ${direction}]`;
    const formatted = Object.entries(positions).map(([id, pos]) =>
      `${id}: x=${pos.position.x.toFixed(1)}, y=${pos.position.y.toFixed(1)}, src=${pos.sourcePosition}, tgt=${pos.targetPosition}`
    ).join('\n');
    // eslint-disable-next-line no-console
    console.log(`${layoutLabel}\n${formatted}`);
  }
  // Only update node positions and related fields
  state.nodes = state.nodes.map((node) => {
    const pos = positions[node.id];
    if (!pos) return node;
    return {
      ...node,
      position: pos.position,
      sourcePosition: pos.sourcePosition,
      targetPosition: pos.targetPosition,
    };
  });
  state.layoutDirection = direction;
}


