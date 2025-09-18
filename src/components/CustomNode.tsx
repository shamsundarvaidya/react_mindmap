import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { useAppDispatch, useAppSelector } from '../store';
import { applyLayout, updateLabel } from '../store/mindmapSlice';
import type { NodeData } from '../types/mindmap';

const CustomNode: React.FC<NodeProps<Node<NodeData>>> = ({ id, data }) => {
  const layoutDirection = useAppSelector((state) => state.mindmap.layoutDirection);
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);
  const showNoteIndicator = useAppSelector((state) => state.appSettings?.showNoteIndicator);
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);


  // For radial layout, use circular node and center label, and ports on left/right
  const isRadial = layoutDirection === 'RADIAL';
  const sourcePosition = isRadial
    ? Position.Right
    : layoutDirection === 'TB'
      ? Position.Bottom
      : Position.Right;
  const targetPosition = isRadial
    ? Position.Left
    : layoutDirection === 'TB'
      ? Position.Top
      : Position.Left;



  const backgroundColor = (data.color as string) || '#ffffff';
  const isSelected = id === selectedNodeId;

  // For radial, calculate node size based on label length
  const baseDiameter = 60;
  const labelLength = data.label ? data.label.length : 1;
  const diameter = isRadial
    ? Math.max(baseDiameter, 18 * Math.ceil(labelLength / 5) + 24)
    : undefined;

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

  const highlightBorder = isSelected ? darkenHex(backgroundColor, 0.5) : '#D1D5DB'; // stronger contrast when selected
  const glowColor = rgbaString(backgroundColor, 0.55);
  const highlightRing = isSelected
    ? `0 0 0 4px ${glowColor}, 0 0 24px 6px ${rgbaString(backgroundColor, 0.35)}`
    : undefined;

  // Focus on input when editing starts
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    dispatch(updateLabel({ id, label: value }));
    dispatch(applyLayout("None"))
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
        ...(isRadial
          ? {
              width: diameter,
              height: diameter,
              minWidth: diameter,
              minHeight: diameter,
              maxWidth: diameter,
              maxHeight: diameter,
              borderRadius: '50%',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              overflow: 'hidden',
            }
          : {})
      }}
      className={`
        border ${isRadial ? '' : 'rounded-xl px-5 py-3 min-w-[170px]'} shadow-lg transition-all duration-200
        flex flex-col items-center justify-center cursor-pointer
        hover:shadow-xl
        focus-within:ring-2 focus-within:ring-blue-200
      `}
      onDoubleClick={handleDoubleClick}
    >
      <Handle
        type="target"
        position={targetPosition}
        className="!w-2 !h-2 !bg-gray-400"
        style={isRadial ? { top: '50%', left: 0, transform: 'translateY(-50%)' } : {}}
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
          className={`w-full border border-blue-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${isRadial ? 'text-center' : ''}`}
          style={isRadial ? { background: 'transparent', textAlign: 'center' } : {}}
        />
      ) : (
        <div
          className={`font-semibold text-base text-gray-800 ${isRadial ? '' : 'truncate'}`}
          style={isRadial ? { width: '100%', textAlign: 'center', wordBreak: 'break-word', whiteSpace: 'normal', padding: '0 6px' } : {}}
        >
          {data.label}
        </div>
      )}
      <Handle
        type="source"
        position={sourcePosition}
        className="!w-2 !h-2 !bg-gray-400"
        style={isRadial ? { top: '50%', right: 0, transform: 'translateY(-50%)' } : {}}
      />
    </div>
  );
};

export default CustomNode;
