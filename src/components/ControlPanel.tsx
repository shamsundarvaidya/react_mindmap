import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { updateColor } from "../store/mindmapSlice";
import { setCanvasBg, setEdgesAnimated, applyColorScheme, setColorScheme } from '../store/appSettingsSlice';
import NodeMenu from "./controlPanel/NodeMenu";
import FileMenu from "./controlPanel/FileMenu";
import SettingsMenu from "./controlPanel/SettingsMenu";


const ControlPanel = () => {
  const dispatch = useAppDispatch();
  const { edges, nodes } = useAppSelector((state) => state.mindmap);

  const [themeOpen, setThemeOpen] = useState(false);
  const { edgesAnimated, colorScheme } = useAppSelector(s => s.appSettings);
  const themeMenuRef = useRef<HTMLDivElement | null>(null);
  // edgesAnimated now from store

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      // layout menu removed / reserved
      if (themeMenuRef.current && !themeMenuRef.current.contains(target)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  // Color scheme by node depth
  // schemes & depth computations moved to thunk in store

  const applyScheme = (schemeName: string) => {
    dispatch(applyColorScheme(schemeName));
  };

  // Re-apply scheme when graph size changes so new nodes adopt colors
  useEffect(() => {
    if (colorScheme) {
      dispatch(applyColorScheme(colorScheme));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes.length, edges.length, colorScheme]);



  return (
    <div className="px-4 py-2 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-slate-200 flex items-center justify-between shadow-sm z-50 relative">
      <div className="flex items-center gap-3">
        <div className="text-slate-800 font-semibold tracking-wide select-none">mind map</div>

        <FileMenu />

        <SettingsMenu />

        <div className="relative" ref={themeMenuRef}>
          <button
            className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 text-sm"
            onClick={() => {
              setThemeOpen((v) => !v);
            }}
          >
            Theme ▾
          </button>
          {themeOpen && (
            <div className="absolute mt-1 left-0 w-56 bg-white border border-slate-200 rounded-md shadow-lg p-1 z-50">
              <button
                className="w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm"
                onClick={() => { applyScheme('Pastel'); setThemeOpen(false); }}
              >
                <span className="text-lg">🎨</span>
                <span>Pastel</span>
              </button>
              <button
                className="w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm"
                onClick={() => { applyScheme('Vibrant'); setThemeOpen(false); }}
              >
                <span className="text-lg">🔥</span>
                <span>Vibrant</span>
              </button>
              <button
                className="w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm"
                onClick={() => { applyScheme('Blues'); setThemeOpen(false); }}
              >
                <span className="text-lg">💧</span>
                <span>Blues</span>
              </button>
              <button
                className="w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm"
                onClick={() => { applyScheme('Sunset'); setThemeOpen(false); }}
              >
                <span className="text-lg">🌅</span>
                <span>Sunset</span>
              </button>
              <div className="h-px my-1 bg-slate-200" />
              <div className="px-3 py-1 text-xs uppercase tracking-wide text-slate-500">Background</div>
              <div className="px-3 pb-2 space-y-2">
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { c: '#ffffff', label: 'White' },
                    { c: '#F8FAFC', label: 'Slate-50' },
                    { c: '#F1F5F9', label: 'Slate-100' },
                    { c: '#FFF7ED', label: 'Orange-50' },
                    { c: '#ECFEFF', label: 'Cyan-50' },
                    { c: '#FDF2F8', label: 'Pink-50' },
                    { c: '#F0FDF4', label: 'Green-50' },
                    { c: '#EFF6FF', label: 'Blue-50' },
                    { c: '#FEF9C3', label: 'Yellow-100' },
                    { c: '#E2E8F0', label: 'Slate-300' },
                  ].map((opt) => (
                    <button
                      key={opt.c}
                      title={opt.label}
                      className="h-6 w-6 rounded border border-slate-300 shadow-sm"
                      style={{ backgroundColor: opt.c }}
                      onClick={() => { dispatch(setCanvasBg(opt.c)); setThemeOpen(false); }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { c: '#0B1220', label: 'Night' },
                    { c: '#0F172A', label: 'Slate-900' },
                    { c: '#111827', label: 'Gray-900' },
                    { c: '#1F2937', label: 'Gray-800' },
                    { c: '#1E293B', label: 'Slate-800' },
                    { c: '#0C4A6E', label: 'Cyan-900' },
                    { c: '#3730A3', label: 'Indigo-800' },
                    { c: '#7C2D12', label: 'Orange-900' },
                    { c: '#134E4A', label: 'Teal-900' },
                    { c: '#4A044E', label: 'Fuchsia-950' },
                  ].map((opt) => (
                    <button
                      key={opt.c}
                      title={opt.label}
                      className="h-6 w-6 rounded border border-slate-700 shadow-sm"
                      style={{ backgroundColor: opt.c }}
                      onClick={() => { dispatch(setCanvasBg(opt.c)); setThemeOpen(false); }}
                    />
                  ))}
                </div>
              </div>
              <label className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={edgesAnimated}
                  onChange={(e) => {
                    const val = e.target.checked;
                    dispatch(setEdgesAnimated(val));
                  }}
                />
                Animate edges
              </label>
              <button
                className="w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm"
                onClick={() => {
                  nodes.forEach((n) => dispatch(updateColor({ id: n.id, color: "#D3D3D3" })));
                  dispatch(setColorScheme(null));
                  setThemeOpen(false);
                }}
              >
                <span className="text-lg">↩️</span>
                <span>Reset colors</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-3">
      <NodeMenu />     
      </div>
    </div>
  );
};

export default ControlPanel;
