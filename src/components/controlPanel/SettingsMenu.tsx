import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppDispatch } from "../../store";
import { applyLayout } from "../../store/mindmapSlice";
import NoteIndicatorToggle from "./settingActions/NoteIndicatorToggle";
import { Settings, ArrowRight, ArrowDown, Circle, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const SettingsMenu = () => {
  const dispatch = useAppDispatch();

  const handleLayoutChange = (layout: "LR" | "TB" | "RADIAL") => {
    dispatch(applyLayout(layout));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(
        "inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
        "hover:bg-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        "data-[state=open]:bg-slate-600"
      )}>
        <Settings className="h-4 w-4" />
        Settings
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
        <div className="p-2">
          <NoteIndicatorToggle />
        </div>
        
        <DropdownMenuSeparator className="bg-slate-700" />
        
        <DropdownMenuLabel className="text-xs uppercase tracking-wide text-slate-500 font-medium">
          Layout Settings
        </DropdownMenuLabel>
        
        <DropdownMenuItem 
          onClick={() => handleLayoutChange("LR")}
          className="hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white cursor-pointer"
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          <span>Horizontal Layout</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleLayoutChange("TB")}
          className="hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white cursor-pointer"
        >
          <ArrowDown className="mr-2 h-4 w-4" />
          <span>Vertical Layout</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleLayoutChange("RADIAL")}
          className="hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white cursor-pointer"
        >
          <Circle className="mr-2 h-4 w-4" />
          <span>Radial Layout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsMenu;
