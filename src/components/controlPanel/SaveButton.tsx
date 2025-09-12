import React from "react";
import { useAppDispatch } from "../../store";
import { saveMindMap } from "../../store/mindmapSlice";

const SaveButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(saveMindMap());
    alert("Mind map saved!");
  };

  return (
    <button
      className="inline-flex items-center gap-1.5 bg-sky-600 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-sky-700 active:bg-sky-800 text-sm transition"
      onClick={handleSave}
    >
      <span className="text-base">💾</span>
      <span>Save</span>
    </button>
  );
};

export default SaveButton;
