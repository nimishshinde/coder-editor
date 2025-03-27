import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';
import ACTIONS from '../Actions';
import { update } from '../Pages/slices/editorPageSlice';
import { KEYS } from '../redux/store';

function MonacoEditor({ socketRef, roomId }) {
	const dispatch = useDispatch();
	const { codeSlice } = KEYS;
	const code = useSelector((state) => {
		return state[codeSlice].code;
	});

	const handleEditorChange = (value, event) => {
		// FIXME: Add debouncing here.
		const code = value; // Capture the current code value
		dispatch(update(code));

		// FIXME: Check Editor on change event
		socketRef.current.emit(ACTIONS.CODE_CHANGE, {
			roomId,
			code,
		});
	};

	useEffect(() => {
		if (socketRef.current) {
			socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
				if (code !== null) {
					dispatch(update(code));
				}
			});
		}

		return () => {
			// eslint-disable-next-line
			socketRef.current.off(ACTIONS.CODE_CHANGE);
		};
		// eslint-disable-next-line
	}, [socketRef.current]);

	return (
		<Editor
			value={code}
			height="100vh"
			defaultLanguage="javascript"
			defaultValue={code}
			theme="vs-dark"
			fontSize={24}
			options={{
				selectOnLineNumbers: true,
				fontSize: 16,
				fontFamily: 'jetbrains mono',
				lineNumbers: 'on',
				roundedSelection: true,
				scrollBeyondLastLine: false,
				lineHeight: 22,
				autoClosingBrackets: 'always',
				autoIndent: 'full',
				snippetSuggestions: 'inline',
				quickSuggestions: true,
				matchBrackets: 'always',
				padding: { top: 10, bottom: 10 },
				automaticLayout: true,
				autoClosingComments: 'always',
				colorDecorators: true,
				cursorStyle: 'underline',
				folding: true,
				foldingHighlight: true,
				fontWeight: '300',
				fontLigatures: true,
				links: true,
				tabFocusMode: true,
				tabSize: 4,
				defaultColorDecorators: true,
				stickyScroll: {
					enabled: true,
					maxLineCount: 8,
					defaultModel: 'outlineModel',
					scrollWithEditor: true,
				},
			}}
			onChange={handleEditorChange}
		/>
	);
}

export default MonacoEditor;
