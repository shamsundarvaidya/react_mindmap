import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { FileMenuSection } from "./sidebar/FileMenuSection";
import { SettingsMenuSection } from "./sidebar/SettingsMenuSection";
import { ThemeMenuSection } from "./sidebar/ThemeMenuSection";


export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger className="p-2 hover:bg-white/20 hover:text-white rounded-md transition-colors duration-200 border border-white/20 bg-white/10">
        <Menu className="h-5 w-5 text-white" />
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-slate-900 border-r border-slate-700">
        <div className="flex flex-col h-full">
          <SidebarHeader />
          <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 space-y-2 pr-2 pb-4">
            <FileMenuSection />
            <ThemeMenuSection />
            <SettingsMenuSection />
            
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
