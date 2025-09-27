import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateColor } from '../../store/mindmapSlice';
import { setCanvasBg, setEdgesAnimated, applyColorScheme, setColorScheme } from '../../store/appSettingsSlice';

// Swatch palettes extracted for readability
const LIGHT_SWATCHES = [
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
];

const DARK_SWATCHES = [
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
];

const ThemeMenu = () => {
  const dispatch = useAppDispatch();
  const { edges, nodes } = useAppSelector((s) => s.mindmap);
  const { edgesAnimated, colorScheme } = useAppSelector((s) => s.appSettings);

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

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
    <div className="relative" ref={menuRef}>
      <button
        className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 text-sm"
        onClick={() => setOpen((v) => !v)}
      >
        Theme ▾
      </button>
      {open && (
        <div className="absolute mt-1 left-0 w-56 bg-white border border-slate-200 rounded-md shadow-lg p-1 z-50">
          <button
            className="w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm"
            onClick={() => { applyScheme('Pastel'); setOpen(false); }}
          >
            <span className="text-lg">🎨</span>
            <span>Pastel</span>
          </button>
          <button
            className="w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm"
            onClick={() => { applyScheme('Vibrant'); setOpen(false); }}
          >
            <span className="text-lg">🔥</span>
            <span>Vibrant</span>
          </button>
            <button
              className="w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm"
              onClick={() => { applyScheme('Blues'); setOpen(false); }}
            >
              <span className="text-lg">💧</span>
              <span>Blues</span>
            </button>
            <button
              className="w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm"
              onClick={() => { applyScheme('Sunset'); setOpen(false); }}
            >
              <span className="text-lg">🌅</span>
              <span>Sunset</span>
            </button>
            <div className="h-px my-1 bg-slate-200" />
            <div className="px-3 py-1 text-xs uppercase tracking-wide text-slate-500">Background</div>
            <div className="px-3 pb-2 space-y-2">
              <div className="grid grid-cols-5 gap-2">
                {LIGHT_SWATCHES.map(opt => (
                  <button
                    key={opt.c}
                    title={opt.label}
                    className="h-6 w-6 rounded border border-slate-300 shadow-sm"
                    style={{ backgroundColor: opt.c }}
                    onClick={() => { dispatch(setCanvasBg(opt.c)); setOpen(false); }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {DARK_SWATCHES.map(opt => (
                  <button
                    key={opt.c}
                    title={opt.label}
                    className="h-6 w-6 rounded border border-slate-700 shadow-sm"
                    style={{ backgroundColor: opt.c }}
                    onClick={() => { dispatch(setCanvasBg(opt.c)); setOpen(false); }}
                  />
                ))}
              </div>
            </div>
            <label className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                className="accent-blue-600"
                checked={edgesAnimated}
                onChange={(e) => dispatch(setEdgesAnimated(e.target.checked))}
              />
              Animate edges
            </label>
            <button
              className="w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm"
              onClick={() => {
                nodes.forEach((n) => dispatch(updateColor({ id: n.id, color: '#D3D3D3' })));
                dispatch(setColorScheme(null));
                setOpen(false);
              }}
            >
              <span className="text-lg">↩️</span>
              <span>Reset colors</span>
            </button>
        </div>
      )}
    </div>
  );
};

export default ThemeMenu;
