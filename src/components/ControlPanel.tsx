import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { addNode, deleteNode, applyLayout, updateColor } from "../store/mindmapSlice";
import NodeButtons from "./controlPanel/NodeButtons";
import ClearButton from "./controlPanel/ClearButton";
import SaveButton from "./controlPanel/SaveButton";
import ImportButton from "./controlPanel/ImportButton";
import ExportButton from "./controlPanel/ExportButton";
import ExportPngButton from "./controlPanel/ExportToPngButton";


const ControlPanel = ({ renderModal }: { renderModal?: ((modal: React.ReactNode) => void) | undefined }) => {
  const dispatch = useAppDispatch();
  const { selectedNodeId, edges, nodes } = useAppSelector((state) => state.mindmap);

  const [fileOpen, setFileOpen] = useState(false);
  const [layoutOpen, setLayoutOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  
  const setCanvasBackground = (color: string) => {
    try {
      localStorage.setItem('canvas-bg', color);
      window.dispatchEvent(new CustomEvent('canvas-bg-change', { detail: { color } }));
    } catch {}
  };
  const [currentSchemeName, setCurrentSchemeName] = useState<string | null>(() => {
    return localStorage.getItem('node-color-scheme');
  });
  const fileMenuRef = useRef<HTMLDivElement | null>(null);
  const layoutMenuRef = useRef<HTMLDivElement | null>(null);
  const themeMenuRef = useRef<HTMLDivElement | null>(null);
  const [edgesAnimated, setEdgesAnimated] = useState<boolean>(() => {
    const saved = localStorage.getItem('edges-animated');
    return saved ? saved === 'true' : true;
  });

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (fileMenuRef.current && !fileMenuRef.current.contains(target)) {
        setFileOpen(false);
      }
      if (layoutMenuRef.current && !layoutMenuRef.current.contains(target)) {
        setLayoutOpen(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(target)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  // Color scheme by node depth
  const schemes: Record<string, string[]> = {
    Pastel: ["#FFEEAD", "#AEDFF7", "#C3F7C0", "#F7C2E7", "#FFF1C1"],
    Vibrant: ["#FF6B6B", "#4D96FF", "#6BCB77", "#FFD93D", "#845EC2"],
    Blues: ["#DCEEFB", "#B6E0FE", "#84C5F4", "#62B0E8", "#3A8DDE"],
    Sunset: ["#FFADAD", "#FFD6A5", "#FDFFB6", "#BDE0FE", "#A0C4FF"],
  };

  const computeDepths = (): Map<string, number> => {
    const inDegree = new Map<string, number>();
    nodes.forEach((n) => inDegree.set(n.id, 0));
    edges.forEach((e) => {
      inDegree.set(e.target, (inDegree.get(e.target) || 0) + 1);
    });
    const roots = nodes.filter((n) => (inDegree.get(n.id) || 0) === 0).map((n) => n.id);
    const adjacency = new Map<string, string[]>();
    nodes.forEach((n) => adjacency.set(n.id, []));
    edges.forEach((e) => {
      adjacency.get(e.source)!.push(e.target);
    });
    const depthMap = new Map<string, number>();
    const queue: Array<{ id: string; depth: number }> = roots.map((r) => ({ id: r, depth: 0 }));
    while (queue.length) {
      const { id, depth } = queue.shift()!;
      if (depthMap.has(id)) continue;
      depthMap.set(id, depth);
      const children = adjacency.get(id) || [];
      children.forEach((child) => queue.push({ id: child, depth: depth + 1 }));
    }
    // For any disconnected nodes not reached, set depth 0
    nodes.forEach((n) => {
      if (!depthMap.has(n.id)) depthMap.set(n.id, 0);
    });
    return depthMap;
  };

  const applyScheme = (schemeName: string) => {
    const palette = schemes[schemeName];
    if (!palette) return;
    const depths = computeDepths();
    nodes.forEach((n) => {
      const d = depths.get(n.id) || 0;
      const color = palette[d % palette.length];
      dispatch(updateColor({ id: n.id, color }));
    });
    // optionally re-layout neutral to avoid jumps
    dispatch(applyLayout("None"));
    setCurrentSchemeName(schemeName);
    localStorage.setItem('node-color-scheme', schemeName);
  };

  // Re-apply scheme when graph size changes so new nodes adopt colors
  useEffect(() => {
    if (currentSchemeName) {
      applyScheme(currentSchemeName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes.length, edges.length]);

  const isRootNode = (id: string) => {
    return !edges.some((e) => e.target === id);
  };

  const handleDelete = () => {
    if (!selectedNodeId) return;
    if (isRootNode(selectedNodeId)) {
      alert("Cannot delete the root node.");
      return;
    }
    const confirmed = window.confirm(
      "Are you sure you want to delete this node and all its children?"
    );
    if (confirmed) {
      dispatch(deleteNode(selectedNodeId));
      dispatch(applyLayout("None"));
    }
  };

  return (
    <div className="px-4 py-2 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-slate-200 flex items-center justify-between shadow-sm z-50 relative">
      <div className="flex items-center gap-3">
        <div className="text-slate-800 font-semibold tracking-wide select-none">mind map</div>

        <div className="relative" ref={fileMenuRef}>
          <button
            className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 text-sm"
            onClick={() => {
              setFileOpen((v) => !v);
              setLayoutOpen(false);
              setThemeOpen(false);
            }}
          >
            File ▾
          </button>
          {fileOpen && (
            <div className="absolute mt-1 left-0 w-56 bg-white border border-slate-200 rounded-md shadow-lg p-1 z-50">
              <div onClick={() => setFileOpen(false)}>
                <SaveButton variant="menu" />
              </div>
              <div onClick={() => setFileOpen(false)}>
                <ExportButton variant="menu" />
              </div>
              <div onClick={() => setFileOpen(false)}>
                <ExportPngButton variant="menu" />
              </div>
              <div>
                <ImportButton variant="menu" onComplete={() => setFileOpen(false)} />
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={layoutMenuRef}>
          <button
            className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 text-sm"
            onClick={() => {
              setLayoutOpen((v) => !v);
              setFileOpen(false);
              setThemeOpen(false);
            }}
          >
            Layout ▾
          </button>
          {layoutOpen && (
            <div className="absolute mt-1 left-0 w-56 bg-white border border-slate-200 rounded-md shadow-lg p-1 z-50">
              <button
                className="w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm"
                onClick={() => {
                  dispatch(applyLayout("LR"));
                  setLayoutOpen(false);
                }}
              >
                <span className="text-lg">➡️</span>
                <span>Horizontal layout</span>
              </button>
              <button
                className="w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm"
                onClick={() => {
                  dispatch(applyLayout("TB"));
                  setLayoutOpen(false);
                }}
              >
                <span className="text-lg">⬇️</span>
                <span>Vertical layout</span>
              </button>
              <div onClick={() => setLayoutOpen(false)}>
                <ClearButton variant="menu" />
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={themeMenuRef}>
          <button
            className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 text-sm"
            onClick={() => {
              setThemeOpen((v) => !v);
              setFileOpen(false);
              setLayoutOpen(false);
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
                      onClick={() => { setCanvasBackground(opt.c); setThemeOpen(false); }}
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
                      onClick={() => { setCanvasBackground(opt.c); setThemeOpen(false); }}
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
                    setEdgesAnimated(val);
                    localStorage.setItem('edges-animated', String(val));
                    window.dispatchEvent(new CustomEvent('edges-animated-change', { detail: { animated: val } }));
                  }}
                />
                Animate edges
              </label>
              <button
                className="w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm"
                onClick={() => {
                  nodes.forEach((n) => dispatch(updateColor({ id: n.id, color: "#ffffff" })));
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

      <div className="flex items-center gap-3">
      <NodeButtons 
        renderModal={renderModal} 
          onAdd={() => {
            dispatch(addNode());
            dispatch(applyLayout("None"));
          }}
        onDelete={handleDelete}
        canAdd={!!selectedNodeId}
        canDelete={!!selectedNodeId}
        canNote={!!selectedNodeId}
      />
      
      </div>
    </div>
  );
};

export default ControlPanel;
