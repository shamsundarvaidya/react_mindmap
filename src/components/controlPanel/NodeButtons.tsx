import React from "react";

interface NodeButtonsProps {
  onAdd: () => void;
  onDelete: () => void;
  canAdd: boolean;
  canDelete: boolean;
}

const NodeButtons: React.FC<NodeButtonsProps> = ({ onAdd, onDelete, canAdd, canDelete }) => (
  <div className="flex gap-2.5">
    <button
      className="inline-flex items-center gap-1.5 bg-teal-600 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-teal-700 active:bg-teal-800 text-sm transition disabled:opacity-50"
      onClick={onAdd}
      disabled={!canAdd}
    >
      <span className="text-base">➕</span>
      <span>Add</span>
    </button>
    <button
      className="inline-flex items-center gap-1.5 bg-rose-600 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-rose-700 active:bg-rose-800 text-sm transition disabled:opacity-50"
      onClick={onDelete}
      disabled={!canDelete}
    >
      <span className="text-base">🗑️</span>
      <span>Delete</span>
    </button>
  </div>
);

export default NodeButtons;
