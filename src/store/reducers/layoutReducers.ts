import type { PayloadAction } from "@reduxjs/toolkit";
import type { MindMapState } from "../../types/mindmap";
import { getLayoutedPositions } from "../../utils/layoutHelper";
import type { Node, Edge } from "@xyflow/react";
import type { NodeData } from "../../types/mindmap";
import { filterVisibleGraph } from "../mindmapUtils";
import { calculateNodeDepths } from "../../utils/depthCalculation";



export function applyLayoutToMap(state: MindMapState, action: PayloadAction<"LR" | "TB" | "None">) {
  const direction = action.payload === "None" ? (state.layoutDirection || "LR") : action.payload;

  // Compute layout only for visible subgraph
  const { nodes: visibleNodes, edges: visibleEdges } = filterVisibleGraph(
    state.nodes as unknown as Node<NodeData>[],
    state.edges as unknown as Edge[],
  );

  const positions = getLayoutedPositions(
    visibleNodes as any,
    visibleEdges as any,
    direction 
  );
  // Log positions in a formatted manner for verification
  if (typeof window !== 'undefined' && window.console) {
    const layoutLabel = `[Layout: ${direction}]`;
    const formatted = Object.entries(positions).map(([id, pos]) =>
      `${id}: x=${pos.position.x.toFixed(1)}, y=${pos.position.y.toFixed(1)}, src=${pos.sourcePosition}, tgt=${pos.targetPosition}`
    ).join('\n');
     
    console.log(`${layoutLabel}\n${formatted}`);
  }
  
  // Calculate node depths for theme coloring
  const depthMap = calculateNodeDepths(
    state.nodes as unknown as Node<NodeData>[], 
    state.edges as unknown as Edge[]
  );
  
  // Update node positions and depths
  state.nodes = state.nodes.map((node) => {
    const pos = positions[node.id];
    const depth = depthMap.get(node.id) ?? 0;
    if (!pos) return { ...node, data: { ...node.data, depth } };
    return {
      ...node,
      position: pos.position,
      sourcePosition: pos.sourcePosition,
      targetPosition: pos.targetPosition,
      data: { ...node.data, depth },
    };
  });
  state.layoutDirection = direction;
}


