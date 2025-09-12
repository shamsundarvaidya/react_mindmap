import React from "react";
import { useAppDispatch } from "../../store";
import { clear } from "../../store/mindmapSlice";

interface ClearButtonProps {
  variant?: "default" | "menu";
  className?: string;
}

const ClearButton: React.FC<ClearButtonProps> = ({ variant = "default", className = "" }) => {
  const dispatch = useAppDispatch();

  const handleClear = () => {
    if (confirm("Clear the entire mind map?")) {
      dispatch(clear());
      try {
        const defaultBg = '#0B1220';
        localStorage.setItem('canvas-bg', defaultBg);
        window.dispatchEvent(new CustomEvent('canvas-bg-change', { detail: { color: defaultBg } }));
      } catch {}
    }
  };

  const baseDefault = "inline-flex items-center gap-1.5 bg-orange-500 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-orange-600 active:bg-orange-700 text-sm transition";
  const baseMenu = "w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm";
  const btnClass = `${variant === "menu" ? baseMenu : baseDefault} ${className}`.trim();

  return (
    <button
      className={btnClass}
      onClick={handleClear}
    >
      <span className="text-base">🧹</span>
      <span>Clear map</span>
    </button>
  );
};

export default ClearButton;
