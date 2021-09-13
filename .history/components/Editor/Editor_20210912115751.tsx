import React, { useEffect, useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

export default function MyEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  // tried with onclick (but not working as expected) so used mousedown event
  const _onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  const _onBoldMouseDown = e => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const _onItalicMouseDown = e => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const _onUnderlineMouseDown = e => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  return (
    <div>
      <button
        onMouseDown={e => {
          _onBoldMouseDown(e);
        }}
      >
        B
      </button>
      <button
        onMouseDown={e => {
          _onItalicMouseDown(e);
        }}
      >
        <i>I</i>
      </button>
      <button
        onMouseDown={e => {
          _onUnderlineMouseDown(e);
        }}
      >
        U
      </button>
      <div>
        <Editor
          textAlignment="left"
          placeholder="Enter something here"
          editorState={editorState}
          onChange={setEditorState}
        />
      </div>
    </div>
  );
}
