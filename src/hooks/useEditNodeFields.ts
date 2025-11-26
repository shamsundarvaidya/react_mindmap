import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { updateLabel, updateLeftText, updateRightText } from '../store/mindmapSlice';

export function useEditNodeFields() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state) => state.mindmap.selectedNodeId);
  const nodes = useAppSelector((state) => state.mindmap.nodes);

  // Load node data when dialog opens or node changes
  useEffect(() => {
    if (open && selectedNodeId) {
      const foundNode = nodes.find((n) => n.id === selectedNodeId);
      if (foundNode) {
        setTitle(foundNode.data.label ?? '');
        setLeftText(foundNode.data.left_text ?? '');
        setRightText(foundNode.data.right_text ?? '');
      }
    }
  }, [open, selectedNodeId, nodes]);

  const handleSave = () => {
    if (selectedNodeId) {
      dispatch(updateLabel({ id: selectedNodeId, label: title }));
      dispatch(updateLeftText({ id: selectedNodeId, leftText }));
      dispatch(updateRightText({ id: selectedNodeId, rightText }));
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    // State
    open,
    title,
    leftText,
    rightText,
    selectedNodeId,
    
    // Computed
    canEdit: !!selectedNodeId,
    
    // Actions
    setTitle,
    setLeftText,
    setRightText,
    handleSave,
    handleClose,
    setOpen,
  };
}
