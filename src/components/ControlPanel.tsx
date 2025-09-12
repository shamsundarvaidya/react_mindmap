import { useAppDispatch, useAppSelector } from "../store";
import {
  addNode,
  deleteNode,
  applyLayout,
} from "../store/mindmapSlice";
import NodeButtons from "./controlPanel/NodeButtons";
import LayoutButtons from "./controlPanel/LayoutButtons";
import ClearButton from "./controlPanel/ClearButton";
import SaveButton from "./controlPanel/SaveButton";
import ImportButton from "./controlPanel/ImportButton";
import ColorPicker from "./controlPanel/ColorPicker";

import ExportButton from "./controlPanel/ExportButton";
import ExportPngButton from "./controlPanel/ExportToPngButton";


const ControlPanel = () => {
  const dispatch = useAppDispatch();
  const { selectedNodeId, edges } = useAppSelector(
    (state) => state.mindmap
  );

  const isRootNode = (id: string) => {
    return !edges.some((e) => e.target === id);
  };

  const handleDelete = () => {
    if (!selectedNodeId) return;

    if (isRootNode(selectedNodeId)) {
      alert("Cannot delete the root node.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this node and all its children?"
    );
    if (confirmed) {
      dispatch(deleteNode(selectedNodeId));
      dispatch(applyLayout("None"));
    }
  };

  return (
    <div className="px-3 py-2 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200 flex flex-wrap gap-3 justify-between items-center shadow-sm">
      <NodeButtons
        onAdd={() => { dispatch(addNode()); dispatch(applyLayout("None")); }}
        onDelete={handleDelete}
        canAdd={!!selectedNodeId}
        canDelete={!!selectedNodeId}
      />
      <LayoutButtons
        onHorizontal={() => dispatch(applyLayout("LR"))}
        onVertical={() => dispatch(applyLayout("TB"))}
      />
      <div className="flex gap-3 items-center">
        <ClearButton />
        <SaveButton />
        <ExportButton />
        <ExportPngButton />
        <ImportButton />
        <ColorPicker />
      </div>
    </div>
  );
};

export default ControlPanel;
