import { useReactFlow } from '@xyflow/react';
import type { NodeData } from '../types/mindmap';
import Drawing from 'dxf-writer';

// Node dimensions (matching NetworkNode.tsx)
const NODE_WIDTH = 200;
const NODE_HEIGHT = 65; // 40 (upper) + 25 (lower)
const NODE_HEIGHT_UPPER = 40;
const LEFT_SECTION_WIDTH = NODE_WIDTH * 0.70;

/**
 * Generate a DXF file using dxf-writer library
 */
function generateDxf(
  nodes: { id: string; position: { x: number; y: number }; data: NodeData }[],
  edges: { source: string; target: string }[]
): string {
  const d = new Drawing();
  
  // Set units to pixels (unitless)
  d.setUnits('Unitless');
  
  // Add layers for organization
  d.addLayer('EDGES', Drawing.ACI.CYAN, 'CONTINUOUS');
  d.addLayer('NODES', Drawing.ACI.WHITE, 'CONTINUOUS');
  d.addLayer('TEXT', Drawing.ACI.WHITE, 'CONTINUOUS');
  
  // Create a map for quick node lookup
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  
  // Draw edges as orthogonal (right-angle) lines like smoothstep in ReactFlow
  d.setActiveLayer('EDGES');
  for (const edge of edges) {
    const sourceNode = nodeMap.get(edge.source);
    const targetNode = nodeMap.get(edge.target);
    
    if (sourceNode && targetNode) {
      // Start point: right side of source node, vertically centered
      const x1 = sourceNode.position.x + NODE_WIDTH;
      const y1 = -(sourceNode.position.y + NODE_HEIGHT / 2);
      
      // End point: left side of target node, vertically centered
      const x2 = targetNode.position.x;
      const y2 = -(targetNode.position.y + NODE_HEIGHT / 2);
      
      // Midpoint X for the vertical segment (halfway between nodes)
      const midX = (x1 + x2) / 2;
      
      // Draw orthogonal path: horizontal -> vertical -> horizontal
      // This creates a right-angle connection similar to smoothstep
      d.drawPolyline([
        [x1, y1],           // Start at source
        [midX, y1],         // Go horizontal to midpoint
        [midX, y2],         // Go vertical to target Y level
        [x2, y2]            // Go horizontal to target
      ]);
    }
  }
  
  // Draw nodes
  d.setActiveLayer('NODES');
  for (const node of nodes) {
    const x = node.position.x;
    const y = -node.position.y; // Flip Y for CAD coordinate system
    const w = NODE_WIDTH;
    const h = NODE_HEIGHT;
    
    // Draw outer rectangle (as polyline)
    d.drawPolyline([
      [x, y],
      [x + w, y],
      [x + w, y - h],
      [x, y - h],
      [x, y] // Close the rectangle
    ]);
    
    // Draw horizontal divider line (between title and lower section)
    const dividerY = y - NODE_HEIGHT_UPPER;
    d.drawLine(x, dividerY, x + w, dividerY);
    
    // Draw vertical divider line (between left and right text)
    const vertDividerX = x + LEFT_SECTION_WIDTH;
    d.drawLine(vertDividerX, dividerY, vertDividerX, y - h);
  }
  
  // Draw text labels
  d.setActiveLayer('TEXT');
  for (const node of nodes) {
    const x = node.position.x;
    const y = -node.position.y;
    
    // Title text (centered in upper section)
    const label = node.data.label || 'Node';
    d.drawText(x + NODE_WIDTH / 2 - label.length * 3, y - 25, 10, 0, label);
    
    // Left text
    const leftText = node.data.left_text || '';
    if (leftText) {
      d.drawText(x + 5, y - NODE_HEIGHT_UPPER - 15, 8, 0, leftText);
    }
    
    // Right text
    const rightText = node.data.right_text || '';
    if (rightText) {
      d.drawText(x + LEFT_SECTION_WIDTH + 5, y - NODE_HEIGHT_UPPER - 15, 8, 0, rightText);
    }
  }
  
  return d.toDxfString();
}

function downloadDxf(content: string, filename: string = 'mindmap.dxf') {
  const blob = new Blob([content], { type: 'application/dxf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export const useExportToDxf = () => {
  const { getNodes, getEdges } = useReactFlow();

  const handleExportDxf = () => {
    const nodes = getNodes();
    const edges = getEdges();
    
    const dxfContent = generateDxf(
      nodes.map(n => ({
        id: n.id,
        position: n.position,
        data: n.data as NodeData
      })),
      edges.map(e => ({
        source: e.source,
        target: e.target
      }))
    );
    
    downloadDxf(dxfContent);
  };

  return { handleExportDxf };
};
