import { useCallback } from "react";
import { MenuItem, MenuButton } from "./fileActions/MenuComponents";
import { useFileMenu } from "./FileMenuContext";
import { useClearMindMap } from "../../hooks/useClearMindMap";
import { useSaveMindMap } from "../../hooks/useSaveMindMap";
import { useExportToPng } from "../../hooks/useExportToPng";
import { useExportToJson } from "../../hooks/useExportToJson";
import { useImportFromJson } from "../../hooks/useImportFromJson";

// Constants
const MENU_ITEM_HOVER_CLASS = "hover:bg-slate-700 hover:text-white";
const DANGER_ITEM_HOVER_CLASS = "hover:bg-red-500/20 text-red-400";

const FileMenuItems = () => {
  const { setOpen } = useFileMenu();
  const handleClear = useClearMindMap();
  const { handleSave } = useSaveMindMap();
  const { handleExportPng } = useExportToPng();
  const { handleExportToJson } = useExportToJson();
  const { inputRef, handleUpload, triggerFileSelect } = useImportFromJson(() => setOpen(false));

  const createHandler = useCallback(
    (callback: () => void) => () => {
      callback();
      setOpen(false);
    },
    [setOpen]
  );

  return (
    <>
      <MenuItem onClick={createHandler(handleSave)} className={MENU_ITEM_HOVER_CLASS}>
        <MenuButton icon="💾" label="Save to browser" />
      </MenuItem>
      <MenuItem onClick={createHandler(handleExportToJson)} className={MENU_ITEM_HOVER_CLASS}>
        <MenuButton icon="⬇️" label="Download JSON" />
      </MenuItem>
      <MenuItem onClick={createHandler(handleExportPng)} className={MENU_ITEM_HOVER_CLASS}>
        <MenuButton icon="🖼️" label="Export as PNG" />
      </MenuItem>
      <MenuItem onClick={triggerFileSelect} className={MENU_ITEM_HOVER_CLASS}>
        <MenuButton icon="⬆️" label="Import from JSON" />
      </MenuItem>
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        onChange={handleUpload}
        className="hidden"
      />
      <div className="!mt-2 pt-2 border-t border-slate-700">
        <MenuItem onClick={createHandler(handleClear)} className={DANGER_ITEM_HOVER_CLASS}>
          <MenuButton icon="🗑️" label="Clear Mind Map" />
        </MenuItem>
      </div>
    </>
  );
};

export default FileMenuItems;
