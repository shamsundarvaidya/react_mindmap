import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { FileMenuContext, useFileMenu } from "./FileMenuContext";
import FileMenuItems from "./FileMenuItems";

// Constants
const MAX_Z_INDEX = 2147483647;

const FileMenu: React.FC<{ children?: React.ReactNode }> & {
  Toggle: React.FC;
  Dropdown: React.FC;
} = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(
    () => ({ open, setOpen, toggleRef, menuRef }),
    [open]
  );

  return (
    <FileMenuContext.Provider value={contextValue}>
      {children}
    </FileMenuContext.Provider>
  );
};

// Toggle subcomponent
FileMenu.Toggle = function Toggle() {
  const { open, setOpen, toggleRef } = useFileMenu();
  
  return (
    <button
      ref={toggleRef}
      aria-haspopup="true"
      aria-expanded={open}
      className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
        open
          ? 'bg-slate-800 text-white'
          : 'text-slate-700 hover:bg-slate-100'
      }`}
      type="button"
      onClick={() => setOpen((prev) => !prev)}
    >
      File ▾
    </button>
  );
};

// Dropdown subcomponent
FileMenu.Dropdown = function Dropdown() {
  const { open, toggleRef, menuRef, setOpen } = useFileMenu();
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  // Compute menu position
  useLayoutEffect(() => {
    if (!open || !toggleRef.current) return;
    const rect = toggleRef.current.getBoundingClientRect();
    setMenuStyle({
      position: "fixed",
      top: rect.bottom + 6,
      left: rect.left,
      minWidth: Math.max(220, rect.width),
      zIndex: MAX_Z_INDEX,
    });
  }, [open, toggleRef]);

  // Handle outside clicks and escape key
  useEffect(() => {
    if (!open) return;

    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current?.contains(target) || toggleRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const timeoutId = window.setTimeout(() => {
      document.addEventListener("click", handleDocClick);
    }, 60);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleDocClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, menuRef, toggleRef, setOpen]);
  
  if (!open) return null;

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      aria-label="File menu"
      style={menuStyle}
      className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-2 w-60 text-sm font-medium text-slate-300"
    >
      <div className="space-y-1">
        <FileMenuItems />
      </div>
    </div>,
    document.body
  );
};

export default FileMenu;