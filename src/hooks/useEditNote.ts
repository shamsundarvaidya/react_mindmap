import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { updateNote } from '../store/mindmapSlice';

export function useEditNote() {
  const [open, setOpen] = useState(false);
  const [noteHtml, setNoteHtml] = useState('');
  const [nodeLabel, setNodeLabel] = useState('None');
  
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);
  const nodes = useAppSelector((state) => state.mindmap.nodes);

  // Load note when dialog opens or node changes
  useEffect(() => {
    if (open && selectedNodeId) {
      const foundNode = nodes.find((n) => n.id === selectedNodeId);
      const note = foundNode?.data?.note ?? '';
      setNoteHtml(note);
      setNodeLabel(foundNode?.data?.label ?? 'None');
    }
  }, [open, selectedNodeId, nodes]);

  const handleSave = () => {
    if (selectedNodeId) {
      dispatch(updateNote({ nodeId: selectedNodeId, note: noteHtml }));
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return {
    // State
    open,
    noteHtml,
    nodeLabel,
    selectedNodeId,
    
    // Computed
    canEdit: !!selectedNodeId,
    
    // Actions
    setNoteHtml,
    handleSave,
    handleClose,
    handleOpen,
    setOpen,
  };
}