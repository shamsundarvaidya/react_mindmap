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
import { useNoteIndicatorToggle } from "../../hooks/useNoteIndicatorToggle";
import { Settings, ArrowRight, ArrowDown, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const SettingsMenu = () => {
  const dispatch = useAppDispatch();
  const { showNoteIndicator, toggleNoteIndicator } = useNoteIndicatorToggle();

  const handleLayoutChange = (layout: "LR" | "TB") => {
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
          <label className="w-full flex items-center gap-2 px-3 py-2 text-slate-300 text-sm cursor-pointer select-none hover:bg-slate-700 rounded-md transition-colors">
            <input
              type="checkbox"
              className="accent-blue-500"
              checked={showNoteIndicator}
              onChange={(e) => toggleNoteIndicator(e.target.checked)}
            />
            Show note indicator
          </label>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsMenu;
