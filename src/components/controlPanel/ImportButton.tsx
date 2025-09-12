import React, { type ChangeEvent } from "react";
import { useAppDispatch } from "../../store";
import { loadMindMap } from "../../store/mindmapSlice";

interface ImportButtonProps {
  variant?: "default" | "menu";
  className?: string;
  onComplete?: () => void;
}

const ImportButton: React.FC<ImportButtonProps> = ({ variant = "default", className = "", onComplete }) => {
  const dispatch = useAppDispatch();

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        dispatch(loadMindMap(json));
        onComplete?.();
      } catch (err) {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  const baseDefault = "inline-flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-emerald-700 active:bg-emerald-800 text-sm transition cursor-pointer";
  const baseMenu = "w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm cursor-pointer";
  const labelClass = `${variant === "menu" ? baseMenu : baseDefault} ${className}`.trim();

  return (
    <label className={labelClass}>
      <span className="text-base">⬆️</span>
      <span>Import JSON</span>
      <input
        type="file"
        accept="application/json"
        onChange={handleUpload}
        className="hidden"
      />
    </label>
  );
};

export default ImportButton;
