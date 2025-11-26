import { nanoid } from '@reduxjs/toolkit';
import type { Node, Edge } from '@xyflow/react';
import type { NodeData } from '../types/mindmap';

export interface CSVRow {
  serialNumber: string;
  item: string;
  partNumber: string;
  quantity: string;
}

/**
 * Parse CSV content into row objects
 */
export function parseCSV(csvContent: string): CSVRow[] {
  const lines = csvContent.trim().split('\n');
  
  // Skip header row
  const dataLines = lines.slice(1);
  
  return dataLines.map(line => {
    // Simple CSV parsing (handles basic cases)
    const values = line.split(',').map(v => v.trim());
    
    return {
      serialNumber: values[0] || '',
      item: values[1] || '',
      partNumber: values[2] || '',
      quantity: values[3] || '',
    };
  });
}

/**
 * Calculate hierarchy level from serial number
 * "1" -> level 1, "1.1" -> level 2, "2.1.3" -> level 3
 */
function getHierarchyLevel(serialNumber: string): number {
  return serialNumber.split('.').length;
}

/**
 * Get parent serial number
 * "1.1" -> "1", "2.1.3" -> "2.1"
 */
function getParentSerial(serialNumber: string): string | null {
  const parts = serialNumber.split('.');
  if (parts.length === 1) return null; // Top level item
  return parts.slice(0, -1).join('.');
}

/**
 * Convert CSV rows to nodes and edges structure
 */
export function csvToNodesAndEdges(csvRows: CSVRow[]): {
  nodes: Node<NodeData>[];
  edges: Edge[];
} {
  const nodes: Node<NodeData>[] = [];
  const edges: Edge[] = [];
  
  // Map serial number to node ID
  const serialToId = new Map<string, string>();
  
  // Root node ID (assumed to exist)
  const rootId = 'root';
  
  csvRows.forEach((row, index) => {
    const nodeId = nanoid();
    const level = getHierarchyLevel(row.serialNumber);
    const parentSerial = getParentSerial(row.serialNumber);
    
    // Store mapping
    serialToId.set(row.serialNumber, nodeId);
    
    // Create node with item name and metadata
    const label = row.item || `Item ${index + 1}`;
    
    const node: Node<NodeData> = {
      id: nodeId,
      type: 'customNode',
      position: { x: 0, y: 0 }, // Will be set by layout
      data: {
        label,
        depth: level, // Hierarchy level
        left_text: row.partNumber || '',
        right_text: row.quantity || '',
        collapsed: false,
      },
    };
    
    nodes.push(node);
    
    // Create edge to parent
    let parentId: string;
    
    if (parentSerial === null) {
      // Top level item, connect to root
      parentId = rootId;
    } else {
      // Get parent node ID from serial mapping
      parentId = serialToId.get(parentSerial) || rootId;
    }
    
    const edge: Edge = {
      id: `e${parentId}-${nodeId}`,
      source: parentId,
      target: nodeId,
    };
    
    edges.push(edge);
  });
  
  return { nodes, edges };
}

/**
 * Main function to process CSV file and generate mind map structure
 */
export function processCSVFile(csvContent: string): {
  nodes: Node<NodeData>[];
  edges: Edge[];
} {
  try {
    // Parse CSV
    const csvRows = parseCSV(csvContent);
    
    // Convert to nodes and edges
    const { nodes, edges } = csvToNodesAndEdges(csvRows);
    
    return { nodes, edges };
  } catch (error) {
    console.error('Error processing CSV:', error);
    throw new Error('Failed to process CSV file. Please check the format.');
  }
}
