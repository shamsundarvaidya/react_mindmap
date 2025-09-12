import React from "react";

interface LayoutButtonsProps {
  onHorizontal: () => void;
  onVertical: () => void;
}

const LayoutButtons: React.FC<LayoutButtonsProps> = ({ onHorizontal, onVertical }) => (
  <div className="flex gap-2">
    <button
      className="flex items-center gap-2 bg-violet-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-violet-600 transition"
      onClick={onHorizontal}
    >
      <span className="text-lg">➡️</span>
      <span>Horizontal</span>
    </button>
    <button
      className="flex items-center gap-2 bg-violet-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-violet-600 transition"
      onClick={onVertical}
    >
      <span className="text-lg">⬇️</span>
      <span>Vertical</span>
    </button>
  </div>
);

export default LayoutButtons;
