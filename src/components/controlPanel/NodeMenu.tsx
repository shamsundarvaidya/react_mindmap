import EditNode from "./nodeActions/EditNode";
import { useAddNode } from "../../hooks/useAddNode";
import { useDeleteNode } from "../../hooks/useDeleteNode";
import { DeleteNodeDialog } from "../common/DeleteNodeDialog";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "../../lib/utils";

const baseButton =
  "inline-flex items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

type NodeMenuProps = {
  isDark?: boolean;
};

const NodeMenu = ({ isDark = true }: NodeMenuProps) => {
  const { handleAddNode, canAddNode } = useAddNode();
  const { isDialogOpen, openDialog, closeDialog, confirmDelete, canDelete, childrenCount } = useDeleteNode();

  return (
    <>
      <div
        className={
          isDark
            ? "flex flex-wrap items-center gap-2 rounded-xl border border-cyan-500/25 bg-slate-900/70 px-2 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.45)] shadow-cyan-900/40 backdrop-blur"
            : "flex flex-wrap items-center gap-2 rounded-xl border border-sky-200 bg-white/85 px-2 py-2 shadow-[0_10px_24px_rgba(15,118,110,0.18)]"
        }
      >
        <button
          className={cn(
            baseButton,
            isDark
              ? "min-w-[110px] bg-gradient-to-r from-cyan-300 via-cyan-200 to-emerald-300 px-3 py-2 text-slate-900 shadow-[0_10px_22px_rgba(6,182,212,0.35)] hover:from-cyan-200 hover:to-emerald-200 active:translate-y-[1px] focus:ring-cyan-400/60 focus:ring-offset-slate-950"
              : "min-w-[110px] border-sky-200 bg-gradient-to-r from-sky-100 via-white to-emerald-100 px-3 py-2 text-slate-900 shadow-[0_10px_22px_rgba(34,211,238,0.2)] hover:from-sky-50 hover:to-emerald-50 active:translate-y-[1px] focus:ring-sky-300 focus:ring-offset-white"
          )}
          onClick={handleAddNode}
          disabled={!canAddNode}
        >
          <Plus className="h-4 w-4" />
          <span>Add Node</span>
        </button>
        
        <button
          className={cn(
            baseButton,
            isDark
              ? "min-w-[110px] border-red-500/30 bg-gradient-to-r from-rose-500/90 via-red-500/80 to-rose-500/90 px-3 py-2 text-white shadow-[0_10px_22px_rgba(248,113,113,0.28)] hover:brightness-110 active:translate-y-[1px] focus:ring-cyan-400/60 focus:ring-offset-slate-950"
              : "min-w-[110px] border-rose-200 bg-gradient-to-r from-rose-100 via-white to-amber-100 px-3 py-2 text-rose-700 shadow-[0_10px_22px_rgba(248,113,113,0.2)] hover:from-rose-50 hover:to-amber-50 active:translate-y-[1px] focus:ring-sky-300 focus:ring-offset-white"
          )}
          onClick={openDialog}
          disabled={!canDelete}
        >
          <Trash2 className="h-4 w-4" />
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
