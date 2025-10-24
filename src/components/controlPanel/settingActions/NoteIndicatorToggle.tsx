import React from "react";
import { useNoteIndicatorToggle } from "../../../hooks/useNoteIndicatorToggle";

const NoteIndicatorToggle: React.FC = () => {
  const { showNoteIndicator, toggleNoteIndicator } = useNoteIndicatorToggle();

  return (
    <label className="w-full flex items-center gap-2 px-3 py-2 text-slate-300 text-sm cursor-pointer select-none hover:bg-slate-700 rounded-md transition-colors">
      <input
        type="checkbox"
        className="accent-blue-500"
        checked={showNoteIndicator}
        onChange={e => toggleNoteIndicator(e.target.checked)}
      />
      Show note indicator
    </label>
  );
};

export default NoteIndicatorToggle;
