import { useReactFlow } from '@xyflow/react';
import { useAppSelector } from '../store';
import type { NodeData } from '../types/mindmap';
import Drawing from 'dxf-writer';

// Node dimensions (matching NetworkNode.tsx)
const NODE_WIDTH = 200;
const NODE_HEIGHT = 65; // 40 (upper) + 25 (lower)
const NODE_HEIGHT_UPPER = 40;
const LEFT_SECTION_WIDTH = NODE_WIDTH * 0.70;
const ARROW_SIZE = 8;

/**
 * Draw an arrowhead at the end of an edge
 */
function drawArrow(d: InstanceType<typeof Drawing>, x: number, y: number, direction: 'left' | 'right' | 'up' | 'down') {
  const size = ARROW_SIZE;
  let points: [number, number][];
  
  switch (direction) {
    case 'left':
      points = [[x, y], [x + size, y - size/2], [x + size, y + size/2], [x, y]];
      break;
    case 'right':
      points = [[x, y], [x - size, y - size/2], [x - size, y + size/2], [x, y]];
      break;
    case 'up':
      points = [[x, y], [x - size/2, y - size], [x + size/2, y - size], [x, y]];
      break;
    case 'down':
      points = [[x, y], [x - size/2, y + size], [x + size/2, y + size], [x, y]];
      break;
  }
  
  d.drawPolyline(points);
}

/**
 * Generate a DXF file using dxf-writer library
 */
function generateDxf(
  nodes: { id: string; position: { x: number; y: number }; data: NodeData }[],
  edges: { source: string; target: string }[],
  layoutDirection: 'LR' | 'TB'
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
      if (layoutDirection === 'LR') {
        // Horizontal layout: connect right side of source to left side of target
        const x1 = sourceNode.position.x + NODE_WIDTH;
        const y1 = -(sourceNode.position.y + NODE_HEIGHT / 2);
        const x2 = targetNode.position.x;
        const y2 = -(targetNode.position.y + NODE_HEIGHT / 2);
        const midX = (x1 + x2) / 2;
        
        d.drawPolyline([
          [x1, y1],
          [midX, y1],
          [midX, y2],
          [x2, y2]
        ]);
        
        // Arrow pointing left (into target)
        drawArrow(d, x2, y2, 'left');
      } else {
        // Vertical layout (TB): connect bottom of source to top of target
        const x1 = sourceNode.position.x + NODE_WIDTH / 2;
        const y1 = -(sourceNode.position.y + NODE_HEIGHT);
        const x2 = targetNode.position.x + NODE_WIDTH / 2;
        const y2 = -targetNode.position.y;
        const midY = (y1 + y2) / 2;
        
        d.drawPolyline([
          [x1, y1],
          [x1, midY],
          [x2, midY],
          [x2, y2]
        ]);
        
        // Arrow pointing down (into target)
        drawArrow(d, x2, y2, 'down');
      }
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
    
    // Title text (approximate center positioning)
    const label = node.data.label || 'Node';
    const titleX = x + (NODE_WIDTH - label.length * 5) / 2; // Better centering estimate
    d.drawText(Math.max(x + 5, titleX), y - 25, 10, 0, label);
    
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
  const layoutDirection = useAppSelector((state) => state.mindmap.layoutDirection);

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
      })),
      layoutDirection
    );
    
    downloadDxf(dxfContent);
  };

  return { handleExportDxf };
};
