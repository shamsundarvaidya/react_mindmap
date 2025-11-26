import { useReactFlow, getNodesBounds, getViewportForBounds } from '@xyflow/react';
import { useAppDispatch, useAppSelector } from '../store';
import { selectNode } from '../store/mindmapSlice';
import { toSvg } from 'html-to-image';

const padding = 20; // px

export const useExportToSvg = () => {
  const { getNodes } = useReactFlow();
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);

  const handleExportSvg = async () => {
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
    
    // Deselect node to avoid selection styling in export
    if (prevSelected) {
      dispatch(selectNode(null as any));
      await new Promise((r) => setTimeout(r, 50));
    }

    try {
      const dataUrl = await toSvg(doc, {
        backgroundColor: savedBg,
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          transform: `translate(${x}px, ${y}px) scale(1)`,
        },
      });
      
      downloadSvg(dataUrl);
    } catch (error) {
      console.error('SVG export failed:', error);
      alert('Failed to export SVG. Please try again.');
    } finally {
      if (prevSelected) {
        dispatch(selectNode(prevSelected));
      }
    }
  };

  return { handleExportSvg };
};

function downloadSvg(dataUrl: string) {
  const a = document.createElement('a');
  a.setAttribute('download', 'mindmap.svg');
  a.setAttribute('href', dataUrl);
  a.click();
}
