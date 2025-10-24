import { useRef, type ChangeEvent } from "react";
import { useAppDispatch } from "../store";
import { loadMindMap } from "../store/mindmapSlice";

export const useImportFromJson = (onComplete?: () => void) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        dispatch(loadMindMap(json));
        onComplete?.();
      } catch {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  const triggerFileSelect = () => inputRef.current?.click();

  return {
    inputRef,
    handleUpload,
    triggerFileSelect,
  };
};
