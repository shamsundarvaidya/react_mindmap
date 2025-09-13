import React, { useState } from "react";
import { useAppSelector } from "../../store";

interface AddNoteButtonProps {
  renderModal?: ((modal: React.ReactNode) => void) | undefined
}

const AddNoteButton: React.FC<AddNoteButtonProps> = ({ renderModal }) => {
  const [open, setOpen] = useState(false);
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);

  return (
    <>
      <button
        className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg ml-2 transition disabled:opacity-50 shadow"
        onClick={() => setOpen(true)}
        title="Add Note"
        disabled={!selectedNodeId}
      >
        <span className="text-lg">📝</span>
        <span>Add Note</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center bg-black/60 backdrop-blur animate-fade-in">
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 flex flex-col items-center justify-center">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Node Note</h2>
            <div className="mb-6">
              <span className="block text-sm text-gray-500 mb-1">Selected Node ID:</span>
              <span className="font-mono text-base text-gray-700 bg-gray-100 px-2 py-1 rounded">
                {selectedNodeId ?? "None"}
              </span>
            </div>
            <button
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.25s cubic-bezier(.4,0,.2,1);
          }
        `}
      </style>
    </>
  );
};

export default AddNoteButton;