import { Editor, EditorState } from "draft-js";
import React from "react";
import "draft-js/dist/Draft.css";

function MyEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div
      style={{
        border: "1px solid gray",
        minHeight: "6em",
        width: "80%",
        margin: "auto",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%,-50%)`,
      }}
    >
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}
export default MyEditor;
