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

    const childNode = {
        id: newId,
        type: 'customNode',
        position: parentNode.position,
        data: { 
          label: `Node`
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

    const newSiblingNode = {
        id: newId,
        type: 'customNode',
        position: newPosition,
        data: { 
          label: `Node`
        },
    };

    const newSiblingEdge = {
            id: `e${siblingEdge.source}-${newId}`,
            source: siblingEdge.source,
            target: newId,
          };

    return { node: newSiblingNode, edge: newSiblingEdge };
};


// Fixed node dimensions (matching NetworkNode.tsx)
const NODE_WIDTH = 200;
const NODE_HEIGHT = 65; // 40 (upper) + 25 (lower)

// Helper to get fixed node size (matches NetworkNode dimensions)
export function getNodeSize(_label: string) {
  // Use fixed dimensions matching the actual rendered node
  return { width: NODE_WIDTH, height: NODE_HEIGHT };
}

