import { useEffect, useRef, useState } from 'react';

export function useThemeMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    };
    
    if (open) {
      document.addEventListener('click', handleDocumentClick);
    }
    
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [open]);

  const toggleMenu = () => setOpen(prev => !prev);
  const closeMenu = () => setOpen(false);

  return {
    open,
    menuRef,
    toggleMenu,
    closeMenu,
  };
}