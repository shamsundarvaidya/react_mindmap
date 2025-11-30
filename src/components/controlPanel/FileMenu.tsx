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
  Trash2,
  FileSpreadsheet,
  FileImage,
  FileCode,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useClearMindMap } from "../../hooks/useClearMindMap";
import { useSaveMindMap } from "../../hooks/useSaveMindMap";
import { useExportToPng } from "../../hooks/useExportToPng";
import { useExportToSvg } from "../../hooks/useExportToSvg";
import { useExportToDxf } from "../../hooks/useExportToDxf";
import { useExportToJson } from "../../hooks/useExportToJson";
import { useImportFromJson } from "../../hooks/useImportFromJson";
import { useImportFromCSV } from "../../hooks/useImportFromCSV";
import { ClearMindMapDialog } from "../common/ClearMindMapDialog";

type FileMenuProps = {
  isDark?: boolean;
};

const FileMenu: React.FC<{ children?: React.ReactNode } & FileMenuProps> & {
  Toggle: React.FC;
  Dropdown: React.FC;
} = ({ isDark = true }) => {
  const { isDialogOpen, openDialog, closeDialog, confirmClear } = useClearMindMap();
  const { handleSave } = useSaveMindMap();
  const { handleExportPng } = useExportToPng();
  const { handleExportSvg } = useExportToSvg();
  const { handleExportDxf } = useExportToDxf();
  const { handleExportToJson } = useExportToJson();
  const { inputRef, handleUpload, triggerFileSelect } = useImportFromJson();
  const { inputRef: csvInputRef, handleCSVUpload, triggerCSVFileSelect } = useImportFromCSV();

  const createHandler = useCallback(
    (callback: () => void) => () => {
      callback();
    },
    []
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold shadow-[0_6px_18px_rgba(0,0,0,0.2)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
            isDark
              ? "border-cyan-500/30 bg-slate-900/70 text-slate-100 focus:ring-cyan-400/60 focus:ring-offset-slate-950 hover:bg-cyan-500/10"
              : "border-sky-200 bg-white/90 text-slate-900 focus:ring-sky-300 focus:ring-offset-white hover:bg-sky-50"
          )}
        >
          <File className={cn("h-4 w-4", isDark ? "text-cyan-200" : "text-sky-500")} />
          File
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
          <DropdownMenuItem
            onClick={createHandler(handleSave)}
            className={cn(
              "cursor-pointer rounded-lg",
              isDark
                ? "hover:bg-cyan-500/15 hover:text-white focus:bg-cyan-500/20 focus:text-white"
                : "hover:bg-sky-50 focus:bg-sky-100"
            )}
          >
            <Save className="mr-3 h-4 w-4" />
            <span>Save to browser</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className={cn("my-2", isDark ? "bg-cyan-500/20" : "bg-sky-200")} />
          
          <DropdownMenuItem
            onClick={createHandler(handleExportToJson)}
            className={cn(
              "cursor-pointer rounded-lg",
              isDark
                ? "hover:bg-cyan-500/15 hover:text-white focus:bg-cyan-500/20 focus:text-white"
                : "hover:bg-sky-50 focus:bg-sky-100"
            )}
          >
            <Download className="mr-3 h-4 w-4" />
            <span>Download JSON</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={createHandler(handleExportPng)}
            className={cn(
              "cursor-pointer rounded-lg",
              isDark
                ? "hover:bg-cyan-500/15 hover:text-white focus:bg-cyan-500/20 focus:text-white"
                : "hover:bg-sky-50 focus:bg-sky-100"
            )}
          >
            <Image className="mr-3 h-4 w-4" />
            <span>Export as PNG</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={createHandler(handleExportSvg)}
            className={cn(
              "cursor-pointer rounded-lg",
              isDark
                ? "hover:bg-cyan-500/15 hover:text-white focus:bg-cyan-500/20 focus:text-white"
                : "hover:bg-sky-50 focus:bg-sky-100"
            )}
          >
            <FileImage className="mr-3 h-4 w-4" />
            <span>Export as SVG</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={createHandler(handleExportDxf)}
            className={cn(
              "cursor-pointer rounded-lg",
              isDark
                ? "hover:bg-cyan-500/15 hover:text-white focus:bg-cyan-500/20 focus:text-white"
                : "hover:bg-sky-50 focus:bg-sky-100"
            )}
          >
            <FileCode className="mr-3 h-4 w-4" />
            <span>Export as DXF</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className={cn("my-2", isDark ? "bg-cyan-500/20" : "bg-sky-200")} />
          
          <DropdownMenuItem
            onClick={triggerFileSelect}
            className={cn(
              "cursor-pointer rounded-lg",
              isDark
                ? "hover:bg-cyan-500/15 hover:text-white focus:bg-cyan-500/20 focus:text-white"
                : "hover:bg-sky-50 focus:bg-sky-100"
            )}
          >
            <Upload className="mr-3 h-4 w-4" />
            <span>Import from JSON</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={triggerCSVFileSelect}
            className={cn(
              "cursor-pointer rounded-lg",
              isDark
                ? "hover:bg-cyan-500/15 hover:text-white focus:bg-cyan-500/20 focus:text-white"
                : "hover:bg-sky-50 focus:bg-sky-100"
            )}
          >
            <FileSpreadsheet className="mr-3 h-4 w-4" />
            <span>Import from CSV</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className={cn("my-2", isDark ? "bg-cyan-500/20" : "bg-sky-200")} />
          
          <DropdownMenuItem
            onClick={openDialog}
            className={cn(
              "cursor-pointer rounded-lg",
              isDark
                ? "text-red-300 hover:bg-red-500/15 focus:bg-red-500/20"
                : "text-red-600 hover:bg-rose-50 focus:bg-rose-100"
            )}
          >
            <Trash2 className="mr-3 h-4 w-4" />
            <span>Clear Mind Map</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hidden file inputs - must be outside dropdown */}
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        onChange={handleUpload}
        className="hidden"
      />
      
      <input
        ref={csvInputRef}
        type="file"
        accept=".csv"
        onChange={handleCSVUpload}
        className="hidden"
      />

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
