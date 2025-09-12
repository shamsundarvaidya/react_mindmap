import React from "react";
import { useAppDispatch } from "../../store";
import { clear } from "../../store/mindmapSlice";

const ClearButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClear = () => {
    if (confirm("Clear the entire mind map?")) {
      dispatch(clear());
    }
  };

  return (
    <button
      className="inline-flex items-center gap-1.5 bg-orange-500 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-orange-600 active:bg-orange-700 text-sm transition"
      onClick={handleClear}
    >
      <span className="text-base">🧹</span>
      <span>Clear</span>
    </button>
  );
};

export default ClearButton;
