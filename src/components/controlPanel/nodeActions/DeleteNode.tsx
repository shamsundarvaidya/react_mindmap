import { useAppDispatch, useAppSelector } from "../../../store";
import { deleteNode } from "../../../store/mindmapSlice";
import { applyLayout } from "../../../store/mindmapSlice";


const DeleteNode = () => {
    const dispatch = useAppDispatch();
    const  selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);
    const edges = useAppSelector((state) => state.mindmap.edges);


    const isRootNode = (id: string) => {
    return !edges.some((e) => e.target === id);
  };

    const handleDelete = () => {
    if (!selectedNodeId) return;
    if (isRootNode(selectedNodeId)) {
      alert("Cannot delete the root node.");
      return;
    }
    const confirmed = window.confirm(
      "Are you sure you want to delete this node and all its children?"
    );
    if (confirmed) {
      dispatch(deleteNode(selectedNodeId));
      dispatch(applyLayout("None"));
    }
  };

  return <button
      className="inline-flex items-center justify-center gap-1.5 bg-rose-600 text-white px-3 py-2 rounded-lg shadow-sm hover:bg-rose-700 active:bg-rose-800 text-sm transition disabled:opacity-50 min-w-[80px] w-full sm:w-auto"
      onClick={handleDelete}
      disabled={!selectedNodeId}
    >
      <span className="text-base">🗑️</span>
      <span>Delete</span>
    </button>


}

export default DeleteNode;