import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import Paragraph from '@tiptap/extension-paragraph'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import BubbleMenuContainer from './BubbleMenu'
import FloatingMenuContainer from './FloatingMenu'

export default () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Paragraph,
      Table,
      TableRow,
      TableCell,
      TableHeader
    ],
    content: `
      <p>
       Type something...
      </p>
    `,
  })


  const [readMode, setReadMode] = useState(false)

  useEffect(() => {
    if (editor) {
      editor.setEditable(!readMode)
    }
  }, [readMode, editor])

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="editable-container">
        <input type="checkbox" checked={readMode} onChange={() => setReadMode(prev => !prev)} />
        Reading Mode
      </div>
      {editor && <>
        <FloatingMenuContainer editor={editor} />
        <BubbleMenuContainer editor={editor} />
      </>
      }
      <EditorContent editor={editor} />
    </>
  )
}

