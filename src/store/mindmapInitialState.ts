import type { MindMapState } from "../types/mindmap";

export const initialState: MindMapState = {
  nodes: [
    {
      id: "root",
      type: "customNode",
      position: { x: 250, y: 100 },
      data: { 
        label: "Root Node", 
        collapsed: false,
        depth: 0 // Root node is always at depth 0
      },
    },
  ],
  edges: [],
  selectedNodeId: "root",
  layoutDirection: 'LR',
};
