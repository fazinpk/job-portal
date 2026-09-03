import { useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, List, ListOrdered } from 'lucide-react'
import { IconButton } from '@/components/ui/icon-button'
import type { RichTextEditorProps } from './types'

const extensions = [
  StarterKit.configure({
    link: false,
    underline: false,
    codeBlock: false,
    code: false,
    blockquote: false,
    horizontalRule: false,
    heading: false,
  }),
]

export function RichTextEditor({ label, value, onChange, id }: RichTextEditorProps) {
  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'rich-text min-h-24 px-3 py-2 text-sm outline-none',
      },
    },
  })

  useEffect(() => {
    if (!editor) return
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
  }, [editor, value])

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="rounded-md border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-slate-400">
        <div className="flex items-center gap-1 border-b border-slate-200 p-1.5">
          <IconButton
            icon={Bold}
            label="Bold"
            className={editor?.isActive('bold') ? 'bg-slate-200 text-slate-900' : ''}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          />
          <IconButton
            icon={Italic}
            label="Italic"
            className={editor?.isActive('italic') ? 'bg-slate-200 text-slate-900' : ''}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          />
          <IconButton
            icon={List}
            label="Bullet list"
            className={editor?.isActive('bulletList') ? 'bg-slate-200 text-slate-900' : ''}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          />
          <IconButton
            icon={ListOrdered}
            label="Numbered list"
            className={editor?.isActive('orderedList') ? 'bg-slate-200 text-slate-900' : ''}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          />
        </div>
        <div id={id} onClick={() => editor?.chain().focus().run()}>
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}
