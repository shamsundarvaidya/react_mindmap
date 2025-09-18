import type { Node, Edge, XYPosition } from "@xyflow/react";
import { Position } from "@xyflow/react";

import type { NodeData } from "../types/mindmap";
import { getDagreLayoutedElements } from "./dagreLayout";
import { applyRadialLayoutD3 } from "./d3Layout";

export const getLayoutedPositions = (
  nodes: Node<NodeData>[],
  edges: Edge[],
  direction: "LR" | "TB" | "RADIAL" = "LR"
): Record<string, { position: XYPosition; sourcePosition: Position; targetPosition: Position }> => {
  if (direction === "RADIAL") {
    // Use d3 radial layout, which now returns the positions record
    const positions = applyRadialLayoutD3(nodes, edges);
    // Convert string positions to Position enum for compatibility
    const result: Record<string, { position: XYPosition; sourcePosition: Position; targetPosition: Position }> = {};
    Object.entries(positions).forEach(([id, pos]) => {
      result[id] = {
        position: pos.position,
        sourcePosition: Position.Right, // or map from pos.sourcePosition if needed
        targetPosition: Position.Left,  // or map from pos.targetPosition if needed
      };
    });
    return result;
  }

  const isHorizontal = direction === "LR";
  const dagreGraph = getDagreLayoutedElements(nodes, edges, direction);

  return nodes.reduce((acc, node) => {
    const { x, y } = dagreGraph.node(node.id) as XYPosition;
    acc[node.id] = {
      position: { x, y },
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
    };
    return acc;
  }, {} as Record<string, { position: XYPosition; sourcePosition: Position; targetPosition: Position }>);
};
