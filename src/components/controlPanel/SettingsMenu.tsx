import DropdownMenu, { useDropdownMenuContext } from "../common/DropdownMenu";
import { MenuItem, MenuButton } from "./fileActions/MenuComponents";
import { useAppDispatch } from "../../store";
import { applyLayout } from "../../store/mindmapSlice";
import NoteIndicatorToggle from "./settingActions/NoteIndicatorToggle";

const SettingsMenuContent = () => {
  const { closeMenu } = useDropdownMenuContext();
  const dispatch = useAppDispatch();

  const handleLayoutChange = (layout: "LR" | "TB" | "RADIAL") => {
    dispatch(applyLayout(layout));
    closeMenu();
  };

  return (
    <div className="space-y-1">
      <div className="px-3 py-2">
        <NoteIndicatorToggle />
      </div>
      <div className="h-px my-1 bg-slate-700" />
      <div className="px-3 py-1 text-xs uppercase tracking-wide text-slate-500">
        Layout settings
      </div>
      <MenuItem onClick={() => handleLayoutChange("LR")} className="hover:bg-slate-700 hover:text-white">
        <MenuButton icon="➡️" label="Horizontal layout" />
      </MenuItem>
      <MenuItem onClick={() => handleLayoutChange("TB")} className="hover:bg-slate-700 hover:text-white">
        <MenuButton icon="⬇️" label="Vertical layout" />
      </MenuItem>
      <MenuItem onClick={() => handleLayoutChange("RADIAL")} className="hover:bg-slate-700 hover:text-white">
        <MenuButton icon="🔘" label="Radial layout" />
      </MenuItem>
    </div>
  );
};

const SettingsMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Toggle className="px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-slate-100 text-slate-700">
        Settings ▾
      </DropdownMenu.Toggle>
      <DropdownMenu.Content 
        usePortal
        width={256}
        position="bottom-left"
        className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-2 text-sm font-medium text-slate-300"
      >
        <SettingsMenuContent />
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default SettingsMenu;
