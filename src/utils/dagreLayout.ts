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

  dagreGraph.setGraph({ 
    rankdir: direction,
    // ranksep: Gap between depths/ranks
    // nodesep: Gap between sibling nodes at same depth
    // In LR: ranksep = horizontal gap, nodesep = vertical gap
    // In TB: ranksep = vertical gap, nodesep = horizontal gap
    ranksep: direction === 'TB' ? 100 : 200,   // Vertical layout needs less depth gap
    nodesep: direction === 'TB' ? 100 : 50,     // Vertical layout needs less sibling gap (horizontal spread)
  });

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
