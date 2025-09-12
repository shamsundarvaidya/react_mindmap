import type { Node, Edge, XYPosition } from "@xyflow/react";
import { Position } from "@xyflow/react";

import type { NodeData } from "../types/mindmap";
import { getDagreLayoutedElements } from "./dagreLayout";

export const getLayoutedElements = (
  nodes: Node<NodeData>[],
  edges: Edge[],
  direction: "LR" | "TB" = "LR"
): { nodes: Node<NodeData>[]; edges: Edge[] } => {
  const isHorizontal = direction === "LR";
  const dagreGraph = getDagreLayoutedElements(nodes, edges, direction);

  const layoutedNodes = nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id) as XYPosition;
    console.log("Node position:", { x, y });

    return {
      ...node,
      position: { x, y },
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
    };
  });

  return { nodes: layoutedNodes, edges };
};
