import React, { useState, useEffect, useRef } from 'react';
import { Handle, type NodeProps, type Node, Position } from '@xyflow/react';
import { useAppDispatch, useAppSelector } from '../store';
import { applyLayout, updateLabel } from '../store/mindmapSlice';
import type { NodeData } from '../types/mindmap';

const RadialNode: React.FC<NodeProps<Node<NodeData>>> = ({ id, data }) => {
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);
  const showNoteIndicator = useAppSelector((state) => state.appSettings?.showNoteIndicator);
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);

  // We'll use Position.Left/Right but absolutely position the handles to the center of the label
  const sourcePosition = Position.Right;
  const targetPosition = Position.Left;

  const backgroundColor = (data.color as string) || '#ffffff';
  const isSelected = id === selectedNodeId;

  // Helper: get contrast color (black/white) for text
  function getContrastYIQ(hexColor: string) {
    let hex = hexColor.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    const r = parseInt(hex.substr(0,2),16);
    const g = parseInt(hex.substr(2,2),16);
    const b = parseInt(hex.substr(4,2),16);
    const yiq = (r*299 + g*587 + b*114) / 1000;
    return yiq >= 128 ? '#222' : '#fff';
  }
  const textColor = getContrastYIQ(backgroundColor);

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
    dispatch(applyLayout("None"));
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  // Calculate diameter based on label content, but with limits for performance
  const baseDiameter = 60; // Reduced from 80 for better density in large layouts
  const labelLength = value ? value.length : 1;
  // Optimized sizing with upper limit to prevent overly large nodes in dense layouts
  const diameter = Math.max(baseDiameter, Math.min(labelLength * 10 + 30, 150));

  return (
    <div
      style={{
        background: backgroundColor,
        border: isSelected ? `2.5px solid ${backgroundColor}` : '1.5px solid #d1d5db',
        borderRadius: '50%',
        position: 'relative',
        width: diameter,
        height: diameter,
        minWidth: diameter,
        minHeight: diameter,
        maxWidth: diameter,
        maxHeight: diameter,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: isSelected ? `0 0 0 4px ${backgroundColor}55` : '0 1px 4px 0 #0001',
        transition: 'box-shadow 0.2s',
        overflow: 'visible',
      }}
      className="radial-node"
      onDoubleClick={handleDoubleClick}
    >
      {/* Handles absolutely centered on left/right of the circle */}
      <Handle
        type="target"
        position={targetPosition}
        className="!w-1.5 !h-1.5 !bg-gray-300 !opacity-60 !border !border-gray-300"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          
        }}
      />
      {/* Note indicator and text */}
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
        {showNoteIndicator && data.note && data.note.trim() !== '' && (
          <span
            title="Note present"
            className="bg-amber-400 text-white rounded-full w-[18px] h-[18px] flex items-center justify-center text-[13px] font-bold shadow-sm z-20"
            style={{ alignSelf: 'flex-end', marginBottom: 2, marginRight: 2 }}
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
            className="border border-blue-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-center"
            style={{
              background: 'transparent',
              textAlign: 'center',
              color: textColor,
              minWidth: 40,
              maxWidth: diameter - 30,
              alignSelf: 'center',
              whiteSpace: 'nowrap',
            }}
          />
        ) : (
          <div
            className="font-semibold text-base"
            style={{
              color: textColor,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              padding: '0 8px',
              minWidth: 40,
              maxWidth: diameter - 30,
              alignSelf: 'center',
            }}
          >
            {data.label}
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={sourcePosition}
        className="!w-1.5 !h-1.5 !bg-gray-300 !opacity-60 !border !border-gray-300"
        style={{
          position: 'absolute',
          right: "50%",
          top: '50%',
          
        }}
      />
    </div>
  );
};

export default RadialNode;
