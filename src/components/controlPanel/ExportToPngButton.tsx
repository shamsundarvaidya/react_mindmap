import React from 'react';
import { useReactFlow, getNodesBounds } from '@xyflow/react';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectNode } from '../../store/mindmapSlice';
import { toPng } from 'html-to-image';

interface ExportToPngButtonProps {
  variant?: 'default' | 'menu';
  className?: string;
}

function downloadImage(dataUrl: string) {
  const a = document.createElement('a');
  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

const padding = 20; // px

 const ExportPngButton: React.FC<ExportToPngButtonProps> = ({ variant = 'default', className = '' }) => {
  const { getNodes } = useReactFlow();
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);

  const handleExportPng = async () => {
    const nodesBounds = getNodesBounds(getNodes());

    // Expand bounds by padding
    const paddedBounds = {
      x: nodesBounds.x - padding,
      y: nodesBounds.y - padding,
      width: nodesBounds.width + padding * 2,
      height: nodesBounds.height + padding * 2,
    };

    // Use the padded bounds as the image size
    const imageWidth = paddedBounds.width;
    const imageHeight = paddedBounds.height;

    // Always align top-left for dynamic bounding
    const x = -paddedBounds.x;
    const y = -paddedBounds.y;

    const doc = document.querySelector('.react-flow__viewport');

    if (!doc || !(doc instanceof HTMLElement)) {
      alert('Could not find the flow viewport');
      return;
    }

    const savedBg = localStorage.getItem('canvas-bg') || '#ffffff';
    const prevSelected = selectedNodeId;
    if (prevSelected) {
      dispatch(selectNode(null as any));
      await new Promise((r) => setTimeout(r, 50));
    }

    try {
      const dataUrl = await toPng(doc, {
        backgroundColor: savedBg,
        width: imageWidth,
        height: imageHeight,
        pixelRatio: 2,
        style: {
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          transform: `translate(${x}px, ${y}px) scale(1)`,
        },
      });
      downloadImage(dataUrl);
    } finally {
      if (prevSelected) {
        dispatch(selectNode(prevSelected));
      }
    }
  };

  const baseDefault = "inline-flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-emerald-700 active:bg-emerald-800 text-sm transition";
  const baseMenu = "w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm";
  const btnClass = `${variant === 'menu' ? baseMenu : baseDefault} ${className}`.trim();

  return (
    <button className={btnClass} onClick={handleExportPng}>
      <span className="text-lg">🖼️</span>
      <span>Export PNG</span>
    </button>
  );
};

export default ExportPngButton;