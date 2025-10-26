import { useAppDispatch } from "../store";
import { saveAllDataToLocalStorage } from "../store/reducers/storageReducers";

export const useSaveMindMap = () => {
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(saveAllDataToLocalStorage());
    alert("Mind map saved!");
  };

  return { handleSave };
};
