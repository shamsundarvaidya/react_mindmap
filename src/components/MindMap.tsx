import React, { useCallback, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import {
  selectNode,
  applyEdgeChanges,
  applyNodeChanges,
  loadMindMap,
} from "../store/mindmapSlice";
import CustomNode from "./CustomNode";
import ControlPanel from "./ControlPanel";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type NodeChange,
  type EdgeChange,
  type Node,
  type ReactFlowInstance,
} from "@xyflow/react";
import * as htmlToImage from "html-to-image";

import "@xyflow/react/dist/style.css";
import type { NodeData } from "../types/mindmap";
import { setExportHandler } from "../store/exportStore";

const nodeTypes = {
  customNode: CustomNode,
};

const MindMap = () => {
  const { nodes, edges } = useAppSelector((state) => state.mindmap);
  const flowRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const handleExport = async () => {
    if (!flowRef.current) return;

    console.log("Exporting PNG...");

    const dataUrl = await htmlToImage.toPng(flowRef.current, {
      backgroundColor: "white",
      pixelRatio: 2,
      filter: (node) => {
        // Skip minimap and controls
        return !(
          node?.classList?.contains("react-flow__minimap") ||
          node?.classList?.contains("react-flow__controls")
        );
      },
    });
    const link = document.createElement("a");
    link.download = "mindmap.png";
    link.href = dataUrl;
    link.click();
  };

  const onNodesChange = useCallback(
    (changes: NodeChange<Node<NodeData>>[]) => {
      dispatch(applyNodeChanges(changes));
    },
    [dispatch]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(applyEdgeChanges(changes));
    },
    [dispatch]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      dispatch(selectNode(node.id));
    },
    [dispatch]
  );

  useEffect(() => {
    const saved = localStorage.getItem("mindmap-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch(loadMindMap(parsed));
      } catch (err) {
        console.warn("Invalid mind map data in localStorage.");
      }
    }
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <ControlPanel />
      <div className="flex-1">
        <ReactFlow
          ref={flowRef}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          onInit={() => {
            // Register handler in Redux when ReactFlow is ready
            console.log("ReactFlow initialized");
            setExportHandler(handleExport);
          }}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};
export default MindMap;
