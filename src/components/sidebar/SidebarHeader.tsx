import { SheetClose } from "../ui/sheet";
import { X } from "lucide-react";

export function SidebarHeader() {
  return (
    <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-3">
      <h2 className="text-lg font-bold text-white">
        Menu
      </h2>
      <SheetClose className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-opacity touch-manipulation">
        <X className="h-5 w-5 text-white" />
        <span className="sr-only">Close sidebar</span>
      </SheetClose>
    </div>
  );
}