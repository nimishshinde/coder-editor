import React, { useEffect, useState } from 'react';
import {
	Sandpack,
	SandpackProvider,
	SandpackLayout,
	SandpackCodeEditor,
	SandpackPreview,
	SandpackThemeProvider,
	SandpackStack,
	// SandpackFileExplorer,
} from '@codesandbox/sandpack-react';
import { amethyst, dracula, sandpackDark } from '@codesandbox/sandpack-themes';
import { appBoilterPlateCode } from '../boiler-plate-code/jsx/app';
import { KEYS } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { buttonTemplate } from '../boiler-plate-code/jsx/button';

import { nightOwl } from '@codesandbox/sandpack-themes';
import { SandpackFileExplorer } from 'sandpack-file-explorer';

function SandboxEditor() {
	//Constants
	const FILES = {
		'/App.js': {
			code: appBoilterPlateCode,
		},
		'Button.js': {
			code: buttonTemplate,
		},
		'/package.json': {
			code: JSON.stringify({
				dependencies: {
					react: 'latest',
					'react-dom': 'latest',
					'react-scripts': 'latest',
				},
			}),
		},
	};

	//Redux
	const dispatch = useDispatch();
	const { sandboxSlice } = KEYS;
	const sandboxEditor = useSelector((state) => {
		return state[sandboxSlice];
	});

	//States
	const [activeFile, setActiveFile] = useState('/Button.js');
	const [files, setFiles] = useState(FILES);

	useEffect(() => {
		setFiles((prevFiles) => ({
			...prevFiles,
			[activeFile]: {
				...prevFiles[activeFile],
				active: true,
			},
		}));
	}, [sandboxEditor]);

	// return (
	// 	<Sandpack
	// 		theme={{
	// 			colors: {
	// 				surface1: '#282c34',
	// 				surface2: '#21252b',
	// 				surface3: '#2c313c',
	// 				clickable: '#a8b1c2',
	// 				base: '#a8b1c2',
	// 				disabled: '#4d4d4d',
	// 				hover: '#e8effc',
	// 				accent: '#c678dd',
	// 				error: '#e06c75',
	// 				errorSurface: '#ffeceb',
	// 			},
	// 			syntax: {
	// 				plain: '#a8b1c2',
	// 				comment: {
	// 					color: '#757575',
	// 					fontStyle: 'italic',
	// 				},
	// 				keyword: '#c678dd',
	// 				tag: '#e06c75',
	// 				punctuation: '#a8b1c2',
	// 				definition: '#62aeef',
	// 				property: '#d19a66',
	// 				static: '#a8b1c2',
	// 				string: '#98c379',
	// 			},
	// 			font: {
	// 				body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
	// 				mono: 'jetbrains mono',
	// 				size: '13px',
	// 				lineHeight: '20px',
	// 			},
	// 		}}
	// 		files={files}
	// 	/>
	// );

	return (
		<>
			<SandpackProvider template="react-ts">
				<SandpackThemeProvider theme={sandpackDark}>
					<SandpackStack>
						<SandpackLayout>
							<div
								style={{
									display: 'flex',
									width: '100%',
									minHeight: '300px',
									maxHeight: '300px',
									backgroundColor: `var(--sp-colors-surface1)`,
								}}>
								<div
									style={{
										minWidth: 150,
										maxWidth: '300px',
										overflow: 'hidden',
									}}>
									<SandpackFileExplorer />
								</div>
								<div style={{ flex: 'min-content' }}>
									<SandpackCodeEditor
										wrapContent
										style={{
											minHeight: '100%',
											maxHeight: '100%',
											overflow: 'auto',
										}}
										showTabs
										closableTabs
										showInlineErrors
										showLineNumbers
									/>
								</div>
								<SandpackPreview />
							</div>
						</SandpackLayout>
					</SandpackStack>
				</SandpackThemeProvider>
			</SandpackProvider>
		</>
	);
}

export default SandboxEditor;
