import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { useAppDispatch, useAppSelector } from '../store';
import { updateLabel, applyLayout } from '../store/mindmapSlice';
import type { NodeData } from '../types/mindmap';
import { getThemeByName } from '../constants/themes';
import { getNodeChildren } from '../utils/nodeUtils';
import { useToggleCollapse } from '../hooks/useToggleCollapse';

const CustomNodeRect: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const { id, data } = props;
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);
  const showNoteIndicator = useAppSelector((state) => state.noteIndicator?.showNoteIndicator);
  const layoutDirection = useAppSelector((state) => state.mindmap.layoutDirection);
  const selectedTheme = useAppSelector((state) => state.theme.selectedTheme);
  const dispatch = useAppDispatch();
  const { handleToggleCollapse } = useToggleCollapse();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);

  // Calculate color from depth and selected theme
  const calculateNodeColor = () => {
    if (data.color) {
      return data.color; // Use stored color if available
    }
    
    const theme = getThemeByName(selectedTheme);
    if (!theme) {
      return '#D3D3D3'; // Default color
    }
    
    const depth = data.depth ?? 0;
    const palette = theme.colors;
    return palette[depth % palette.length];
  };

  const backgroundColor = calculateNodeColor();
  const isSelected = id === selectedNodeId;

  // Helpers to derive theme-matching highlight colors
  const hexToRgb = (hex: string) => {
    const normalized = hex.replace('#', '');
    const bigint = parseInt(normalized.length === 3
      ? normalized.split('').map((c) => c + c).join('')
      : normalized, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const rgbaString = (hex: string, alpha: number) => {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const darkenHex = (hex: string, amount: number) => {
    const { r, g, b } = hexToRgb(hex);
    const factor = Math.max(0, Math.min(1, 1 - amount));
    const dr = Math.round(r * factor);
    const dg = Math.round(g * factor);
    const db = Math.round(b * factor);
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return `#${toHex(dr)}${toHex(dg)}${toHex(db)}`;
  };

  const highlightBorder = isSelected ? darkenHex(backgroundColor, 0.5) : '#D1D5DB';
  const glowColor = rgbaString(backgroundColor, 0.55);
  const highlightRing = isSelected
    ? `0 0 0 4px ${glowColor}, 0 0 24px 6px ${rgbaString(backgroundColor, 0.35)}`
    : undefined;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const handleDoubleClick = () => {
    setEditing(true);
  };
  // Child relations
  const edges = useAppSelector((state) => state.mindmap.edges);
  const hasChildren = edges.some((e) => e.source === id);
  
  // Get all descendants (excluding the node itself)
  const childrenIds = getNodeChildren(id, edges);
  
  // Hidden descendant count when collapsed
  const hiddenCount = data.collapsed ? childrenIds.size : 0;

  const handleBlur = () => {
    dispatch(updateLabel({ id, label: value }));
    dispatch(applyLayout("None"));
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  return (
    <div
      style={{
        backgroundColor,
        borderColor: highlightBorder,
        borderWidth: isSelected ? 2 : 1,
        boxShadow: highlightRing,
        ['--glow-color' as any]: glowColor,
        animation: isSelected ? 'glow-pulse 1.2s ease-in-out infinite' : undefined,
        position: 'relative',
      }}
      className={`
        border rounded-xl px-5 py-3 min-w-[170px] shadow-lg transition-all duration-200
        flex flex-col items-center justify-center cursor-pointer
        hover:shadow-xl
        focus-within:ring-2 focus-within:ring-blue-200
      `}
      onDoubleClick={handleDoubleClick}
    >
      {/* Collapse toggle button */}
      {hasChildren && (
        <button
          title={data.collapsed ? 'Expand' : 'Collapse'}
          onClick={(e) => { 
            e.stopPropagation(); 
            handleToggleCollapse(id);
          }}
          onDoubleClick={(e) => e.stopPropagation()}
          className="absolute top-1 left-1 text-[11px] leading-none px-1.5 py-0.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 shadow"
          style={{ zIndex: 3 }}
        >
          {data.collapsed ? '+' : '−'}
        </button>
      )}

      <Handle
        type="target"
        position={layoutDirection === 'TB' ? Position.Top : Position.Left}
        className="!w-2 !h-2 !bg-gray-400"
      />
      {/* Note indicator */}
      {showNoteIndicator && data.note && data.note.trim() !== '' && (
        <span
          title="Note present"
          style={{
            position: 'absolute',
            top: 6,
            right: 10,
            background: '#fbbf24',
            color: '#fff',
            borderRadius: '50%',
            width: 18,
            height: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
            zIndex: 2,
          }}
        >
          📝
        </span>
      )}
      {editing ? (
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full border border-blue-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
      ) : (
        <div
          className="font-semibold text-base text-gray-800 truncate"
        >
          {data.label}
        </div>
      )}
      {/* Child count badge: show only when collapsed */}
      {data.collapsed && hiddenCount > 0 && (
        <span
          title={`${hiddenCount} hidden`}
          className="absolute bottom-1 right-1 rounded-full min-w-[18px] h-[18px] px-1 text-[11px] leading-none flex items-center justify-center text-white shadow"
          style={{ background: '#334155', zIndex: 2 }}
        >
          {hiddenCount}
        </span>
      )}
      <Handle
        type="source"
        position={layoutDirection === 'TB' ? Position.Bottom : Position.Right}
        className="!w-2 !h-2 !bg-gray-400"
      />
    </div>
  );
};

export default CustomNodeRect;
