import React from 'react';
import { EditorContent } from '@tiptap/react';
import { useNoteEditor } from '../../../hooks/useNoteEditor';
import { useToolbar } from '../../../hooks/useToolbar';
import EditorToolbar from './EditorToolbar';

interface NoteEditorProps {
  initialHTML: string;
  onChange: (html: string) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ initialHTML, onChange }) => {
  const { editor, formatActions, formatStates, isReady } = useNoteEditor({
    initialHTML,
    onChange,
  });

  const toolbarItems = useToolbar({ formatActions, formatStates });

  if (!isReady) return null;

  return (
    <div className="w-full space-y-2">
      {/* Toolbar as presentational component */}
      <EditorToolbar items={toolbarItems} />

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default NoteEditor;
