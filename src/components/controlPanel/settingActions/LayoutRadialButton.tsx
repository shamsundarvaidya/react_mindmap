import React from "react";
import { useAppDispatch } from "../../../store";
import { applyLayout } from "../../../store/mindmapSlice";

const LayoutRadialButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(applyLayout("RADIAL"));
    onClick?.();
  };
  const btnClass = "w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm";
  return (
    <button className={btnClass} onClick={handleClick}>
      <span className="text-lg">⭕</span>
      <span>Radial layout</span>
    </button>
  );
};

export default LayoutRadialButton;
