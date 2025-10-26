import React, { useCallback, useRef, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from '../store';
import { setTheme, setEdgesAnimated } from '../store/themeSlice';
import {
  selectNode,
  applyEdgeChanges,
  applyNodeChanges,
  loadMindMap,
} from "../store/mindmapSlice";
import CustomNode from "./CustomNode";
import ControlPanel from "./ControlPanel";
import MobileNodeMenu from "./controlPanel/MobileNodeMenu";
import {
  ReactFlow,
  Background,
  Controls,
  type NodeChange,
  type EdgeChange,
  type Node,
} from "@xyflow/react";
import * as htmlToImage from "html-to-image";

import "@xyflow/react/dist/style.css";
import type { NodeData } from "../types/mindmap";
import { setExportHandler } from "../store/exportStore";
import { useVisibleGraph } from "../hooks/useVisibleGraph";


const nodeTypes = {
  customNode: CustomNode,
};

const MindMap = () => {
  const canvasBg = useAppSelector(state => state.theme.backgroundColor);
  const edgesAnimated = useAppSelector(state => state.theme.edgesAnimated);
  const flowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  // Compute visible subgraph (hide descendants of collapsed nodes)
  const { nodes: visibleNodes, edges: visibleEdges } = useVisibleGraph();

  const nodesById = useMemo(() => {
    const map = new Map<string, Node<NodeData>>();
    if (Array.isArray(visibleNodes)) {
      visibleNodes.forEach((n) => map.set(n.id, n as Node<NodeData>));
    }
    return map;
  }, [visibleNodes]);

  const themedEdges = useMemo(() => {
    return visibleEdges.map((e) => {
      const target = nodesById.get(e.target);
      const stroke = (target?.data as NodeData | undefined)?.color || "#CBD5E1";
      return { ...e, animated: edgesAnimated, style: { ...(e.style || {}), stroke, strokeWidth: 2.5 } };
    });
  }, [visibleEdges, nodesById, edgesAnimated]);

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
      event.stopPropagation();
    },
    [dispatch]
  );

  useEffect(() => {
    const saved = localStorage.getItem("mindmap-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        // Load mindmap data (nodes, edges, layout)
        dispatch(loadMindMap(parsed));
        
        // Load theme settings if available
        if (parsed.theme) {
          if (parsed.theme.selectedTheme) {
            dispatch(setTheme(parsed.theme.selectedTheme));
          }
          if (parsed.theme.edgesAnimated !== undefined) {
            dispatch(setEdgesAnimated(parsed.theme.edgesAnimated));
          }
        }
      } catch {
        console.warn("Invalid mind map data in localStorage.");
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = canvasBg;
    }
  }, [canvasBg]);



  const reactFlowInstanceRef = useRef<any>(null);

  return (
    <div className="h-screen flex flex-col" ref={containerRef}>
      <ControlPanel  />
      <MobileNodeMenu />
     
      <div className="flex-1">
        <ReactFlow
          ref={flowRef}
          nodes={visibleNodes}
          edges={themedEdges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.05}
          maxZoom={2}
          onInit={(instance) => {
            reactFlowInstanceRef.current = instance;
            console.log("ReactFlow initialized");
            setExportHandler(handleExport);
            // Additional zooming out after initial fit
            requestAnimationFrame(() => {
              try {
                const currentZoom = instance.getZoom();
                if (currentZoom > 0.15) {
                  instance.zoomTo(0.15, { duration: 300 });
                }
              } catch (e) {
                console.warn('Zoom adjustment failed', e);
              }
            });
          }}
        >
          <Background />
          <Controls />
         
        </ReactFlow>
      </div>
    </div>
  );
};
export default MindMap;
