import type { Node, Edge } from '@xyflow/react';


export interface NodeData extends Record<string, unknown> {
  label: string;
  color?: string;
}



export interface MindMapState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  layoutDirection: 'LR' | 'TB';
}

export type AddNodeType = 'child' | 'sibling';
