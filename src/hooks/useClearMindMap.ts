import { useAppDispatch } from "../store";
import { clear } from "../store/mindmapSlice";

export const useClearMindMap = () => {
  const dispatch = useAppDispatch();

  const handleClear = () => {
    if (confirm("Clear the entire mind map?")) {
      dispatch(clear());
    }
  };

  return handleClear;
};