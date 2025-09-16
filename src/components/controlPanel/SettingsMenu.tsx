import { useRef, useState, useEffect } from "react";
import NoteIndicatorToggle from "./settingActions/NoteIndicatorToggle";
import LayoutHorizontalButton from "./settingActions/LayoutHorizontalButton";
import LayoutVerticalButton from "./settingActions/LayoutVerticalButton";

const SettingsMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  // All logic/UI now in subcomponents

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

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 text-sm"
        onClick={() => setOpen((v) => !v)}
      >
        Settings ▾
      </button>
      {open && (
        <div className="absolute mt-1 left-0 w-64 bg-white border border-slate-200 rounded-md shadow-lg p-1 z-50">
          <NoteIndicatorToggle />
          <div className="h-px my-1 bg-slate-200" />
          <div className="px-3 py-1 text-xs uppercase tracking-wide text-slate-500">Layout settings</div>
          <div className="px-3 pb-2 flex flex-col gap-0">
            <LayoutHorizontalButton onClick={() => setOpen(false)} />
            <LayoutVerticalButton onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
