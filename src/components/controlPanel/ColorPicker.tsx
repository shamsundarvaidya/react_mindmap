import React, { type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateColor } from "../../store/mindmapSlice";

const ColorPicker: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedNodeId, nodes } = useAppSelector((state) => state.mindmap);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedNodeId) {
      dispatch(updateColor({ id: selectedNodeId, color: e.target.value }));
    }
  };

  if (!selectedNodeId) return null;

  return (
    <div className="flex items-center gap-2 ml-1">
      <label htmlFor="colorPicker" className="text-slate-600 text-sm">
        🎨 Color
      </label>
      <input
        type="color"
        id="colorPicker"
        value={selectedNode?.data.color || "#ffffff"}
        onChange={handleColorChange}
        className="w-7 h-7 p-0 border border-slate-300 rounded shadow-sm"
      />
    </div>
  );
};

export default ColorPicker;
