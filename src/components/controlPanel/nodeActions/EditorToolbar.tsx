import React from 'react';
import { Button } from '../../ui/button';
import type { LucideIcon } from 'lucide-react';

export interface ToolbarItem {
  type: 'button' | 'separator';
  icon?: LucideIcon;
  action?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  label?: string;
}

interface EditorToolbarProps {
  items: ToolbarItem[];
  className?: string;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ items, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-1 p-2 border border-gray-300 rounded-md bg-gray-50 ${className}`}>
      {items.map((item, index) => {
        if (item.type === 'separator') {
          return <div key={index} className="w-px bg-gray-300 mx-1" />;
        }

        if (!item.icon || !item.action) {
          return null;
        }

        const Icon = item.icon;
        return (
          <Button
            key={index}
            type="button"
            variant={item.isActive ? 'default' : 'ghost'}
            size="sm"
            onClick={item.action}
            disabled={item.disabled}
            className={item.isActive ? 'bg-yellow-400 hover:bg-yellow-500 text-white' : ''}
            title={item.label}
          >
            <Icon className="h-4 w-4" />
          </Button>
        );
      })}
    </div>
  );
};

export default EditorToolbar;