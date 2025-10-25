import type { PayloadAction } from "@reduxjs/toolkit";
import type { MindMapState, NodeData } from "../../types/mindmap";
import type { Node, Edge } from "@xyflow/react";
import { getDefaultColor } from "../../constants/themes";

export function clearMindMap(state: MindMapState) {
  state.nodes = [
    {
      id: "root",
      type: "customNode",
      position: { x: 250, y: 100 },
      data: { 
        label: "Root Node",
        color: getDefaultColor() // Default to first color of Pastel scheme
      },
    },
  ];
  state.edges = [];
  state.selectedNodeId = null;
  localStorage.removeItem("mindmap-data");
}

export function saveMindMapToLocalStorage(state: MindMapState) {
  const data = {
    nodes: state.nodes,
    edges: state.edges,
    layoutDirection: state.layoutDirection,
  };
  localStorage.setItem("mindmap-data", JSON.stringify(data));
}

export function loadMindMapFromLocalStorage(
  state: MindMapState,
  action: PayloadAction<{ nodes: Node<NodeData>[]; edges: Edge[]; layoutDirection: 'LR' | 'TB' }>
) {
  state.nodes = action.payload.nodes;
  state.edges = action.payload.edges;
  state.layoutDirection = action.payload.layoutDirection ?? 'LR';
  state.selectedNodeId = null;
}
