import { useState } from "react";
import { Palette, ChevronDown, ChevronRight } from "lucide-react";
import { ThemeSelector } from '../theme/ThemeSelector';
import { BackgroundColorPicker } from '../theme/BackgroundColorPicker';
import { EdgeAnimationToggle } from '../theme/EdgeAnimationToggle';
import { ColorResetButton } from '../theme/ColorResetButton';

export function ThemeMenuSection() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeSelect = () => {
    // Keep menu open for theme selection - no auto-close
  };

  return (
    <div className="space-y-1">
      <button
        onClick={toggleMenu}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-700 hover:text-white transition-colors duration-200 border border-transparent hover:border-slate-600 touch-manipulation"
      >
        <div className="flex items-center gap-3">
          <Palette className="h-5 w-5" />
          <span className="text-base font-medium">Theme</span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
        ) : (
          <ChevronRight className="h-4 w-4 transition-transform duration-200" />
        )}
      </button>
      
      {/* Theme Menu Dropdown */}
      {isOpen && (
        <div className="ml-4 pl-4 border-l-2 border-slate-600 space-y-1 animate-in slide-in-from-top-1 duration-200">
          <div className="px-2 py-1">
            <span className="text-xs uppercase tracking-wide text-slate-500 font-medium">Color Schemes</span>
          </div>
          
          <div className="px-1 py-2">
            <ThemeSelector onSelect={handleThemeSelect} />
          </div>
          
          <div className="my-2 border-t border-slate-700"></div>
          
          <div className="px-2 py-1">
            <span className="text-xs uppercase tracking-wide text-slate-500 font-medium">Background & Effects</span>
          </div>
          
          <div className="px-1 py-2 space-y-2">
            <BackgroundColorPicker onSelect={handleThemeSelect} />
            <EdgeAnimationToggle />
          </div>
          
          <div className="my-2 border-t border-slate-700"></div>
          
          <div className="px-1 py-2">
            <ColorResetButton onSelect={handleThemeSelect} />
          </div>
        </div>
      )}
    </div>
  );
}