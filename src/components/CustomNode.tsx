import { useAppSelector } from '../store';


import React from 'react';
import type { NodeProps, Node } from '@xyflow/react';
import type { NodeData } from '../types/mindmap';
import RadialNode from './RadialNode';
import CustomNodeRect from './CustomNodeRect';


const CustomNode: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  const layoutDirection = useAppSelector((state) => state.mindmap.layoutDirection);
  if (layoutDirection === 'RADIAL') {
    return <RadialNode {...props} />;
  }
  return <CustomNodeRect {...props} />;
};

export default CustomNode;
