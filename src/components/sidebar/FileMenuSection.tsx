import { useState, useCallback } from "react";
import { File, ChevronDown, ChevronRight, Save, Download, Image, Upload, Trash2 } from "lucide-react";
import { useClearMindMap } from "../../hooks/useClearMindMap";
import { useSaveMindMap } from "../../hooks/useSaveMindMap";
import { useExportToPng } from "../../hooks/useExportToPng";
import { useExportToJson } from "../../hooks/useExportToJson";
import { useImportFromJson } from "../../hooks/useImportFromJson";

export function FileMenuSection() {
  const [isOpen, setIsOpen] = useState(false);
  
  // File menu hooks
  const handleClear = useClearMindMap();
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="space-y-1">
      <button
        onClick={toggleMenu}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-700 hover:text-white transition-colors duration-200 border border-transparent hover:border-slate-600 touch-manipulation"
      >
        <div className="flex items-center gap-3">
          <File className="h-5 w-5" />
          <span className="text-base font-medium">File</span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
        ) : (
          <ChevronRight className="h-4 w-4 transition-transform duration-200" />
        )}
      </button>
      
      {/* File Menu Dropdown */}
      {isOpen && (
        <div className="ml-4 pl-4 border-l-2 border-slate-600 space-y-1 animate-in slide-in-from-top-1 duration-200">
          <button
            onClick={createHandler(handleSave)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 touch-manipulation"
          >
            <Save className="h-4 w-4" />
            <span className="text-sm">Save to browser</span>
          </button>
          
          <button
            onClick={createHandler(handleExportToJson)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 touch-manipulation"
          >
            <Download className="h-4 w-4" />
            <span className="text-sm">Download JSON</span>
          </button>
          
          <button
            onClick={createHandler(handleExportPng)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 touch-manipulation"
          >
            <Image className="h-4 w-4" />
            <span className="text-sm">Export as PNG</span>
          </button>
          
          <button
            onClick={triggerFileSelect}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 touch-manipulation"
          >
            <Upload className="h-4 w-4" />
            <span className="text-sm">Import from JSON</span>
          </button>
          
          <div className="my-2 border-t border-slate-700"></div>
          
          <button
            onClick={createHandler(handleClear)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200 touch-manipulation"
          >
            <Trash2 className="h-4 w-4" />
            <span className="text-sm">Clear Mind Map</span>
          </button>
        </div>
      )}
      
      {/* Hidden file input for import */}
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}