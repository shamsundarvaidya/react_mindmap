import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react";

interface ClearMindMapDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Reusable confirmation dialog for clearing the mind map.
 * Can be used in FileMenu, Sidebar, or any other component that needs to clear the mind map.
 */
export function ClearMindMapDialog({ isOpen, onClose, onConfirm }: ClearMindMapDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <DialogTitle className="text-slate-100">Clear Mind Map?</DialogTitle>
          </div>
          <DialogDescription className="text-slate-400 pt-2">
            This action cannot be undone. All nodes, connections, and unsaved changes will be permanently deleted.
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
            Clear Everything
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
