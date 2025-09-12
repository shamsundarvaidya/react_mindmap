import React from "react";
import { useAppDispatch } from "../../store";
import { saveMindMap } from "../../store/mindmapSlice";

interface SaveButtonProps {
  variant?: "default" | "menu";
  className?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ variant = "default", className = "" }) => {
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(saveMindMap());
    alert("Mind map saved!");
  };

  const baseDefault = "inline-flex items-center gap-1.5 bg-sky-600 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-sky-700 active:bg-sky-800 text-sm transition";
  const baseMenu = "w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm";
  const btnClass = `${variant === "menu" ? baseMenu : baseDefault} ${className}`.trim();

  return (
    <button className={btnClass} onClick={handleSave}>
      <span className="text-base">💾</span>
      <span>Save in Browser</span>
    </button>
  );
};

export default SaveButton;
