import type { PayloadAction } from "@reduxjs/toolkit";
import type { MindMapState, NodeData } from "../../types/mindmap";
import type { Node, NodeChange, Edge } from "@xyflow/react";
import { applyNodeChanges } from "@xyflow/react";
import { createChildNodeWithEdge, createSiblingNodeWithEdge, type NodeWithEdge } from "../../utils/nodeHelper";

export function selectNodeInMap(state: MindMapState, action: PayloadAction<string>) {
  console.log("Selected node ID:", action.payload);
  state.selectedNodeId = action.payload;
}

export function applyNodeChangesAction(
  state: MindMapState,
  action: PayloadAction<NodeChange<Node<NodeData>>[]>
) {
  console.log("Applying node changes");
  state.nodes = applyNodeChanges<Node<NodeData>>(
    action.payload,
    state.nodes
  );
}

export function updateNodeLabel(
  state: MindMapState,
  action: PayloadAction<{ id: string; label: string }>
) {
  const { id, label } = action.payload;
  const node = state.nodes.find((n: Node<NodeData>) => n.id === id);
  if (node) {
    node.data.label = label;
  }
}

export function updateNodeColor(
  state: MindMapState,
  action: PayloadAction<{ id: string; color: string }>
) {
  
  const node = state.nodes.find((n: Node<NodeData>) => n.id === action.payload.id);
  if (node) {
    node.data = {
      ...node.data,
      color: action.payload.color,
    };
  }
}

export function toggleNodeCollapse(
  state: MindMapState,
  action: PayloadAction<string>
) {
  const id = action.payload;
  const node = state.nodes.find((n: Node<NodeData>) => n.id === id);
  if (!node) return;

  // Toggle collapse state
  const next = !node.data?.collapsed;
  node.data = { ...node.data, collapsed: next };

  // If expanding, no need to check selection
  // If collapsing and it might hide selected node, check and reselect if needed
  if (next && state.selectedNodeId) {
    // Find all descendants of collapsed node
    const descendants = new Set<string>();
    const queue = [id];

    while (queue.length > 0) {
      const current = queue.shift()!;
      descendants.add(current);
      const children = state.edges.filter((e) => e.source === current).map((e) => e.target);
      queue.push(...children);
    }

    // If selected node will be hidden, reselect the collapsed node
    if (descendants.has(state.selectedNodeId) && state.selectedNodeId !== id) {
      state.selectedNodeId = id;
    }
  }
}

export function addChildNodeToMap(state: MindMapState) {
  const parentId = state.selectedNodeId;
  if (!parentId) return;
  const parentNode = state.nodes.find((n: Node<NodeData>) => n.id === parentId);
  if (!parentNode) return;
  
  const { node, edge }: NodeWithEdge = createChildNodeWithEdge(parentNode);
  
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
    const { node, edge }: NodeWithEdge = createSiblingNodeWithEdge(
      siblingNode,
      siblingEdge
    );
    
    state.nodes.push(node);
    state.edges.push(edge);
  }
}

export function deleteNodeAndDescendants(state: MindMapState, action: PayloadAction<string[]>) {
  const idsToDelete = new Set(action.payload);
  
  // Filter out nodes and edges with matching IDs
  state.nodes = state.nodes.filter((node: Node<NodeData>) => !idsToDelete.has(node.id));
  state.edges = state.edges.filter(
    (edge: Edge) => !idsToDelete.has(edge.source) && !idsToDelete.has(edge.target)
  );
  
  // Deselect if deleted
  if (state.selectedNodeId && idsToDelete.has(state.selectedNodeId)) {
    state.selectedNodeId = null;
  }
}


