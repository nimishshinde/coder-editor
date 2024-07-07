import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import ACTIONS from "../Actions";

function Editor({ socketRef, roomId }) {
  const editorRef = useRef(null);
  useEffect(() => {
    async function initEditor() {
      editorRef.current = CodeMirror.fromTextArea(
        document.getElementById("realTime"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          lineNumbers: true,
          autoCloseBrackets: true,
          autoCloseTags: true,
          tabSize: 2,
          spellcheck: true,
          autocorrect: true,
        }
      );

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();

        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    initEditor();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return <textarea id="realTime"></textarea>;
}

export default Editor;
