import { useMemo } from 'react';
import { useAppSelector } from '../store';
import type { Node, Edge } from '@xyflow/react';
import type { NodeData } from '../types/mindmap';

/**
 * Hook to compute the visible graph (filters out descendants of collapsed nodes)
 * @returns Object containing visible nodes, edges, and hidden node IDs
 */
export function useVisibleGraph() {
  const nodes = useAppSelector((state) => state.mindmap.nodes);
  const edges = useAppSelector((state) => state.mindmap.edges);

  return useMemo(() => {
    // Find all hidden node IDs (descendants of collapsed nodes)
    const hidden = new Set<string>();
    const collapsedIds = nodes.filter(n => n.data?.collapsed).map(n => n.id);

    for (const cid of collapsedIds) {
      // Find all descendants of this collapsed node
      const descendants = new Set<string>();
      const queue = [cid];

      while (queue.length > 0) {
        const current = queue.shift()!;
        descendants.add(current);
        const children = edges.filter((e) => e.source === current).map((e) => e.target);
        queue.push(...children);
      }
      
      descendants.delete(cid); // do not hide the collapsed node itself
      for (const id of descendants) hidden.add(id);
    }

    // Filter to visible nodes and edges
    const vNodes = nodes.filter(n => !hidden.has(n.id));
    const vNodeIds = new Set(vNodes.map(n => n.id));
    const vEdges = edges.filter(e => vNodeIds.has(e.source) && vNodeIds.has(e.target));
    
    return { 
      nodes: vNodes as Node<NodeData>[], 
      edges: vEdges as Edge[], 
      hiddenIds: hidden 
    };
  }, [nodes, edges]);
}
