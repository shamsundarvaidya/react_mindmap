import { useState, useRef, useEffect, useCallback } from "react";

interface UseDropdownMenuOptions {
  onClose?: () => void;
}

export const useDropdownMenu = (options: UseDropdownMenuOptions = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    options.onClose?.();
  }, [options]);
  
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Handle outside clicks
  useEffect(() => {
    if (!isOpen) return;

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        close();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close]);

  return {
    isOpen,
    open,
    close,
    toggle,
    menuRef,
  };
};
