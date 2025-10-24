import React from "react";
import NoteEditor from "./NoteEditor";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { FileText } from "lucide-react";
import { useEditNote } from "../../../hooks/useEditNote";

const EditNote: React.FC = () => {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={!canEdit}
          className="bg-yellow-400 hover:bg-yellow-500 text-white shadow min-w-[100px] w-full sm:w-auto"
          title="Edit Note"
        >
          <FileText className="h-4 w-4 mr-2" />
          Edit Note
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden bg-white text-gray-900 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Edit Node Note</DialogTitle>
          <DialogDescription className="text-gray-600">
            Edit the note content for the selected node.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selected Node:
            </label>
            <div className="font-mono text-sm bg-gray-100 text-gray-800 px-3 py-2 rounded-md border border-gray-200">
              {nodeLabel}
            </div>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
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
  );
};

export default EditNote;