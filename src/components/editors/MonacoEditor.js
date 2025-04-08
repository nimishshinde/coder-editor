import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';
import ACTIONS from '../../Actions';
import { update } from '../../Pages/slices/editorPageSlice';
import { KEYS } from '../../redux/store';
import { useOutletContext } from 'react-router-dom';
import { MONACO_OPTIONS } from '../../constants/monacoOptions';

function MonacoEditor() {
	const { socketRef, roomId } = useOutletContext();
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
			options={MONACO_OPTIONS}
			onChange={handleEditorChange}
		/>
	);
}

export default MonacoEditor;
