import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import es from "../../helpers/es";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ setEmailHtml }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    setEmailHtml(
      `<div>${draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      ).replace("\n", "")}</div>`
    );
  };

  return (
    <div className="editorBox">
      <Editor
        localization={{
          locale: "es",
          translations: es,
        }}
        editorState={editorState}
        editorClassName="editorMain"
        toolbarClassName="editorToolbar"
        wrapperClassName="editorWrapper"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default TextEditor;
