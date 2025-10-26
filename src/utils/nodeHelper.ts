import type { Node, Edge } from '@xyflow/react';
import { nanoid } from '@reduxjs/toolkit';
import {type NodeData } from '../types/mindmap';

export type NodeWithEdge = {
    node: Node<NodeData>;
    edge: Edge;
};

export const createChildNodeWithEdge = (
  parentNode: Node<NodeData>
): NodeWithEdge => {
    const newId = nanoid();
    const parentId = parentNode.id;
   
    // Calculate depth for the new child node
    const parentDepth = parentNode.data.depth ?? 0;
    const childDepth = parentDepth + 1;

    const childNode = {
        id: newId,
        type: 'customNode',
        position: parentNode.position,
        data: { 
          label: `Node`,
          depth: childDepth
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
  siblingEdge: Edge
): NodeWithEdge => {
    const newId = nanoid();
    const newPosition = siblingNode.position;

    // Siblings have the same depth as the existing sibling
    const siblingDepth = siblingNode.data.depth ?? 0;

    const newSiblingNode = {
        id: newId,
        type: 'customNode',
        position: newPosition,
        data: { 
          label: `Node`,
          depth: siblingDepth
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

