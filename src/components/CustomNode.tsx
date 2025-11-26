import React from 'react';
import type { NodeProps, Node } from '@xyflow/react';
import type { NodeData } from '../types/mindmap';


import NetworkNode from './ui/NetworkNode';


const CustomNode: React.FC<NodeProps<Node<NodeData>>> = (props) => {
  return <NetworkNode {...props} />;
};

export default CustomNode;
