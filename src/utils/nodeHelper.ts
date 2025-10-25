import type { Node, Edge } from '@xyflow/react';
import { nanoid } from '@reduxjs/toolkit';
import {type NodeData } from '../types/mindmap';
import { COLOR_SCHEMES } from '../constants/themes';

export type NodeWithEdge = {
    node: Node<NodeData>;
    edge: Edge;
};

// Function to calculate node depth and get appropriate color
function getNodeColorForDepth(
  parentNode: Node<NodeData>, 
  allNodes: Node<NodeData>[], 
  allEdges: Edge[], 
  colorScheme: string | null
): string {
  // If no color scheme is active, use default light gray
  if (!colorScheme || !COLOR_SCHEMES[colorScheme]) {
    return '#D3D3D3';
  }

  const palette = COLOR_SCHEMES[colorScheme];
  
  // Calculate parent depth
  const parentDepth = calculateNodeDepth(parentNode.id, allNodes, allEdges);
  const childDepth = parentDepth + 1;
  
  // Get color from palette based on depth
  return palette[childDepth % palette.length];
}

// Helper function to calculate a node's depth in the tree
function calculateNodeDepth(nodeId: string, nodes: Node<NodeData>[], edges: Edge[]): number {
  // Build adjacency map for traversal
  const inDegree = new Map<string, number>();
  nodes.forEach(n => inDegree.set(n.id, 0));
  edges.forEach(e => inDegree.set(e.target, (inDegree.get(e.target) || 0) + 1));
  
  // Find roots (nodes with no incoming edges)
  const roots = nodes.filter(n => (inDegree.get(n.id) || 0) === 0).map(n => n.id);
  
  // Build adjacency list
  const adjacency = new Map<string, string[]>();
  nodes.forEach(n => adjacency.set(n.id, []));
  edges.forEach(e => { 
    const arr = adjacency.get(e.source); 
    if (arr) arr.push(e.target); 
  });
  
  // BFS to calculate depths
  const depthMap = new Map<string, number>();
  const queue: Array<{ id: string; depth: number }> = roots.map(r => ({ id: r, depth: 0 }));
  
  while (queue.length) {
    const { id, depth } = queue.shift()!;
    if (depthMap.has(id)) continue;
    depthMap.set(id, depth);
    (adjacency.get(id) || []).forEach(child => queue.push({ id: child, depth: depth + 1 }));
  }
  
  return depthMap.get(nodeId) || 0;
}

export const createChildNodeWithEdge = (
  parentNode: Node<NodeData>, 
  allNodes?: Node<NodeData>[], 
  allEdges?: Edge[], 
  colorScheme?: string | null
): NodeWithEdge => {
    const newId = nanoid();
    const parentId = parentNode.id;
   
    // Calculate appropriate color for the new child node
    const nodeColor = (allNodes && allEdges) 
      ? getNodeColorForDepth(parentNode, allNodes, allEdges, colorScheme || null)
      : '#D3D3D3';

    const childNode = {
        id: newId,
        type: 'customNode',
        position: parentNode.position,
        data: { 
          label: `Node`,
          color: nodeColor 
        },
    };

    const childEdge = {
          id: `e${parentId}-${newId}`,
          source: parentId,
          target: newId,
        };

    return { node: childNode, edge: childEdge };
};

export const createSiblingNodeWithEdge = (
  siblingNode: Node<NodeData>, 
  siblingEdge: Edge, 
  allNodes?: Node<NodeData>[], 
  allEdges?: Edge[], 
  colorScheme?: string | null
): NodeWithEdge => {
    const newId = nanoid();
    const newPosition = siblingNode.position;

    // For siblings, they should have the same depth as the sibling node
    // Use sibling's color if available, otherwise calculate based on depth
    let nodeColor = siblingNode.data.color || '#D3D3D3';
    
    // If we have the required data and a color scheme, calculate proper color
    if (allNodes && allEdges && colorScheme && COLOR_SCHEMES[colorScheme]) {
      // Find the parent of the sibling to calculate depth
      const parentId = siblingEdge.source;
      const parentNode = allNodes.find(n => n.id === parentId);
      if (parentNode) {
        const parentDepth = calculateNodeDepth(parentId, allNodes, allEdges);
        const siblingDepth = parentDepth + 1;
        const palette = COLOR_SCHEMES[colorScheme];
        nodeColor = palette[siblingDepth % palette.length];
      }
    }

    const newSiblingNode = {
        id: newId,
        type: 'customNode',
        position: newPosition,
        data: { 
          label: `Node`,
          color: nodeColor 
        },
    };

    const newSiblingEdge = {
            id: `e${siblingEdge.source}-${newId}`,
            source: siblingEdge.source,
            target: newId,
          };

    return { node: newSiblingNode, edge: newSiblingEdge };
};


// Helper to estimate node width based on label length
export function getNodeSize(label: string) {
  const baseWidth = 100; // minimum width
  const charWidth = 20;  // average px per character
  const padding = 50;   // padding for the node
  const width = Math.max(baseWidth, label.length * charWidth + padding);
  const height = 60; // You can also make this dynamic if needed
  console.log(`Calculated size for label "${label}":`, { width, height });
  return { width, height };
}

