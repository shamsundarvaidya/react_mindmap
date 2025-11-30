import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,

  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppDispatch } from "../../store";
import { applyLayout } from "../../store/mindmapSlice";
import { Settings, ArrowRight, ArrowDown, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

type SettingsMenuProps = {
  isDark?: boolean;
};

const SettingsMenu = ({ isDark = true }: SettingsMenuProps) => {
  const dispatch = useAppDispatch();

  const handleLayoutChange = (layout: "LR" | "TB") => {
    dispatch(applyLayout(layout));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold shadow-[0_6px_18px_rgba(0,0,0,0.2)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        isDark
          ? "border-cyan-500/30 bg-slate-900/70 text-slate-100 focus:ring-cyan-400/60 focus:ring-offset-slate-950 hover:bg-cyan-500/10 data-[state=open]:bg-cyan-500/10"
          : "border-sky-200 bg-white/90 text-slate-900 focus:ring-sky-300 focus:ring-offset-white hover:bg-sky-50 data-[state=open]:bg-sky-100"
      )}>
        <Settings className={cn("h-4 w-4", isDark ? "text-cyan-200" : "text-sky-500")} />
        Settings
        <ChevronDown className={cn("h-3 w-3", isDark ? "text-cyan-200/70" : "text-slate-500")} />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="start"
        className={cn(
          "w-64 rounded-xl border text-slate-100 shadow-xl backdrop-blur-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          isDark
            ? "border-cyan-500/30 bg-slate-950/95 shadow-cyan-900/30"
            : "border-sky-200 bg-white/95 text-slate-900 shadow-sky-100/80"
        )}
        sideOffset={5}
      >
        
        
        <DropdownMenuLabel className={cn(
          "text-xs uppercase tracking-wide font-semibold",
          isDark ? "text-cyan-200/70" : "text-sky-500"
        )}>
          Layout Settings
        </DropdownMenuLabel>
        
        <DropdownMenuItem 
          onClick={() => handleLayoutChange("LR")}
          className={cn(
            "cursor-pointer rounded-lg",
            isDark
              ? "hover:bg-cyan-500/15 hover:text-white focus:bg-cyan-500/20 focus:text-white"
              : "hover:bg-sky-50 focus:bg-sky-100"
          )}
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          <span>Horizontal Layout</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleLayoutChange("TB")}
          className={cn(
            "cursor-pointer rounded-lg",
            isDark
              ? "hover:bg-cyan-500/15 hover:text-white focus:bg-cyan-500/20 focus:text-white"
              : "hover:bg-sky-50 focus:bg-sky-100"
          )}
        >
          <ArrowDown className="mr-2 h-4 w-4" />
          <span>Vertical Layout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsMenu;
