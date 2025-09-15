import React from "react";

interface ExportButtonProps {
  variant?: "default" | "menu";
  className?: string;
  onClick?: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = React.memo(
  ({ variant = "default", className = "", onClick }) => {
    const baseDefault =
      "inline-flex items-center gap-1.5 bg-blue-700 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-blue-800 active:bg-blue-900 text-sm transition";
    const baseMenu =
      "w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm";
    const btnClass = `${variant === "menu" ? baseMenu : baseDefault} ${className}`.trim();

    return (
      <button className={btnClass} onClick={onClick}>
        <span className="text-lg">⬇️</span>
        <span>Download JSON</span>
      </button>
    );
  }
);

export default ExportButton;
