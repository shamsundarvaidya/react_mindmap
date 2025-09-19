import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Safe localStorage access (avoids SSR / test errors)
function safeGet(key: string, fallback: string): string {
  try {
    if (typeof window !== 'undefined') {
      const v = window.localStorage.getItem(key);
      if (v !== null) return v;
    }
  } catch {}
  return fallback;
}

function safeSet(key: string, value: string) {
  try { if (typeof window !== 'undefined') window.localStorage.setItem(key, value); } catch {}
}

export interface AppSettingsState {
  showNoteIndicator: boolean;
  canvasBg: string;
  edgesAnimated: boolean;
  colorScheme: string | null;
}

const initialState: AppSettingsState = {
  showNoteIndicator: true,
  canvasBg: safeGet('canvas-bg', '#0B1220'),
  edgesAnimated: safeGet('edges-animated', 'true') === 'true',
  colorScheme: safeGet('node-color-scheme', '') || null,
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setShowNoteIndicator(state, action: PayloadAction<boolean>) {
      state.showNoteIndicator = action.payload;
    },
    setCanvasBg(state, action: PayloadAction<string>) {
      state.canvasBg = action.payload;
      safeSet('canvas-bg', action.payload);
    },
    setEdgesAnimated(state, action: PayloadAction<boolean>) {
      state.edgesAnimated = action.payload;
      safeSet('edges-animated', String(action.payload));
    },
    setColorScheme(state, action: PayloadAction<string | null>) {
      state.colorScheme = action.payload;
      if (action.payload) safeSet('node-color-scheme', action.payload);
    },
  },
});

export const { setShowNoteIndicator, setCanvasBg, setEdgesAnimated, setColorScheme } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;

// Thunk to apply a node color scheme based on node depth
import type { AppDispatch, RootState } from '.';
import { updateColor } from './mindmapSlice';

export const applyColorScheme = (schemeName: string) => (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();
  const nodes = state.mindmap.nodes;
  const edges = state.mindmap.edges;
  const schemes: Record<string, string[]> = {
    Pastel: ['#FFEEAD', '#AEDFF7', '#C3F7C0', '#F7C2E7', '#FFF1C1'],
    Vibrant: ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#845EC2'],
    Blues: ['#DCEEFB', '#B6E0FE', '#84C5F4', '#62B0E8', '#3A8DDE'],
    Sunset: ['#FFADAD', '#FFD6A5', '#FDFFB6', '#BDE0FE', '#A0C4FF'],
  };
  const palette = schemes[schemeName];
  if (!palette) return;
  // Compute depths
  const inDegree = new Map<string, number>();
  nodes.forEach(n => inDegree.set(n.id, 0));
  edges.forEach(e => inDegree.set(e.target, (inDegree.get(e.target) || 0) + 1));
  const roots = nodes.filter(n => (inDegree.get(n.id) || 0) === 0).map(n => n.id);
  const adjacency = new Map<string, string[]>();
  nodes.forEach(n => adjacency.set(n.id, []));
  edges.forEach(e => { const arr = adjacency.get(e.source); if (arr) arr.push(e.target); });
  const depthMap = new Map<string, number>();
  const queue: Array<{ id: string; depth: number }> = roots.map(r => ({ id: r, depth: 0 }));
  while (queue.length) {
    const { id, depth } = queue.shift()!;
    if (depthMap.has(id)) continue;
    depthMap.set(id, depth);
    (adjacency.get(id) || []).forEach(child => queue.push({ id: child, depth: depth + 1 }));
  }
  nodes.forEach(n => { if (!depthMap.has(n.id)) depthMap.set(n.id, 0); });
  nodes.forEach(n => {
    const d = depthMap.get(n.id) || 0;
    const color = palette[d % palette.length];
    dispatch(updateColor({ id: n.id, color }));
  });
  dispatch(setColorScheme(schemeName));
};
