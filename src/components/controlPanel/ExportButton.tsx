import React from "react";
import { useAppSelector } from "../../store";

interface ExportButtonProps {
  variant?: "default" | "menu";
  className?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ variant = "default", className = "" }) => {
  const { nodes, edges, layoutDirection } = useAppSelector((state) => state.mindmap);

  const handleDownload = () => {
    console.log("Exporting JSON...");
    const filename = prompt("Enter filename for download:", "mindmap.json");
    if (!filename) return;

    const dataStr = JSON.stringify({ nodes, edges, layoutDirection }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".json") ? filename : `${filename}.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const baseDefault = "inline-flex items-center gap-1.5 bg-blue-700 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-blue-800 active:bg-blue-900 text-sm transition";
  const baseMenu = "w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm";
  const btnClass = `${variant === "menu" ? baseMenu : baseDefault} ${className}`.trim();

  return (
    <button className={btnClass} onClick={handleDownload}>
      <span className="text-lg">⬇️</span>
      <span>Export JSON</span>
    </button>
  );
};

export default ExportButton;
