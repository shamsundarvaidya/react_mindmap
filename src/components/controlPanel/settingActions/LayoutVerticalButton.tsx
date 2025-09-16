import React from "react";
import { useAppDispatch } from "../../../store";
import { applyLayout } from "../../../store/mindmapSlice";

const LayoutVerticalButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(applyLayout("TB"));
    onClick?.();
  };
  // Match SaveButton style
  const baseDefault = "inline-flex items-center gap-1.5 bg-sky-600 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-sky-700 active:bg-sky-800 text-sm transition";
  const baseMenu = "w-full inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-slate-700 text-sm";
  // Always use menu style in settings menu
  const btnClass = baseMenu;
  return (
    <button className={btnClass} onClick={handleClick}>
      <span className="text-lg">⬇️</span>
      <span>Vertical layout</span>
    </button>
  );
};

export default LayoutVerticalButton;
