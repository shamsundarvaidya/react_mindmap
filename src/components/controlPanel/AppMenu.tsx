import React from "react";
import FileMenu from "./FileMenu";
import SettingsMenu from "./SettingsMenu";
import ThemeMenu from "./ThemeMenu";

type Variant = "inline" | "stack";

interface AppMenuProps {
  variant?: Variant;
}

const AppMenu: React.FC<AppMenuProps> = ({ variant = "inline" }) => {
  if (variant === "stack") {
    return (
      <div className="flex flex-col gap-2 w-full">
        <FileMenu />
        <SettingsMenu />
      </div>
    );
  }

  // inline (desktop) - compact group
  return (
    <div
      className="inline-flex items-center bg-slate-800/90 rounded-lg shadow-lg border border-slate-600 overflow-hidden backdrop-blur-sm"
      role="group"
      aria-label="Application menu"
    >
      <div className="px-2 py-1 hidden md:block">
        <FileMenu />
      </div>
      <div className="border-l border-slate-500 px-2 py-1 hidden md:block">
        <SettingsMenu />
      </div>
    </div>
  );
};

export default AppMenu;
