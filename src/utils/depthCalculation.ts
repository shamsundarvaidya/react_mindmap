// Utility functions for node depth calculations
import type { Node, Edge } from "@xyflow/react";
import type { NodeData } from "../types/mindmap";

export interface NodeDepthInfo {
  nodeId: string;
  depth: number;
}

/**
 * Calculate the depth of each node in the graph hierarchy
 */
export function calculateNodeDepths(
  nodes: Node<NodeData>[], 
  edges: Edge[]
): Map<string, number> {
  const inDegree = new Map<string, number>();
  nodes.forEach(n => inDegree.set(n.id, 0));
  edges.forEach(e => inDegree.set(e.target, (inDegree.get(e.target) || 0) + 1));
  
  const roots = nodes.filter(n => (inDegree.get(n.id) || 0) === 0).map(n => n.id);
  
  const adjacency = new Map<string, string[]>();
  nodes.forEach(n => adjacency.set(n.id, []));
  edges.forEach(e => { 
    const arr = adjacency.get(e.source); 
    if (arr) arr.push(e.target); 
  });
  
  const depthMap = new Map<string, number>();
  const queue: Array<{ id: string; depth: number }> = roots.map(r => ({ id: r, depth: 0 }));
  
  while (queue.length) {
    const { id, depth } = queue.shift()!;
    if (depthMap.has(id)) continue;
    depthMap.set(id, depth);
    (adjacency.get(id) || []).forEach(child => queue.push({ id: child, depth: depth + 1 }));
  }
  
  // Ensure all nodes have a depth (fallback to 0)
  nodes.forEach(n => { 
    if (!depthMap.has(n.id)) depthMap.set(n.id, 0); 
  });
  
  return depthMap;
}

/**
 * Get all nodes with their calculated depths
 */
export function getNodesWithDepths(
  nodes: Node<NodeData>[], 
  edges: Edge[]
): NodeDepthInfo[] {
  const depthMap = calculateNodeDepths(nodes, edges);
  return nodes.map(node => ({
    nodeId: node.id,
    depth: depthMap.get(node.id) || 0
  }));
}

/**
 * Update nodes with calculated depth values
 */
export function updateNodesWithDepth(
  nodes: Node<NodeData>[], 
  edges: Edge[]
): Node<NodeData>[] {
  const depthMap = calculateNodeDepths(nodes, edges);
  return nodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      depth: depthMap.get(node.id) || 0
    }
  }));
}