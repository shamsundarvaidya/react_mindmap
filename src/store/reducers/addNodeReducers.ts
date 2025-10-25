
import type { MindMapState, NodeData } from "../../types/mindmap";
import { createChildNodeWithEdge, createSiblingNodeWithEdge, type NodeWithEdge } from "../../utils/nodeHelper";
import type { Node, Edge } from "@xyflow/react";

export function addChildNodeToMap(state: MindMapState) {
  const parentId = state.selectedNodeId;
  if (!parentId) return;
  const parentNode = state.nodes.find((n: Node<NodeData>) => n.id === parentId);
  if (!parentNode) return;
  
  // Get current color scheme from localStorage (same as appSettingsSlice)
  const getColorScheme = () => {
    try {
      if (typeof window !== 'undefined') {
        const scheme = window.localStorage.getItem('node-color-scheme');
        return scheme || null;
      }
    } catch {}
    return null;
  };
  
  const colorScheme = getColorScheme();
  const { node, edge }: NodeWithEdge = createChildNodeWithEdge(
    parentNode, 
    state.nodes as Node<NodeData>[], 
    state.edges as Edge[], 
    colorScheme
  );
  
  state.nodes.push(node);
  state.edges.push(edge);
}

export function addSiblingNodeToMap(state: MindMapState) {
  const siblingId = state.selectedNodeId;
  if (!siblingId) return;

  const siblingNode = state.nodes.find((n: Node<NodeData>) => n.id === siblingId);

  if (!siblingNode) return;

  const siblingEdge = state.edges.find((e: Edge) => e.target === siblingId);
  if (siblingEdge) {
    // Get current color scheme from localStorage (same as appSettingsSlice)
    const getColorScheme = () => {
      try {
        if (typeof window !== 'undefined') {
          const scheme = window.localStorage.getItem('node-color-scheme');
          return scheme || null;
        }
      } catch {}
      return null;
    };
    
    const colorScheme = getColorScheme();
    const { node, edge }: NodeWithEdge = createSiblingNodeWithEdge(
      siblingNode,
      siblingEdge,
      state.nodes as Node<NodeData>[], 
      state.edges as Edge[], 
      colorScheme
    );
    
    state.nodes.push(node);
    state.edges.push(edge);
  }
}
