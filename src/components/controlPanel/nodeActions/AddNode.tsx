import { useAppDispatch, useAppSelector } from "../../../store";
import { addNode } from "../../../store/mindmapSlice";
import { applyLayout } from "../../../store/mindmapSlice";


const AddNode = () => {
    const dispatch = useAppDispatch();
    const  selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);

    const onAdd = () => {

        if (selectedNodeId) { 
            dispatch(addNode());
            dispatch(applyLayout("None"));
        }

     };


  return <button
      className="inline-flex items-center gap-1 bg-teal-600 text-white px-2 py-1.5 rounded-lg shadow-sm
       hover:bg-teal-700 active:bg-teal-800 text-sm transition disabled:opacity-50"
      onClick={onAdd}
      disabled={!selectedNodeId}
    >
      <span className="text-base">➕</span>
      <span>Add</span>
    </button>;
}

export default AddNode;
