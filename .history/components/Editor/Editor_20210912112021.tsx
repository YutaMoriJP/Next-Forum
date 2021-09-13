import { Editor, EditorState } from "draft-js";
import { useState } from "react";

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
