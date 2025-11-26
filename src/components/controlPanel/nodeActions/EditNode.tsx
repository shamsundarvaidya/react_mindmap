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
          className="bg-blue-500 hover:bg-blue-600 text-white shadow min-w-[100px] w-full sm:w-auto"
          title="Edit Node"
        >
          <Edit3 className="h-4 w-4 mr-2" />
          Edit Node
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] bg-white text-gray-900 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Edit Node Fields</DialogTitle>
          <DialogDescription className="text-gray-600">
            Edit the title and additional fields for the selected node.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter node title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Left Text Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Left Text
            </label>
            <input
              type="text"
              value={leftText}
              onChange={(e) => setLeftText(e.target.value)}
              placeholder="Enter left section text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Right Text Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Right Text
            </label>
            <input
              type="text"
              value={rightText}
              onChange={(e) => setRightText(e.target.value)}
              placeholder="Enter right section text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditNode;