
import FileMenu from "./FileMenu";
import SettingsMenu from "./SettingsMenu";

type AppMenuProps = {
  isDark?: boolean;
};

const AppMenu = ({ isDark = true }: AppMenuProps) => {
  return (
    <div
      className={
        isDark
          ? "inline-flex items-center gap-2 rounded-xl bg-slate-900/70 px-2 py-1 shadow-[0_12px_30px_rgba(0,0,0,0.45)] shadow-cyan-900/40 backdrop-blur"
          : "inline-flex items-center gap-2 rounded-xl bg-white/90 px-2 py-1 shadow-[0_10px_24px_rgba(15,118,110,0.14)]"
      }
      role="group"
      aria-label="Application menu"
    >
      <FileMenu isDark={isDark} />
      <SettingsMenu isDark={isDark} />
    </div>
  );
};

export default AppMenu;
