import React, { useCallback, useRef, useEffect, useMemo, useState } from "react";
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
  type NodeChange,
  type EdgeChange,
  type Node,
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [edgesAnimated, setEdgesAnimated] = useState<boolean>(() => {
    const saved = localStorage.getItem('edges-animated');
    return saved ? saved === 'true' : true;
  });

  const dispatch = useAppDispatch();

  const nodesById = useMemo(() => {
    const map = new Map<string, Node<NodeData>>();
    if (Array.isArray(nodes)) {
      nodes.forEach((n) => map.set(n.id, n as Node<NodeData>));
    }
    return map;
  }, [nodes]);

  const layoutDirection = useAppSelector((state) => state.mindmap.layoutDirection);
  // Helper to lighten a hex color
  function lighten(hex: string, amt = 0.5) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map((x) => x + x).join('');
    const num = parseInt(c, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    r = Math.round(r + (255 - r) * amt);
    g = Math.round(g + (255 - g) * amt);
    b = Math.round(b + (255 - b) * amt);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  const themedEdges = useMemo(() => {
    return edges.map((e) => {
      const target = nodesById.get(e.target);
      let stroke = (target?.data as NodeData | undefined)?.color || "#CBD5E1";
      if (layoutDirection === 'RADIAL') {
        // Use a lighter version of the node color for radial edges
        stroke = lighten(stroke, 0.7);
      }
      const edgeType = layoutDirection === 'RADIAL' ? 'straight' : e.type;
      return { ...e, type: edgeType, animated: edgesAnimated, style: { ...(e.style || {}), stroke, strokeWidth: 2.5 } };
    });
  }, [edges, nodesById, edgesAnimated, layoutDirection]);

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
        dispatch(loadMindMap(parsed));
      } catch (err) {
        console.warn("Invalid mind map data in localStorage.");
      }
    }

    // Apply canvas background from localStorage or default
    const savedBg = localStorage.getItem('canvas-bg');
    const defaultBg = '#0B1220'; // deeper near-black for stronger contrast
    const shouldMigrate = !savedBg || savedBg === '#0F172A' || savedBg === '#ffffff';
    const colorToUse = shouldMigrate ? defaultBg : (savedBg as string);
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = colorToUse;
    }
    if (shouldMigrate) {
      localStorage.setItem('canvas-bg', defaultBg);
    }

    const onBgChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as { color: string };
      if (containerRef.current) {
        containerRef.current.style.backgroundColor = detail.color;
      }
    };
    window.addEventListener('canvas-bg-change', onBgChange as EventListener);
    const onEdgesAnimChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as { animated: boolean };
      setEdgesAnimated(detail.animated);
    };
    window.addEventListener('edges-animated-change', onEdgesAnimChange as EventListener);
    return () => {
      window.removeEventListener('canvas-bg-change', onBgChange as EventListener);
      window.removeEventListener('edges-animated-change', onEdgesAnimChange as EventListener);
    };
  }, []);



  const reactFlowInstanceRef = useRef<any>(null);

  return (
    <div className="h-screen flex flex-col" ref={containerRef}>
      <ControlPanel  />
     
      <div className="flex-1">
        <ReactFlow
          ref={flowRef}
          nodes={nodes}
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
