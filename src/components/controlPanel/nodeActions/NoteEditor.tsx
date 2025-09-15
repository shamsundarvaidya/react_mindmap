// components/NoteEditor.tsx
import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

interface NoteEditorProps {
  initialHTML: string;
  onChange: (html: string) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ initialHTML, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
  ],
    content: initialHTML,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'font-sans focus:outline-none min-h-[120px] px-3 py-2 border rounded bg-white text-gray-800',
      },
    },
  });

  useEffect(() => {
    if (editor && initialHTML !== editor.getHTML()) {
      editor.commands.setContent(initialHTML);
    }
  }, [initialHTML]);

  if (!editor) return null;

  return (
    <div className="w-full space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border rounded px-2 py-1 bg-gray-100">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('bold') ? 'bg-yellow-400 text-white' : 'hover:bg-yellow-100'}`}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm italic ${editor.isActive('italic') ? 'bg-yellow-400 text-white' : 'hover:bg-yellow-100'}`}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded text-sm underline ${editor.isActive('underline') ? 'bg-yellow-400 text-white' : 'hover:bg-yellow-100'}`}
        >
          U
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-yellow-400 text-white' : 'hover:bg-yellow-100'}`}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('orderedList') ? 'bg-yellow-400 text-white' : 'hover:bg-yellow-100'}`}
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="px-2 py-1 rounded text-sm hover:bg-gray-200"
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="px-2 py-1 rounded text-sm hover:bg-gray-200"
        >
          Redo
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default NoteEditor;
