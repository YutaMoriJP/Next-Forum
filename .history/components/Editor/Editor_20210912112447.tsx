import { Editor, EditorState } from "draft-js";
import React from "react";
import "draft-js/dist/Draft.css";

function MyEditor() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  React.useEffect(() => {
    focusEditor();
  }, []);

  return (
    <div
      onClick={focusEditor}
      style={{
        border: "1px solid gray",
        minHeight: "6em",
        width: "80%",
        margin: "auto",
      }}
    >
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={editorState => setEditorState(editorState)}
      />
    </div>
  );
}
export default MyEditor;
