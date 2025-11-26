import { useRef, type ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { processCSVFile } from '../utils/csvParser';
import { importCSV, applyLayout } from '../store/mindmapSlice';

export const useImportFromCSV = (onComplete?: () => void) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const rootNode = useAppSelector((state) => 
    state.mindmap.nodes.find(n => n.id === 'root')
  );

  const handleCSVUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log('Selected file for CSV import:', file.name);

    // Check file extension
    if (!file.name.endsWith('.csv')) {
      alert('Please upload a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvContent = event.target?.result as string;
        console.log('CSV content loaded:', csvContent);
        // Process CSV to nodes and edges
        const { nodes: newNodes, edges: newEdges } = processCSVFile(csvContent);
        
        // Use the importCSV action creator from mindmapSlice
        dispatch(importCSV({
          nodes: rootNode ? [rootNode, ...newNodes] : newNodes,
          edges: newEdges,
        }));
        
        // Apply layout after import to position nodes
        dispatch(applyLayout('LR'));
        
        onComplete?.();
        
        // Reset input
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        
        alert('CSV imported successfully!');
      } catch (error) {
        console.error('CSV import error:', error);
        alert(error instanceof Error ? error.message : 'Failed to import CSV file');
      }
    };
    reader.readAsText(file);
  };

  const triggerCSVFileSelect = () => inputRef.current?.click();

  return {
    inputRef,
    handleCSVUpload,
    triggerCSVFileSelect,
  };
};
