import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { useAppDispatch, useAppSelector } from '../store';
import { applyLayout, updateLabel } from '../store/mindmapSlice';
import type { NodeData } from '../types/mindmap';

const CustomNode: React.FC<NodeProps<Node<NodeData>>> = ({ id, data }) => {
  const layoutDirection = useAppSelector((state) => state.mindmap.layoutDirection);
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);

  const sourcePosition = layoutDirection === 'TB' ? Position.Bottom : Position.Right;
  const targetPosition = layoutDirection === 'TB' ? Position.Top : Position.Left;


  const backgroundColor = data.color || '#ffffff';
  const isSelected = id === selectedNodeId;
  const borderColor = isSelected ? 'border-green-500' : 'border-gray-300';
  const ring = isSelected ? 'ring-2 ring-green-300' : '';

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
      
      className={`
         ${borderColor} ${ring}
        border rounded-xl shadow-lg px-5 py-3 min-w-[170px] transition-all duration-200
        flex flex-col items-center justify-center cursor-pointer
        hover:shadow-xl hover:border-blue-400
         focus-within:ring-2 focus-within:ring-blue-200
      `}
      onDoubleClick={handleDoubleClick}
    >
      <Handle type="target" position={targetPosition} className="!w-2 !h-2 !bg-gray-400" />
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
        <div className="font-semibold text-base text-gray-800 truncate">{data.label}</div>
      )}
      <Handle type="source" position={sourcePosition} className="!w-2 !h-2 !bg-gray-400" />
    </div>
  );
};

export default CustomNode;
