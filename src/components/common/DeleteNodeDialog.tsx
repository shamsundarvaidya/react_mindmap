import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface DeleteNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  childrenCount: number;
}

/**
 * Reusable confirmation dialog for deleting a node from the mind map.
 * Shows the number of children that will be deleted along with the node.
 * Can be used in FileMenu, Sidebar, or any other component that needs to delete nodes.
 */
export function DeleteNodeDialog({ 
  isOpen, 
  onClose, 
  onConfirm,
  childrenCount 
}: DeleteNodeDialogProps) {
  const totalNodesToDelete = childrenCount + 1; // Include the node itself
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
              <Trash2 className="h-5 w-5 text-red-400" />
            </div>
            <DialogTitle className="text-slate-100">Delete Node?</DialogTitle>
          </div>
          <DialogDescription className="text-slate-400 pt-2">
            {childrenCount > 0 
              ? `This will delete the selected node and ${childrenCount} child node${childrenCount > 1 ? 's' : ''}. This action cannot be undone.`
              : 'This will delete the selected node. This action cannot be undone.'
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
          >
            Delete {childrenCount > 0 && `(${totalNodesToDelete} total)`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
