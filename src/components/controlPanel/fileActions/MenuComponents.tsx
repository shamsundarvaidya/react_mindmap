import React from "react";

interface MenuItemProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

interface MenuButtonProps {
  icon: string;
  label: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  onClick, 
  children, 
  className = "" 
}) => (
  <div
    role="menuitem"
    tabIndex={0}
    className={`w-full text-left p-2 rounded-md transition-colors cursor-pointer ${className}`}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.();
      }
    }}
  >
    {children}
  </div>
);

export const MenuButton: React.FC<MenuButtonProps> = ({ icon, label }) => (
  <div className="inline-flex items-center gap-3">
    <span className="text-lg" aria-hidden="true">{icon}</span>
    <span>{label}</span>
  </div>
);
