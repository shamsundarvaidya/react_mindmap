import React from "react";
import { Sun, Moon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store";
import { setTheme } from "../../store/themeSlice";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";

const THEME_NAMES = {
  light: "Light",
  dark: "Dark",
} as const;

const ThemeSwitch: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTheme = useAppSelector((state) => state.theme.selectedTheme.name);
  const isDark = selectedTheme === THEME_NAMES.dark;

  const selectTheme = (theme: string) => dispatch(setTheme(theme));

  const handleToggle = (checked: boolean) => {
    const theme = checked ? THEME_NAMES.dark : THEME_NAMES.light;
    selectTheme(theme);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="group inline-flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-slate-950/80 px-3 py-2 text-left shadow-lg shadow-cyan-900/40 backdrop-blur transition hover:border-cyan-300/40"
      role="group"
      aria-label="Toggle theme"
      title="Switch theme"
    >


      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-slate-300 transition-all",
            !isDark && "bg-white text-slate-900 shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
          )}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </div>

        <Label htmlFor="theme-switch" className="sr-only">
          Toggle theme
        </Label>
        <Switch
          id="theme-switch"
          checked={isDark}
          onCheckedChange={handleToggle}
          aria-label="Switch between light and dark themes"
          title="Switch theme"
        />

        <div
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-slate-400 transition-all",
            isDark && "bg-slate-800 text-slate-50 shadow-[0_10px_25px_rgba(0,0,0,0.45)]"
          )}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitch;
