import type { MindMapState } from "../types/mindmap";
import { getDefaultColor } from "../constants/themes";

export const initialState: MindMapState = {
  nodes: [
    {
      id: "root",
      type: "customNode",
      position: { x: 250, y: 100 },
      data: { 
        label: "Root Node", 
        collapsed: false,
        color: getDefaultColor() // Default to first color of Pastel scheme
      },
    },
  ],
  edges: [],
  selectedNodeId: "root",
  layoutDirection: 'LR',
};
