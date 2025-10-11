import React, { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store";
import { updateNote } from "../../../store/mindmapSlice";
import NoteEditor from "./NoteEditor";



const EditNote: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);
  const nodes = useAppSelector((state) => state.mindmap.nodes);

  const [nodeLabel, setNodeLabel] = useState("None");
const [noteHtml, setNoteHtml] = useState("");




  const editorRef = useRef<HTMLDivElement>(null);

  // Load note when dialog opens or node changes
  useEffect(() => {
    console.log("Effect triggered: open =", open, "selectedNodeId =", selectedNodeId);
    if (open && selectedNodeId) {
      const foundNode = nodes.find((n) => n.id === selectedNodeId);
      console.log(foundNode);

    const note = foundNode?.data?.note ?? "";
    setNoteHtml(note);
    setNodeLabel(foundNode?.data?.label ?? "None");
    }
  }, [open, selectedNodeId, nodes]);

  // Rich text formatting handler
  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    // Update state after formatting
    if (editorRef.current) {
      setNoteHtml(editorRef.current.innerHTML);
    }
  };

  // Save note to store
  const handleSave = () => {
    if (selectedNodeId) {
      console.log("Saving note:", noteHtml);
      dispatch(updateNote({ nodeId: selectedNodeId, note: noteHtml }));
    }
    setOpen(false);
  };



  return (
    <>
      <button
        className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 shadow min-w-[100px] w-full sm:w-auto"
        onClick={() => setOpen(true)}
        title="Edit Note"
        disabled={!selectedNodeId}
      >
        <span className="text-lg">📝</span>
        <span>Edit Note</span>
      </button>
      <dialog
        open={open}
        className="z-50 rounded-2xl shadow-2xl p-0 border-0 bg-transparent backdrop:bg-black/60 backdrop-blur animate-fade-in"
        style={{ padding: 0, border: 0, background: 'transparent' }}
        onCancel={e => { e.preventDefault(); setOpen(false); }}
      >
        <div className="relative bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md mx-4 flex flex-col items-center justify-center max-h-[90vh] overflow-y-auto">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Node Note</h2>
          <div className="mb-4 w-full">
            <span className="block text-sm text-gray-500 mb-1">Selected Node:</span>
            <span className="font-mono text-base text-gray-700 bg-gray-100 px-2 py-1 rounded">
              {nodeLabel}
            </span>
          </div>

          {/* Rich Text Editor */}
          <NoteEditor
  initialHTML={noteHtml}
  onChange={(html) => setNoteHtml(html)}
/>
          <div className="flex gap-2 w-full mt-2">
            <button
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
        <style>
          {`
            dialog[open] {
              position: fixed;
              inset: 0;
              width: 100vw;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(0,0,0,0.6);
              backdrop-filter: blur(6px);
              margin: 0;
              padding: 0;
              border: none;
              z-index: 50;
            }
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(20px);}
              to { opacity: 1; transform: translateY(0);}
            }
            .animate-fade-in {
              animation: fade-in 0.25s cubic-bezier(.4,0,.2,1);
            }
          `}
        </style>
      </dialog>
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

export default EditNote;