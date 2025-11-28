import { useMemo } from 'react';
import { useAppSelector } from '../store';
import type { Node, Edge } from '@xyflow/react';
import type { NodeData } from '../types/mindmap';

/**
 * Hook to get the graph nodes and edges
 * @returns Object containing nodes and edges
 */
export function useVisibleGraph() {
  const nodes = useAppSelector((state) => state.mindmap.nodes);
  const edges = useAppSelector((state) => state.mindmap.edges);

  return useMemo(() => {
    return { 
      nodes: nodes as Node<NodeData>[], 
      edges: edges as Edge[]
    };
  }, [nodes, edges]);
}
