import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useCallback } from "react";
import { 
  File, 
  ChevronDown, 
  Save, 
  Download, 
  Image, 
  Upload, 
  Trash2
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useClearMindMap } from "../../hooks/useClearMindMap";
import { useSaveMindMap } from "../../hooks/useSaveMindMap";
import { useExportToPng } from "../../hooks/useExportToPng";
import { useExportToJson } from "../../hooks/useExportToJson";
import { useImportFromJson } from "../../hooks/useImportFromJson";
import { ClearMindMapDialog } from "../common/ClearMindMapDialog";

const FileMenu: React.FC<{ children?: React.ReactNode }> & {
  Toggle: React.FC;
  Dropdown: React.FC;
} = () => {
  const { isDialogOpen, openDialog, closeDialog, confirmClear } = useClearMindMap();
  const { handleSave } = useSaveMindMap();
  const { handleExportPng } = useExportToPng();
  const { handleExportToJson } = useExportToJson();
  const { inputRef, handleUpload, triggerFileSelect } = useImportFromJson();

  const createHandler = useCallback(
    (callback: () => void) => () => {
      callback();
    },
    []
  );

  return (
    <>
      <DropdownMenu>
      <DropdownMenuTrigger className={cn(
        "inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
        "hover:bg-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
      )}>
        <File className="h-4 w-4" />
        File
        <ChevronDown className="h-3 w-3 opacity-50" />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="start"
        className={cn(
          "w-60 bg-slate-800 border-slate-700 text-slate-300",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        )}
        sideOffset={5}
      >
        <DropdownMenuItem 
          onClick={createHandler(handleSave)}
          className="hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white cursor-pointer"
        >
          <Save className="mr-3 h-4 w-4" />
          <span>Save to browser</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={createHandler(handleExportToJson)}
          className="hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white cursor-pointer"
        >
          <Download className="mr-3 h-4 w-4" />
          <span>Download JSON</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={createHandler(handleExportPng)}
          className="hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white cursor-pointer"
        >
          <Image className="mr-3 h-4 w-4" />
          <span>Export as PNG</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={triggerFileSelect}
          className="hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white cursor-pointer"
        >
          <Upload className="mr-3 h-4 w-4" />
          <span>Import from JSON</span>
        </DropdownMenuItem>
        
        <input
          ref={inputRef}
          type="file"
          accept="application/json"
          onChange={handleUpload}
          className="hidden"
        />
        
        <DropdownMenuSeparator className="bg-slate-700 my-2" />
        
        <DropdownMenuItem 
          onClick={openDialog}
          className="hover:bg-red-500/20 text-red-400 focus:bg-red-500/20 focus:text-red-400 cursor-pointer"
        >
          <Trash2 className="mr-3 h-4 w-4" />
          <span>Clear Mind Map</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

      <ClearMindMapDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={confirmClear}
      />
    </>
  );
};

// Keep the subcomponents for backward compatibility with AppMenu
FileMenu.Toggle = function Toggle() {
  return null; // Not used in new implementation
};

FileMenu.Dropdown = function Dropdown() {
  return null; // Not used in new implementation
};

export default FileMenu;