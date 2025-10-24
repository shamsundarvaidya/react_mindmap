import { useDeleteNode } from "../../../hooks/useDeleteNode";

const DeleteNode = () => {
    const { handleDeleteNode, canDeleteNode } = useDeleteNode();

  return <button
      className="inline-flex items-center justify-center gap-1.5 bg-rose-600 text-white px-3 py-2 rounded-lg shadow-sm hover:bg-rose-700 active:bg-rose-800 text-sm transition disabled:opacity-50 min-w-[80px] w-full sm:w-auto"
      onClick={handleDeleteNode}
      disabled={!canDeleteNode}
    >
      <span className="text-base">🗑️</span>
      <span>Delete</span>
    </button>


}

export default DeleteNode;