import { FloatingMenu } from '@tiptap/react'
import { buttonClasses } from '../styleClasses';

const FloatingMenuContainer = ({ editor }: any) => {

  const clearCurrentLineContent = (editor: any) => {
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

  return (
    <FloatingMenu shouldShow={({ view }) => {
      //@ts-ignore
      const { $cursor } = view.state.selection;

      if ($cursor) {
        // Check if the cursor is after a slash on an empty line
        const { pos } = $cursor;
        const charBeforeCursor = view.state.doc.textBetween(pos - 1, pos);

        return charBeforeCursor === '/';
      }

      return false;


    }} editor={editor} tippyOptions={{ duration: 100 }}>
      <div className='flex flex-row bg-slate-200 p-2 rounded-sm'>
        <button
          onClick={() => {
            clearCurrentLineContent(editor)
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }}
          className={buttonClasses}
        >
          h1
        </button>
        <button
          onClick={() => {
            clearCurrentLineContent(editor)
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }}
          className={buttonClasses}
        >
          h2
        </button>
        <button
          onClick={() => {
            clearCurrentLineContent(editor)
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }}
          className={buttonClasses}
        >
          h3
        </button>
        <button
          onClick={() => {
            clearCurrentLineContent(editor)
            editor.chain().focus().setParagraph().run()
          }}
          className={buttonClasses}
        >
          Paragraph
        </button>
        <button
          onClick={() => {
            clearCurrentLineContent(editor)
            editor.chain().focus().toggleBulletList().run()
          }
          }
          className={buttonClasses}
        >
          List
        </button>
        <button
          onClick={() => {
            clearCurrentLineContent(editor)
            editor.chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
          }
          className={buttonClasses}
        >
          Table
        </button>
      </div>
    </FloatingMenu>
  )
}

export default FloatingMenuContainer;
