
import FileMenu from "./FileMenu";
import SettingsMenu from "./SettingsMenu";
import ThemeMenu from "./ThemeMenu";





const AppMenu = () => {
 
  // inline (desktop) - compact group
  return (
    <div
      className="inline-flex items-center bg-slate-800/90 rounded-lg shadow-lg border border-slate-600 backdrop-blur-sm"
      role="group"
      aria-label="Application menu"
    >
      <div className="px-2 py-1 hidden md:block overflow-hidden first:rounded-l-lg">
        <FileMenu />
      </div>
      <div className="border-l border-slate-500 px-2 py-1 hidden md:block overflow-hidden">
        <SettingsMenu />
      </div>
      <div className="border-l border-slate-500 px-2 py-1 hidden md:block overflow-hidden last:rounded-r-lg">
        <ThemeMenu />
      </div>
    </div>
  );
};

export default AppMenu;
