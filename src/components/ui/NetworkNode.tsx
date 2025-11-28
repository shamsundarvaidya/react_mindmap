import React from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { useAppSelector } from '../../store';
import type { NodeData } from '../../types/mindmap';

// Node dimensions
const NODE_WIDTH = 200;
const NODE_HEIGHT_UPPER = 40;
const NODE_HEIGHT_LOWER = 25;
const LEFT_SECTION_WIDTH = NODE_WIDTH * 0.70;
const RIGHT_SECTION_WIDTH = NODE_WIDTH * 0.30;

const NetworkNode: React.FC<NodeProps<Node<NodeData>>> = (props) => { 
  const { id, data } = props;
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);
  const layoutDirection = useAppSelector((state) => state.mindmap.layoutDirection);
  const selectedTheme = useAppSelector((state) => state.theme.selectedTheme);

  const isSelected = id === selectedNodeId;
  
  // Use theme colors directly - selectedTheme is now a ColorScheme object
  const backgroundColor = isSelected ? selectedTheme.selectedNodeColor : selectedTheme.nodeColor;
  const textColor = isSelected ? selectedTheme.selectedTextColor : selectedTheme.textColor;
  const borderColor = isSelected ? selectedTheme.selectedBorderColor : selectedTheme.borderColor;

  return (
    <div 
      style={{ 
        width: NODE_WIDTH, 
        height: NODE_HEIGHT_UPPER + NODE_HEIGHT_LOWER,
        position: 'relative',
        border: isSelected ? `2px solid ${borderColor}` : '2px solid transparent',
      }}
      className="transition-all duration-200"
    >
      <div
        style={{ 
          width: '100%', 
          height: '100%',
          backgroundColor,
          borderColor,
          position: 'relative',
          overflow: 'hidden',
        }}
        className="border shadow-lg cursor-pointer hover:shadow-xl"
      >
      {/* Upper section - Title */}
      <div
        style={{
          height: NODE_HEIGHT_UPPER,
          borderBottom: `1px solid ${borderColor}`,
        }}
        className="flex items-center justify-center px-1"
      >
        <div className="text-sm truncate text-center w-full" style={{ color: textColor }}>
          {data?.label || "Title"}
        </div>
      </div>

      {/* Lower section - split into left and right */}
      <div style={{ height: NODE_HEIGHT_LOWER }} className="flex">
        {/* Lower Left Text */}
        <div
          style={{
            width: LEFT_SECTION_WIDTH,
            borderRight: `1px solid ${borderColor}`,
          }}
          className="flex items-center justify-center"
        >
          <div className="text-xs truncate text-center w-full h-full" style={{ color: textColor }}>
            {data.left_text || "part number"}
          </div>
        </div>

        {/* Lower Right Text */}
        <div
          style={{ width: RIGHT_SECTION_WIDTH }}
          className="flex items-center justify-center"
        >
          <div className="text-xs truncate text-center w-full" style={{ color: textColor }}>
            {data.right_text || "QTY"}
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