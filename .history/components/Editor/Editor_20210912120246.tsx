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

  const _onHeader = e => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "H1"));
  };

  return (
    <div>
      <button
        onMouseDown={e => {
          _onHeader(e);
        }}
      >
        H1
      </button>
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
      <div
        style={{
          border: "1px solid black",
          minHeight: "6em",
          width: "80%",
          margin: "auto",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%,-50%)`,
        }}
      >
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
