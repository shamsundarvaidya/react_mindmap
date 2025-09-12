import type { Node, Edge } from '@xyflow/react';
import { nanoid } from '@reduxjs/toolkit';
import { useReactFlow } from '@xyflow/react';



import {type NodeData } from '../types/mindmap';

export type NodeWithEdge = {
    node: Node<NodeData>;
    edge: Edge;
};

export const createChildNodeWithEdge = (parentNode: Node<NodeData>): NodeWithEdge => {
    const newId = nanoid();
    const parentId = parentNode.id;
   

    const childNode = {
        id: newId,
        type: 'customNode',
        position: parentNode.position,
        data: { label: `Node` },
    };

    const childEdge = {
          id: `e${parentId}-${newId}`,
          source: parentId,
          target: newId,
        };



    return { node: childNode, edge: childEdge };
};

export const createSiblingNodeWithEdge = (siblingNode: Node<NodeData>, siblingEdge: Edge): NodeWithEdge => {
    const newId = nanoid();
    const newPosition = siblingNode.position;

    const newSiblingNode = {
        id: newId,
        type: 'customNode',
        position: newPosition,
        data: { label: `Node` },
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

