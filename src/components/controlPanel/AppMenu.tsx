import React from 'react';
import FileMenu from './FileMenu';
import SettingsMenu from './SettingsMenu';
import ThemeMenu from './ThemeMenu';

type Variant = 'inline' | 'stack';

interface AppMenuProps {
  variant?: Variant;
}

const AppMenu: React.FC<AppMenuProps> = ({ variant = 'inline' }) => {
  if (variant === 'stack') {
    return (
      <div className="flex flex-col gap-2 w-full">
        <FileMenu>
          <FileMenu.Toggle />
          <FileMenu.Dropdown />
        </FileMenu>
        <SettingsMenu />
        <ThemeMenu />
      </div>
    );
  }

  // inline (desktop) - compact group
  return (
    <div
      className="inline-flex items-center bg-white/80 rounded-lg shadow-sm border border-slate-100 overflow-hidden"
      role="group"
      aria-label="Application menu"
    >
      <div className="px-2 py-1">
        <FileMenu>
          <FileMenu.Toggle />
          <FileMenu.Dropdown />
        </FileMenu>
      </div>
      <div className="border-l border-slate-100 px-2 py-1">
        <SettingsMenu />
      </div>
      <div className="border-l border-slate-100 px-2 py-1">
        <ThemeMenu />
      </div>
    </div>
  );
};

export default AppMenu;
