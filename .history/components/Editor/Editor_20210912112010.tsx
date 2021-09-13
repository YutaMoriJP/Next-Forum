import { Editor, EditorState } from "draft-js";
import { useState } from "react";

const MyInput = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return <div style={{
    border: '1px solid gray',
    minHeight: '6em'
  }}></div><Editor editorState={editorState} onChange={setEditorState} />;
};

export default MyInput;
