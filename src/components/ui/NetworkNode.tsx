import React from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { useAppSelector } from '../../store';
import type { NodeData } from '../../types/mindmap';
import { getThemeByName } from '../../constants/themes';
import { getNodeChildren } from '../../utils/nodeUtils';
import { useToggleCollapse } from '../../hooks/useToggleCollapse';

// Node dimensions
const NODE_WIDTH = 200;
const NODE_HEIGHT_UPPER = 40;
const NODE_HEIGHT_LOWER = 25;
const LEFT_SECTION_WIDTH = NODE_WIDTH * 0.70;
const RIGHT_SECTION_WIDTH = NODE_WIDTH * 0.30;

// Color utility function
const calculateNodeColor = (data: NodeData, selectedTheme: string) => {
  if (data.color) return data.color;
  const theme = getThemeByName(selectedTheme);
  if (!theme) return '#FFFFFF';
  const depth = data.depth ?? 0;
  return theme.colors[depth % theme.colors.length];
};

const getNodeStyles = (isSelected: boolean) => {
  const highlightBorder = isSelected ? '#2563eb' : '#000000'; // Blue border when selected
  return { highlightBorder };
};

const NetworkNode: React.FC<NodeProps<Node<NodeData>>> = (props) => { 
  const { id, data } = props;
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);
  const layoutDirection = useAppSelector((state) => state.mindmap.layoutDirection);
  const selectedTheme = useAppSelector((state) => state.theme.selectedTheme);
  const { handleToggleCollapse } = useToggleCollapse();

  const isSelected = id === selectedNodeId;
  const backgroundColor = calculateNodeColor(data, selectedTheme);
  const { highlightBorder } = getNodeStyles(isSelected);

  // Child relations
  const edges = useAppSelector((state) => state.mindmap.edges);
  const hasChildren = edges.some((e) => e.source === id);
  
  // Get all descendants (excluding the node itself)
  const childrenIds = getNodeChildren(id, edges);
  
  // Hidden descendant count when collapsed
  const hiddenCount = data.collapsed ? childrenIds.size : 0;

  return (
    <div 
      style={{ 
        width: NODE_WIDTH, 
        height: NODE_HEIGHT_UPPER + NODE_HEIGHT_LOWER,
        position: 'relative',
        border: isSelected ? `2px solid ${highlightBorder}` : '2px solid transparent',
      }}
      className="transition-all duration-200"
    >
      <div
        style={{ 
          width: '100%', 
          height: '100%',
          backgroundColor,
          position: 'relative',
          overflow: 'hidden',
        }}
        className="border border-black shadow-lg cursor-pointer hover:shadow-xl"
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

      {/* Child count badge */}
      {data.collapsed && hiddenCount > 0 && (
        <span
          title={`${hiddenCount} hidden`}
          className="absolute bottom-1 right-1 rounded-full min-w-[18px] h-[18px] px-1 text-[11px] leading-none flex items-center justify-center text-white shadow bg-slate-700"
          style={{ zIndex: 2 }}
        >
          {hiddenCount}
        </span>
      )}

      {/* Upper section - Title */}
      <div
        style={{
          height: NODE_HEIGHT_UPPER,
          borderBottom: `1px solid #000000`,
        }}
        className="flex items-center justify-center px-1"
      >
        <div className="text-sm text-gray-800 truncate text-center w-full">
          {data?.label || "Title"}
        </div>
      </div>

      {/* Lower section - split into left and right */}
      <div style={{ height: NODE_HEIGHT_LOWER }} className="flex">
        {/* Lower Left Text */}
        <div
          style={{
            width: LEFT_SECTION_WIDTH,
            borderRight: `1px solid #000000`,
          }}
          className="flex items-center justify-center"
        >
          <div className="text-xs text-gray-700 truncate text-center w-full h-full">
            {data.left_text || "Left"}
          </div>
        </div>

        {/* Lower Right Text */}
        <div
          style={{ width: RIGHT_SECTION_WIDTH }}
          className="flex items-center justify-center"
        >
          <div className="text-xs text-gray-700 truncate text-center w-full">
            {data.right_text || "Right"}
          </div>
        </div>
      </div>

      {/* React Flow Handles */}
      <Handle 
        type="target" 
        position={layoutDirection === 'TB' ? Position.Top : Position.Left}
        className="!w-2 !h-2 !bg-gray-400"
      />
      <Handle 
        type="source" 
        position={layoutDirection === 'TB' ? Position.Bottom : Position.Right}
        className="!w-2 !h-2 !bg-gray-400"
      />
      </div>
    </div>
  );
}

export default NetworkNode;