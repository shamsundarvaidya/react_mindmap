import React from "react";
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
import { Edit3 } from "lucide-react";
import { useEditNodeFields } from "../../../hooks/useEditNodeFields";

const EditNode: React.FC = () => {
  const {
    open,
    title,
    leftText,
    rightText,
    canEdit,
    setTitle,
    setLeftText,
    setRightText,
    handleSave,
    handleClose,
    setOpen,
  } = useEditNodeFields();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={!canEdit}
          className="min-w-[110px] w-full bg-gradient-to-r from-cyan-300 via-cyan-200 to-emerald-300 text-slate-900 shadow-[0_10px_22px_rgba(6,182,212,0.35)] hover:from-cyan-200 hover:to-emerald-200 sm:w-auto"
          title="Edit Node"
        >
          <Edit3 className="h-4 w-4 mr-2" />
          Edit Node
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[520px] border border-cyan-500/30 bg-slate-950/95 text-slate-100 shadow-xl shadow-cyan-900/30 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="text-slate-50">Edit Node Fields</DialogTitle>
          <DialogDescription className="text-slate-400">
            Edit the title and additional fields for the selected node.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Title Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-cyan-100/80">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter node title"
              className="w-full rounded-lg border border-cyan-500/30 bg-slate-900/80 px-3 py-2 text-slate-100 placeholder:text-slate-500 shadow-inner shadow-black/30 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            />
          </div>

          {/* Left Text Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-cyan-100/80">
              Left Text
            </label>
            <input
              type="text"
              value={leftText}
              onChange={(e) => setLeftText(e.target.value)}
              placeholder="Enter left section text"
              className="w-full rounded-lg border border-cyan-500/30 bg-slate-900/80 px-3 py-2 text-slate-100 placeholder:text-slate-500 shadow-inner shadow-black/30 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            />
          </div>

          {/* Right Text Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-cyan-100/80">
              Right Text
            </label>
            <input
              type="text"
              value={rightText}
              onChange={(e) => setRightText(e.target.value)}
              placeholder="Enter right section text"
              className="w-full rounded-lg border border-cyan-500/30 bg-slate-900/80 px-3 py-2 text-slate-100 placeholder:text-slate-500 shadow-inner shadow-black/30 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button
            onClick={handleClose}
            variant="outline"
            className="border-cyan-500/30 bg-transparent text-slate-100 hover:bg-cyan-500/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-cyan-300 via-cyan-200 to-emerald-300 text-slate-900 shadow-[0_10px_22px_rgba(6,182,212,0.35)] hover:from-cyan-200 hover:to-emerald-200"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditNode;
