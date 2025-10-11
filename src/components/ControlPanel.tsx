// (No store usage needed directly here after refactor)
import { useState, useEffect, useRef } from "react";
import NodeMenu from "./controlPanel/NodeMenu";
import FileMenu from "./controlPanel/FileMenu";
import SettingsMenu from "./controlPanel/SettingsMenu";
import ThemeMenu from "./controlPanel/ThemeMenu";


const ControlPanel = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    // Add a small delay to prevent immediate closing when opening
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClick);
    };
  }, [isMobileMenuOpen]);

  // Theme & settings handled via dedicated sub-menus
  return (
    <>
      <div className="px-4 py-2 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-slate-200 shadow-sm z-50 relative">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
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

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between">
          <div className="text-slate-800 font-semibold tracking-wide select-none">mind map</div>
          
          {/* Hamburger Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="p-2 rounded-md hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
            >
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-xl z-50 animate-slideDown"
          >
            <div className="px-4 py-4 space-y-4">
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-2">File Operations</div>
                <FileMenu />
              </div>
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-2">Settings</div>
                <SettingsMenu />
              </div>
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-2">Theme</div>
                <ThemeMenu />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Node Actions Bar - Always visible on mobile */}
      <div className="md:hidden px-4 py-3 bg-slate-50/90 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-2">Node Actions</div>
        <NodeMenu />
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default ControlPanel;
