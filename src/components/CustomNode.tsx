import React from 'react';
import type { NodeProps, Node } from '@xyflow/react';
import type { NodeData } from '../types/mindmap';

import CustomNodeRect from './CustomNodeRect';


const CustomNode: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  return <CustomNodeRect {...props} />;
};

export default CustomNode;
