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
  console.log('[RadialLayout] parentMap:', parentMap);
  console.log(typeof parentMap);
  return parentMap;
}

export function applyRadialLayoutD3(
  nodes: Node<NodeData>[],
  edges: Edge[]
): Record<string, { position: { x: number; y: number }; sourcePosition: string; targetPosition: string }> {


  // Deduce parentId for each node using edges
  const parentMap = getParentMap(edges);


  // Build a map for quick lookup and tree construction
  type TreeNode = Node<NodeData> & { children: TreeNode[] };
  const nodeMap = new Map<string, TreeNode>();
  nodes.forEach(n => {
    nodeMap.set(n.id, { ...n, children: [] });
  });

  let root: TreeNode | null = null;
  nodes.forEach(node => {
    const treeNode = nodeMap.get(node.id)!;
    const parentId = parentMap.get(node.id);
    if (parentId) {
      const parent = nodeMap.get(parentId);
      if (parent) parent.children.push(treeNode);
    } else {
      root = treeNode;
    }
  });

  console.debug('[RadialLayout] nodeMap:', nodeMap);
  console.debug('[RadialLayout] root:', root);


  if (!root) {
    console.warn('[RadialLayout] No root node found. Returning empty positions.');
    return {};
  }


  // Create d3 hierarchy
  const rootHierarchy = hierarchy<TreeNode>(root);
  console.debug('[RadialLayout] rootHierarchy:', rootHierarchy);

  // Dynamically set radius based on node count and tree depth for better spacing
  const minRadius = 150;
  const maxRadius = 800;
  const nodeCount = nodes.length;
  const treeDepth = rootHierarchy.height;
  
  // Calculate radius based on both node count and tree depth
  // More nodes = larger radius, deeper trees = more radius per level
  const baseRadius = 100 + (nodeCount * 8);
  const depthMultiplier = Math.max(1, treeDepth) * 80;
  const radius = Math.max(minRadius, Math.min(maxRadius, baseRadius + depthMultiplier));

  const layout = cluster<TreeNode>()
    .size([2 * Math.PI, radius])
    .separation((a, b) => {
      // Increase separation for nodes at the same level to reduce overlap
      const sameparent = a.parent === b.parent;
      return sameparent ? 1.2 : 1.8;
    });

  layout(rootHierarchy);
  console.debug('[RadialLayout] After layout:', rootHierarchy);

  // Map positions back to a record of nodeId -> position and port positions
  const positions: Record<string, { position: { x: number; y: number }; sourcePosition: string; targetPosition: string }> = {};
  
  // Calculate center dynamically based on the actual layout bounds
  const centerX = 600; // Increased from 400 for larger layouts
  const centerY = 400; // Increased from 300 for larger layouts
  
  rootHierarchy.each((d: HierarchyNode<TreeNode>) => {
    const { x, y } = d;
    if (typeof x === 'number' && typeof y === 'number') {
      // Convert polar to cartesian
      const r = y;
      const angle = x - Math.PI / 2;
      positions[d.data.id] = {
        position: {
          x: centerX + r * Math.cos(angle),
          y: centerY + r * Math.sin(angle),
        },
        sourcePosition: 'right',
        targetPosition: 'left',
      };
    }
  });
  return positions;
}