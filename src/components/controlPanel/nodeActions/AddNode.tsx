import { useAddNode } from "../../../hooks/useAddNode";

const AddNode = () => {
    const { handleAddNode, canAddNode } = useAddNode();


  return <button
      className="inline-flex items-center justify-center gap-1 bg-teal-600 text-white px-3 py-2 rounded-lg shadow-sm
       hover:bg-teal-700 active:bg-teal-800 text-sm transition disabled:opacity-50 min-w-[80px] w-full sm:w-auto"
      onClick={handleAddNode}
      disabled={!canAddNode}
    >
      <span className="text-base">➕</span>
      <span>Add</span>
    </button>;
}

export default AddNode;
