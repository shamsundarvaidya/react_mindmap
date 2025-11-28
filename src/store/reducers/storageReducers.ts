import type { PayloadAction } from "@reduxjs/toolkit";
import type { MindMapState, NodeData } from "../../types/mindmap";
import type { Node, Edge } from "@xyflow/react";
import type { AppDispatch, RootState } from "../index";

export function clearMindMap(state: MindMapState) {
  state.nodes = [
    {
      id: "root",
      type: "customNode",
      position: { x: 250, y: 100 },
      data: { 
        label: "Root Node"
      },
    },
  ];
  state.edges = [];
  state.selectedNodeId = null;
  localStorage.removeItem("mindmap-data");
}

export function saveMindMapToLocalStorage(_state: MindMapState) {
  // Deprecated: Use saveAllDataToLocalStorage thunk instead
  // Kept for backwards compatibility with existing action exports
}

// Thunk to save both mindmap and theme data
export const saveAllDataToLocalStorage = () => (_dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();
  const data = {
    nodes: state.mindmap.nodes,
    edges: state.mindmap.edges,
    layoutDirection: state.mindmap.layoutDirection,
    theme: {
      selectedTheme: state.theme.selectedTheme,
    },
  };
  localStorage.setItem("mindmap-data", JSON.stringify(data));
};

export function loadMindMapFromLocalStorage(
  state: MindMapState,
  action: PayloadAction<{ 
    nodes: Node<NodeData>[]; 
    edges: Edge[]; 
    layoutDirection: 'LR' | 'TB';
    theme?: { selectedTheme?: string };
  }>
) {
  state.nodes = action.payload.nodes;
  state.edges = action.payload.edges;
  state.layoutDirection = action.payload.layoutDirection ?? 'LR';
  state.selectedNodeId = null;
  // Theme data will be handled separately in MindMap component
}

export function importFromCSV(
  state: MindMapState,
  action: PayloadAction<{ nodes: Node<NodeData>[]; edges: Edge[] }>
) {
  const { nodes, edges } = action.payload;
  
  state.nodes = nodes;
  state.edges = edges;
  state.selectedNodeId = null;
}
