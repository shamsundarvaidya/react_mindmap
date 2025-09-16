import { useRef, useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../../store";
import SaveButton from "./fileActions/SaveButton";
import ExportButton from "./fileActions/ExportButton";
import ExportPngButton from "./fileActions/ExportToPngButton";
import ImportButton from "./fileActions/ImportButton";
import ClearButton from "./fileActions/ClearButton";

const FileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { nodes, edges, layoutDirection } = useAppSelector(
    (state) => state.mindmap
  );

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  const handleExport = useCallback(() => {
    const input = prompt("Enter filename for download:", "mindmap.json");
    if (!input) return;
    const filename = input.endsWith(".json") ? input : `${input}.json`;

    const data = JSON.stringify({ nodes, edges, layoutDirection }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
    setOpen(false);
  }, [nodes, edges, layoutDirection]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 text-sm"
        onClick={() => setOpen((v) => !v)}
      >
        File ▾
      </button>
      {open && (
        <div className="absolute mt-1 left-0 w-56 bg-white border border-slate-200 rounded-md shadow-lg p-1 z-50">
          <div onClick={() => setOpen(false)}>
            <SaveButton variant="menu" />
          </div>
          <div>
            <ExportButton variant="menu" onClick={handleExport} />
          </div>
          <div onClick={() => setOpen(false)}>
            <ExportPngButton variant="menu" />
          </div>
          <div>
            <ImportButton variant="menu" onComplete={() => setOpen(false)} />
          </div>
          <div onClick={() => setOpen(false)}>
            <ClearButton variant="menu" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileMenu;