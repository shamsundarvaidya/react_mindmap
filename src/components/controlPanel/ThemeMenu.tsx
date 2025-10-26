import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, Palette } from 'lucide-react';
import { ThemeSelector } from '../theme/ThemeSelector';
import { EdgeAnimationToggle } from '../theme/EdgeAnimationToggle';
import { ColorResetButton } from '../theme/ColorResetButton';
import { cn } from "../../lib/utils";
import { useState } from "react";

const ThemeMenu = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className={cn(
        "inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
        "hover:bg-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        "data-[state=open]:bg-slate-600"
      )}>
        <Palette className="h-4 w-4" />
        Theme
        <ChevronDown className="h-3 w-3 opacity-50" />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="start"
        className={cn(
          "w-64 bg-slate-800 border-slate-700 text-slate-300",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        )}
        sideOffset={5}
      >
        <DropdownMenuLabel className="text-xs uppercase tracking-wide text-slate-500 font-medium">
          Color Schemes
        </DropdownMenuLabel>
        
        <div className="p-1">
          <ThemeSelector onSelect={handleClose} />
        </div>
        
        <DropdownMenuSeparator className="bg-slate-700" />
        
        <DropdownMenuLabel className="text-xs uppercase tracking-wide text-slate-500 font-medium">
          Effects
        </DropdownMenuLabel>
        
        <div className="p-1">
          <EdgeAnimationToggle />
        </div>
        
        <DropdownMenuSeparator className="bg-slate-700" />
        
        <div className="p-1">
          <ColorResetButton onSelect={handleClose} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeMenu;
