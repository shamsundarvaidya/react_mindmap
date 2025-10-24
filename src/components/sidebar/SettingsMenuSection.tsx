import { useState, useCallback } from "react";
import { Settings, ChevronDown, ChevronRight, ArrowRight, ArrowDown } from "lucide-react";
import { useNoteIndicatorToggle } from "../../hooks/useNoteIndicatorToggle";
import { useLayoutChange } from "../../hooks/useLayoutChange";

export function SettingsMenuSection() {
  const [isOpen, setIsOpen] = useState(false);
  const { showNoteIndicator, toggleNoteIndicator } = useNoteIndicatorToggle();
  const { setHorizontalLayout, setVerticalLayout } = useLayoutChange();

  const createHandler = useCallback(
    (callback: () => void) => () => {
      callback();
    },
    []
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="space-y-1">
      <button
        onClick={toggleMenu}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-700 hover:text-white transition-colors duration-200 border border-transparent hover:border-slate-600 touch-manipulation"
      >
        <div className="flex items-center gap-3">
          <Settings className="h-5 w-5" />
          <span className="text-base font-medium">Settings</span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
        ) : (
          <ChevronRight className="h-4 w-4 transition-transform duration-200" />
        )}
      </button>
      
      {/* Settings Menu Dropdown */}
      {isOpen && (
        <div className="ml-4 pl-4 border-l-2 border-slate-600 space-y-1 animate-in slide-in-from-top-1 duration-200">
          {/* Note Indicator Toggle */}
          <div className="px-4 py-2">
            <label className="w-full flex items-center gap-2 px-3 py-2 text-slate-300 text-sm cursor-pointer select-none hover:bg-slate-700 rounded-md transition-colors">
              <input
                type="checkbox"
                className="accent-blue-500"
                checked={showNoteIndicator}
                onChange={e => toggleNoteIndicator(e.target.checked)}
              />
              Show note indicator
            </label>
          </div>
          
          <div className="my-2 border-t border-slate-700"></div>
          
          <div className="px-2 py-1">
            <span className="text-xs uppercase tracking-wide text-slate-500 font-medium">Layout Settings</span>
          </div>
          
          <button
            onClick={createHandler(setHorizontalLayout)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 touch-manipulation"
          >
            <ArrowRight className="h-4 w-4" />
            <span className="text-sm">Horizontal Layout</span>
          </button>
          
          <button
            onClick={createHandler(setVerticalLayout)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 touch-manipulation"
          >
            <ArrowDown className="h-4 w-4" />
            <span className="text-sm">Vertical Layout</span>
          </button>
        </div>
      )}
    </div>
  );
}