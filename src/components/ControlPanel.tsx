import NodeMenu from "./controlPanel/NodeMenu";
import AppMenu from "./controlPanel/AppMenu";
import ThemeSwitch from "./controlPanel/ThemeSwitch";
import Logo from "./common/Logo";
import { useAppSelector } from "../store";

const ControlPanel = () => {
  const selectedTheme = useAppSelector((state) => state.theme.selectedTheme.name);
  const isDark = selectedTheme === "Dark";

  const containerClasses = isDark
    ? "border-b border-cyan-900/40 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-4 py-3 shadow-[0_10px_40px_rgba(6,182,212,0.12)]"
    : "border-b border-cyan-500/20 bg-gradient-to-r from-white via-sky-50 to-cyan-50 px-4 py-3 shadow-[0_10px_30px_rgba(14,165,233,0.16)]";

  const frameClasses = isDark
    ? "flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-slate-900/80 px-3 py-2 shadow-inner shadow-cyan-900/40 backdrop-blur"
    : "flex items-center gap-3 rounded-xl border border-sky-200 bg-white/80 px-3 py-2 shadow-inner shadow-sky-100 backdrop-blur";

  return (
    <>
      <div className={containerClasses}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={frameClasses}>
              <Logo size="md" isDark={isDark} />
              <div className={isDark ? "h-10 w-px bg-cyan-500/30" : "h-10 w-px bg-sky-200/80"}></div>
              <AppMenu isDark={isDark} />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-3">
            <ThemeSwitch />
            <NodeMenu isDark={isDark} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
