import type { MindMapState } from "../types/mindmap";

export const initialState: MindMapState = {
  nodes: [
    {
      id: "root",
      type: "customNode",
      position: { x: 250, y: 100 },
      data: { label: "Root Node" },
    },
  ],
  edges: [],
  selectedNodeId: "root",
  layoutDirection: 'LR',
};
