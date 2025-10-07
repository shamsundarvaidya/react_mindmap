import type { Node, Edge, XYPosition } from "@xyflow/react";
import { Position } from "@xyflow/react";

import type { NodeData } from "../types/mindmap";
import { getDagreLayoutedElements } from "./dagreLayout";

export const getLayoutedPositions = (
  nodes: Node<NodeData>[],
  edges: Edge[],
  direction: "LR" | "TB" = "LR"
): Record<string, { position: XYPosition; sourcePosition: Position; targetPosition: Position }> => {
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
