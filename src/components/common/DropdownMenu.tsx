import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

// Context type
type DropdownMenuContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRef: React.RefObject<HTMLElement | null>;
  menuRef: React.RefObject<HTMLDivElement | null>;
  closeMenu: () => void;
};

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

// Hook to access context
export const useDropdownMenuContext = () => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) {
    throw new Error("DropdownMenu subcomponents must be used within <DropdownMenu />");
  }
  return ctx;
};

// Props interfaces
interface DropdownMenuProps {
  children: ReactNode;
}

interface DropdownToggleProps {
  children: ReactNode;
  className?: string;
  as?: "button" | "div";
}

interface DropdownContentProps {
  children: ReactNode;
  className?: string;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  usePortal?: boolean;
  width?: string | number;
}

// Main component
const DropdownMenu: React.FC<DropdownMenuProps> & {
  Toggle: React.FC<DropdownToggleProps>;
  Content: React.FC<DropdownContentProps>;
} = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setOpen(false);

  const contextValue = useMemo(
    () => ({ open, setOpen, toggleRef, menuRef, closeMenu }),
    [open]
  );

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      {children}
    </DropdownMenuContext.Provider>
  );
};

// Toggle component
DropdownMenu.Toggle = function Toggle({ children, className = "", as = "button" }) {
  const { open, setOpen, toggleRef } = useDropdownMenuContext();

  const handleClick = () => setOpen((prev) => !prev);

  const Component = as;

  return (
    <Component
      ref={toggleRef as any}
      onClick={handleClick}
      aria-haspopup="true"
      aria-expanded={open}
      className={className}
      {...(as === "button" && { type: "button" })}
    >
      {children}
    </Component>
  );
};

// Content component
DropdownMenu.Content = function Content({
  children,
  className = "",
  position = "bottom-left",
  usePortal = false,
  width = "auto",
}) {
  const { open, toggleRef, menuRef, setOpen } = useDropdownMenuContext();
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  // Compute menu position
  useLayoutEffect(() => {
    if (!open || !toggleRef.current) return;

    if (usePortal) {
      // Portal mode: Fixed positioning
      const rect = toggleRef.current.getBoundingClientRect();
      const style: React.CSSProperties = {
        position: "fixed",
        zIndex: 2147483647,
      };

      // Vertical positioning
      if (position.startsWith("bottom")) {
        style.top = rect.bottom + 6;
      } else {
        style.bottom = window.innerHeight - rect.top + 6;
      }

      // Horizontal positioning
      if (position.endsWith("left")) {
        style.left = rect.left;
      } else {
        style.right = window.innerWidth - rect.right;
      }

      if (typeof width === "number") {
        style.minWidth = Math.max(width, rect.width);
      } else if (width !== "auto") {
        style.width = width;
      }

      setMenuStyle(style);
    }
  }, [open, toggleRef, position, usePortal, width]);

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

  const menuElement = (
    <div ref={menuRef} role="menu" style={menuStyle} className={className}>
      {children}
    </div>
  );

  return usePortal ? createPortal(menuElement, document.body) : menuElement;
};

export default DropdownMenu;
