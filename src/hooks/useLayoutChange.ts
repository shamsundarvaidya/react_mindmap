import { useAppDispatch } from "../store";
import { applyLayout } from "../store/mindmapSlice";

export function useLayoutChange() {
  const dispatch = useAppDispatch();

  const changeLayout = (layout: "LR" | "TB") => {
    dispatch(applyLayout(layout));
  };

  const setHorizontalLayout = () => changeLayout("LR");
  const setVerticalLayout = () => changeLayout("TB");

  return {
    changeLayout,
    setHorizontalLayout,
    setVerticalLayout,
  };
}