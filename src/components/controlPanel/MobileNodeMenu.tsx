import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FileText } from "lucide-react";
import NoteEditor from "./nodeActions/NoteEditor";
import { useAddNode } from "../../hooks/useAddNode";
import { useDeleteNode } from "../../hooks/useDeleteNode";
import { useEditNote } from "../../hooks/useEditNote";

const MobileNodeMenu = () => {
  const { handleAddNode, canAddNode } = useAddNode();
  const { handleDeleteNode, canDeleteNode } = useDeleteNode();
  const {
    open,
    noteHtml,
    nodeLabel,
    canEdit,
    setNoteHtml,
    handleSave,
    handleClose,
    setOpen,
  } = useEditNote();

  return (
    <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
      <div className="flex items-center gap-1.5 bg-slate-800/95 backdrop-blur-md px-2.5 py-2 rounded-full shadow-lg border border-slate-700/50">
        <button
          className="inline-flex items-center justify-center bg-teal-600 text-white p-2 rounded-full shadow-sm
           hover:bg-teal-700 active:bg-teal-800 transition disabled:opacity-50"
          onClick={handleAddNode}
          disabled={!canAddNode}
          title="Add Node"
        >
          <span className="text-sm">➕</span>
        </button>
        
        <button
          className="inline-flex items-center justify-center bg-rose-600 text-white p-2 rounded-full shadow-sm 
           hover:bg-rose-700 active:bg-rose-800 transition disabled:opacity-50"
          onClick={handleDeleteNode}
          disabled={!canDeleteNode}
          title="Delete Node"
        >
          <span className="text-sm">🗑️</span>
        </button>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              disabled={!canEdit}
              className="inline-flex items-center justify-center bg-yellow-400 text-white p-2 rounded-full shadow-sm
               hover:bg-yellow-500 active:bg-yellow-600 transition disabled:opacity-50"
              title="Edit Note"
            >
              <FileText className="h-4 w-4" />
            </button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[600px] max-w-[95vw] max-h-[85vh] overflow-hidden bg-white text-gray-900 backdrop-blur-md mx-2">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Edit Node Note</DialogTitle>
              <DialogDescription className="text-gray-600">
                Edit the note content for the selected node.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Selected Node:
                </label>
                <div className="font-mono text-xs bg-gray-100 text-gray-800 px-2 py-1.5 rounded border border-gray-200 truncate">
                  {nodeLabel}
                </div>
              </div>
              
              <div className="max-h-[300px] overflow-y-auto">
                <NoteEditor
                  initialHTML={noteHtml}
                  onChange={(html) => setNoteHtml(html)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                onClick={handleClose}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-yellow-400 hover:bg-yellow-500 text-white"
              >
                Save Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MobileNodeMenu;