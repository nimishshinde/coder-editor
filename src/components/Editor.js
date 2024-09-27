import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import ACTIONS from '../Actions';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../Pages/slices/editorPageSlice';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';

function Editor({ socketRef, roomId }) {
	const dispatch = useDispatch();
	const editorRef = useRef(null);
	useEffect(() => {
		async function initEditor() {
			editorRef.current = CodeMirror.fromTextArea(document.getElementById('realTime'), {
				mode: { name: 'javascript', json: true },
				theme: 'dracula',
				lineNumbers: true,
				autoCloseBrackets: true,
				autoCloseTags: true,
				tabSize: 2,
				spellcheck: true,
				autocorrect: true,
				autofocus: true,
			});

			editorRef.current.on('change', (instance, changes) => {
				const { origin } = changes;
				const code = instance.getValue();
				dispatch(update(code));
				if (origin !== 'setValue') {
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
					dispatch(update(code));
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
