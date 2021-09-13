import { Editor, EditorState } from "draft-js";
import { useState } from "react";
import React from "react";

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

const MyInput = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div
      style={{
        border: "1px solid gray",
        minHeight: "6em",
      }}
    >
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

export default MyInput;
