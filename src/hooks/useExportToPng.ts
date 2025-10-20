import { useReactFlow, getNodesBounds } from '@xyflow/react';
import { useAppDispatch, useAppSelector } from '../store';
import { selectNode } from '../store/mindmapSlice';
import { toPng } from 'html-to-image';

function downloadImage(dataUrl: string) {
  const a = document.createElement('a');
  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

const padding = 20; // px

export const useExportToPng = () => {
  const { getNodes } = useReactFlow();
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);

  const handleExportPng = async () => {
    const nodesBounds = getNodesBounds(getNodes());

    const paddedBounds = {
      x: nodesBounds.x - padding,
      y: nodesBounds.y - padding,
      width: nodesBounds.width + padding * 2,
      height: nodesBounds.height + padding * 2,
    };

    const imageWidth = paddedBounds.width;
    const imageHeight = paddedBounds.height;

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

  return { handleExportPng };
};
