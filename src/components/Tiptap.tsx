import { Editor, EditorContent, FloatingMenu, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import Paragraph from '@tiptap/extension-paragraph'

export default () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Paragraph
    ],
    content: `
      <p>
       Type something...
      </p>
    `,
  })

  const clearCurrentLineContent = (editor: Editor) => {
    const { tr } = editor.state;
    const { from, to } = editor.view.state.selection;

    const $from = editor.state.doc.resolve(from);
    const $to = editor.state.doc.resolve(to);

    // Get the start and end positions of the current line
    const startOfLine = $from.start();
    const endOfLine = $to.end();

    // Create a transaction to delete the content of the current line
    const transaction = tr.delete(startOfLine, endOfLine);

    // Apply the transaction to the editor
    editor.view.dispatch(transaction);
  };


  const [isEditable, setIsEditable] = useState(true)

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)
    }
  }, [isEditable, editor])

  return (
    <>
      <div>
        <input type="checkbox" checked={isEditable} onChange={() => setIsEditable(!isEditable)} />
        Editable
      </div>
      {editor && (
        <FloatingMenu shouldShow={({ view }) => {
          return (view.state.doc.content.lastChild?.textContent === "/")
        }} editor={editor} tippyOptions={{ duration: 100 }}>
          <button
            onClick={() => {
              clearCurrentLineContent(editor)
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            h1
          </button>
          <button
            onClick={() => {
              clearCurrentLineContent(editor)
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            h2
          </button>
          <button
            onClick={() => {
              clearCurrentLineContent(editor)
              editor.chain().focus().toggleBulletList().run()
            }
            }
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            bullet list
          </button>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />
    </>
  )
}

