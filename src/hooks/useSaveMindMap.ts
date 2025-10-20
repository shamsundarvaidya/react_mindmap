import { useAppDispatch } from "../store";
import { saveMindMap } from "../store/mindmapSlice";

export const useSaveMindMap = () => {
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(saveMindMap());
    alert("Mind map saved!");
  };

  return { handleSave };
};
