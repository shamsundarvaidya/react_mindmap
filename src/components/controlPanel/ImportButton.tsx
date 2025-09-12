import React, { type ChangeEvent } from "react";
import { useAppDispatch } from "../../store";
import { loadMindMap } from "../../store/mindmapSlice";

const ImportButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        dispatch(loadMindMap(json));
      } catch (err) {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  return (
    <label className="inline-flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-emerald-700 active:bg-emerald-800 text-sm transition cursor-pointer">
      <span className="text-base">⬆️</span>
      <span>Import</span>
      <input
        type="file"
        accept="application/json"
        onChange={handleUpload}
        className="hidden"
      />
    </label>
  );
};

export default ImportButton;
