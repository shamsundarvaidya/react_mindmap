import { cluster, hierarchy, type HierarchyNode } from "d3-hierarchy";
import type { Node, Edge } from '@xyflow/react';
import type { NodeData } from '../types/mindmap';

// nodes: array of node objects with id and parentId
// edges: array of edge objects with source and target

// Helper: build a map of nodeId -> parentId from edges
function getParentMap(edges: Edge[]): Map<string, string> {
  const parentMap = new Map<string, string>();
  edges.forEach(e => {
    parentMap.set(e.target, e.source);
  });
  return parentMap;
}

export function applyRadialLayoutD3(nodes: Node<NodeData>[], edges: Edge[]): { nodes: Node<NodeData>[]; edges: Edge[] } {


  // Deduce parentId for each node using edges
  const parentMap = getParentMap(edges);

  // Build a map for quick lookup
  type TreeNode = Node<NodeData> & { children: TreeNode[] };
  const nodeMap = new Map<string, TreeNode>(
    nodes.map(n => [n.id, { ...n, children: [] } as TreeNode])
  );
  let root: TreeNode | null = null;

  nodes.forEach(node => {
    const parentId = parentMap.get(node.id);
    if (parentId) {
      const parent = nodeMap.get(parentId);
      const child = nodeMap.get(node.id);
      if (parent && child) {
        parent.children.push(child);
      }
    } else {
      // No parentId means this is a root
      const maybeRoot = nodeMap.get(node.id);
      if (maybeRoot) {
        root = maybeRoot;
      }
    }
  });

  console.debug('[RadialLayout] nodeMap:', nodeMap);
  console.debug('[RadialLayout] root:', root);


  if (!root) {
    console.warn('[RadialLayout] No root node found. Returning original nodes.');
    return { nodes, edges };
  }


  // Create d3 hierarchy
  const rootHierarchy = hierarchy<TreeNode>(root);
  console.debug('[RadialLayout] rootHierarchy:', rootHierarchy);

  // Dynamically set radius based on node count for better spacing
  const minRadius = 200;
  const maxRadius = 400;
  const nodeCount = nodes.length;
  // Use a logarithmic scale for radius growth
  const radius = Math.max(minRadius, Math.min(maxRadius, 120 + 60 * Math.log2(nodeCount + 1)));

  const layout = cluster<TreeNode>()
    .size([2 * Math.PI, radius]);

  layout(rootHierarchy);
  console.debug('[RadialLayout] After layout:', rootHierarchy);

  // Map positions back to nodes
  const positioned: Node<NodeData>[] = [];
  rootHierarchy.each((d: HierarchyNode<TreeNode>) => {
    const { x, y } = d;
    if (typeof x === 'number' && typeof y === 'number') {
      // Convert polar to cartesian
      const r = y;
      const angle = x - Math.PI / 2;
      const pos = {
        ...d.data,
        position: {
          x: 400 + r * Math.cos(angle), // 400,300 is center
          y: 300 + r * Math.sin(angle),
        },
      };
      console.debug('[RadialLayout] Node:', pos);
      positioned.push(pos);
    }
  });

  // Update edges to match new node positions (if needed by your renderer)
  // Here, just return the same edges array, but you could recompute edge paths if needed

  console.debug('[RadialLayout] All positioned nodes:', positioned);
  return { nodes: positioned, edges };
}