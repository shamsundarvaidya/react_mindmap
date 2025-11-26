
import EditNode from "./nodeActions/EditNode";
import { useAddNode } from "../../hooks/useAddNode";
import { useDeleteNode } from "../../hooks/useDeleteNode";
import { DeleteNodeDialog } from "../common/DeleteNodeDialog";

const NodeMenu = () => {
  const { handleAddNode, canAddNode } = useAddNode();
  const { isDialogOpen, openDialog, closeDialog, confirmDelete, canDelete, childrenCount } = useDeleteNode();

  return (
    <>
      <div className="flex gap-2">
        <button
          className="inline-flex items-center justify-center gap-1 bg-teal-600 text-white px-3 py-2 rounded-lg shadow-sm hover:bg-teal-700 active:bg-teal-800 text-sm transition disabled:opacity-50 min-w-[80px]"
          onClick={handleAddNode}
          disabled={!canAddNode}
        >
          <span className="text-base">➕</span>
          <span>Add</span>
        </button>
        
        <button
          className="inline-flex items-center justify-center gap-1.5 bg-rose-600 text-white px-3 py-2 rounded-lg shadow-sm hover:bg-rose-700 active:bg-rose-800 text-sm transition disabled:opacity-50 min-w-[80px]"
          onClick={openDialog}
          disabled={!canDelete}
        >
          <span className="text-base">🗑️</span>
          <span>Delete</span>
        </button>
        
        <EditNode />
      </div>

      <DeleteNodeDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={confirmDelete}
        childrenCount={childrenCount}
      />
    </>
  );
};

export default NodeMenu;
