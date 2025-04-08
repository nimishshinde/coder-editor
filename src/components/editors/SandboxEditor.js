// import React, { useEffect, useState } from 'react';
// import {
// 	Sandpack,
// 	SandpackProvider,
// 	SandpackLayout,
// 	SandpackCodeEditor,
// 	SandpackPreview,
// 	SandpackThemeProvider,
// 	SandpackStack,
// 	// SandpackFileExplorer,
// } from '@codesandbox/sandpack-react';
// import { amethyst, dracula, sandpackDark, nightOwl } from '@codesandbox/sandpack-themes';
// import { appBoilterPlateCode } from '../../boiler-plate-code/jsx/app';
// import { buttonTemplate } from '../../boiler-plate-code/jsx/button';
// import { KEYS } from '../redux/store';
// import { useDispatch, useSelector } from 'react-redux';

// function SandboxEditor() {
//Constants
// 	const FILES = {
// 		'/App.js': {
// 			code: appBoilterPlateCode,
// 		},
// 		'Button.js': {
// 			code: buttonTemplate,
// 		},
// '/package.json': {
// 	code: JSON.stringify({
// 		dependencies: {
// 			react: 'latest',
// 			'react-dom': 'latest',
// 			'react-scripts': 'latest',
// 		},
// 	}),
// },
// 	};

// 	//Redux
// 	const dispatch = useDispatch();
// 	const { sandboxSlice } = KEYS;
// 	const sandboxEditor = useSelector((state) => {
// 		return state[sandboxSlice];
// 	});

// 	//States
// 	const [activeFile, setActiveFile] = useState('/Button.js');
// 	const [files, setFiles] = useState(FILES);

// 	useEffect(() => {
// 		setFiles((prevFiles) => ({
// 			...prevFiles,
// 			[activeFile]: {
// 				...prevFiles[activeFile],
// 				active: true,
// 			},
// 		}));
// 	}, [sandboxEditor]);

// 	return (
// 		<>
// 			<Sandpack
// 				files={files}
// 				theme={sandpackDark}
// 				template="react"
// 			/>
// 			;
// 		</>
// 	);
// }

// export default SandboxEditor;

import { SandpackProvider, SandpackLayout, SandpackPreview } from '@codesandbox/sandpack-react';
import { MonacoSandpackEditor } from './MonacoSandpackEditor';
import { appBoilterPlateCode } from '../../boiler-plate-code/jsx/app';
import { buttonTemplate } from '../../boiler-plate-code/jsx/button';

export default function SandboxEditor() {
	const FILES = {
		'/App.js': {
			code: appBoilterPlateCode,
		},
		'Button.js': {
			code: buttonTemplate,
		},
		// '/package.json': {
		// 	code: JSON.stringify({
		// 		dependencies: {
		// 			react: 'latest',
		// 			'react-dom': 'latest',
		// 			'react-scripts': 'latest',
		// 		},
		// 	}),
		// },
	};
	return (
		<SandpackProvider
			files={FILES}
			template="react"
			theme="dark">
			<SandpackLayout>
				<MonacoSandpackEditor />
				<SandpackPreview style={{ height: '100vh' }} />
			</SandpackLayout>
		</SandpackProvider>
	);
}
