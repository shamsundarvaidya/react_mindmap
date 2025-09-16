import dagre from 'dagre';
import type { Node, Edge } from '@xyflow/react';
import type { NodeData } from '../types/mindmap';
import { getNodeSize } from './nodeHelper';


export function getDagreLayoutedElements(
  nodes: Node<NodeData>[],
  edges: Edge[],
  direction: 'LR' | 'TB' = 'LR'
): dagre.graphlib.Graph {

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: direction,ranksep: 100,   nodesep: 50, });

  // Set dagre nodes with dynamic size
  nodes.forEach((node) => {
    // @ts-ignore
    const label = node.data?.label || '';
    const { width, height } = getNodeSize(label);
    dagreGraph.setNode(node.id, { width, height });
  });

  // Set dagre edges
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Compute layout
  dagre.layout(dagreGraph);

  return dagreGraph;


}
