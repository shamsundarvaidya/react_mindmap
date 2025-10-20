import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setShowNoteIndicator } from "../../../store/appSettingsSlice";

const NoteIndicatorToggle: React.FC = () => {
  const showNoteIndicator = useAppSelector((state) => state.appSettings.showNoteIndicator);
  const dispatch = useAppDispatch();

  return (
    <label className="w-full flex items-center gap-2 px-3 py-2 text-slate-300 text-sm cursor-pointer select-none hover:bg-slate-700 rounded-md transition-colors">
      <input
        type="checkbox"
        className="accent-blue-500"
        checked={showNoteIndicator}
        onChange={e => dispatch(setShowNoteIndicator(e.target.checked))}
      />
      Show note indicator
    </label>
  );
};

export default NoteIndicatorToggle;
