import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

interface UseNoteEditorOptions {
  initialHTML: string;
  onChange: (html: string) => void;
}

export function useNoteEditor({ initialHTML, onChange }: UseNoteEditorOptions) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
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
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[120px] px-3 py-2 border rounded-md bg-white text-gray-900 border-gray-300',
      },
    },
  });

  useEffect(() => {
    if (editor && initialHTML !== editor.getHTML()) {
      editor.commands.setContent(initialHTML);
    }
  }, [initialHTML, editor]);

  const formatActions = {
    toggleBold: () => editor?.chain().focus().toggleBold().run(),
    toggleItalic: () => editor?.chain().focus().toggleItalic().run(),
    toggleUnderline: () => editor?.chain().focus().toggleUnderline().run(),
    toggleBulletList: () => editor?.chain().focus().toggleBulletList().run(),
    toggleOrderedList: () => editor?.chain().focus().toggleOrderedList().run(),
    undo: () => editor?.chain().focus().undo().run(),
    redo: () => editor?.chain().focus().redo().run(),
  };

  const formatStates = {
    isBold: editor?.isActive('bold') ?? false,
    isItalic: editor?.isActive('italic') ?? false,
    isUnderline: editor?.isActive('underline') ?? false,
    isBulletList: editor?.isActive('bulletList') ?? false,
    isOrderedList: editor?.isActive('orderedList') ?? false,
    canUndo: editor?.can().undo() ?? false,
    canRedo: editor?.can().redo() ?? false,
  };

  return {
    editor,
    formatActions,
    formatStates,
    isReady: !!editor,
  };
}