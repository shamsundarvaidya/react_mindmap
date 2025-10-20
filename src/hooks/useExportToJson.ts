import { useCallback } from 'react';
import { useAppSelector } from '../store';

export const useExportToJson = () => {
  const { nodes, edges, layoutDirection } = useAppSelector((s) => s.mindmap);

  const handleExportToJson = useCallback(() => {
    const name = prompt("Enter filename for download:", "mindmap.json");
    if (!name) return;
    
    const filename = name.endsWith(".json") ? name : `${name}.json`;
    const payload = { 
      nodes: JSON.parse(JSON.stringify(nodes)), 
      edges: JSON.parse(JSON.stringify(edges)), 
      layoutDirection 
    };
    
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }, [nodes, edges, layoutDirection]);

  return { handleExportToJson };
};
