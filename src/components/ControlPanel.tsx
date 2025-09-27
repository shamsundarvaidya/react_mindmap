// (No store usage needed directly here after refactor)
import NodeMenu from "./controlPanel/NodeMenu";
import FileMenu from "./controlPanel/FileMenu";
import SettingsMenu from "./controlPanel/SettingsMenu";
import ThemeMenu from "./controlPanel/ThemeMenu";


const ControlPanel = () => {
  // Theme & settings handled via dedicated sub-menus
  return (
    <div className="px-4 py-2 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-slate-200 flex items-center justify-between shadow-sm z-50 relative">
      <div className="flex items-center gap-3">
        <div className="text-slate-800 font-semibold tracking-wide select-none">mind map</div>

        <FileMenu />

        <SettingsMenu />
        <ThemeMenu />
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-3">
      <NodeMenu />     
      </div>
    </div>
  );
};

export default ControlPanel;
