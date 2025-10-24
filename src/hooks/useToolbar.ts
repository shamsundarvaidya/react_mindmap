import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  Undo, 
  Redo 
} from 'lucide-react';
import type { ToolbarItem } from '../components/controlPanel/nodeActions/EditorToolbar';

interface UseToolbarProps {
  formatActions: {
    toggleBold: () => void;
    toggleItalic: () => void;
    toggleUnderline: () => void;
    toggleBulletList: () => void;
    toggleOrderedList: () => void;
    undo: () => void;
    redo: () => void;
  };
  formatStates: {
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    isBulletList: boolean;
    isOrderedList: boolean;
    canUndo: boolean;
    canRedo: boolean;
  };
}

export function useToolbar({ formatActions, formatStates }: UseToolbarProps): ToolbarItem[] {
  return [
    {
      type: 'button' as const,
      icon: Bold,
      action: formatActions.toggleBold,
      isActive: formatStates.isBold,
      label: 'Bold',
    },
    {
      type: 'button' as const,
      icon: Italic,
      action: formatActions.toggleItalic,
      isActive: formatStates.isItalic,
      label: 'Italic',
    },
    {
      type: 'button' as const,
      icon: UnderlineIcon,
      action: formatActions.toggleUnderline,
      isActive: formatStates.isUnderline,
      label: 'Underline',
    },
    {
      type: 'separator' as const,
    },
    {
      type: 'button' as const,
      icon: List,
      action: formatActions.toggleBulletList,
      isActive: formatStates.isBulletList,
      label: 'Bullet List',
    },
    {
      type: 'button' as const,
      icon: ListOrdered,
      action: formatActions.toggleOrderedList,
      isActive: formatStates.isOrderedList,
      label: 'Numbered List',
    },
    {
      type: 'separator' as const,
    },
    {
      type: 'button' as const,
      icon: Undo,
      action: formatActions.undo,
      isActive: false,
      disabled: !formatStates.canUndo,
      label: 'Undo',
    },
    {
      type: 'button' as const,
      icon: Redo,
      action: formatActions.redo,
      isActive: false,
      disabled: !formatStates.canRedo,
      label: 'Redo',
    },
  ];
}