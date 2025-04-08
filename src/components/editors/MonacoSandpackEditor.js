import Editor from '@monaco-editor/react';
import { useActiveCode, SandpackStack, FileTabs, useSandpack } from '@codesandbox/sandpack-react';
import { MONACO_OPTIONS } from '../../constants/monacoOptions';
import { useEffect } from 'react';

export function MonacoSandpackEditor() {
	const { code, updateCode } = useActiveCode();
	const { sandpack } = useSandpack();
	const { setActiveFile } = sandpack;

	return (
		<>
			<SandpackStack style={{ height: '100vh', margin: 0 }}>
				<FileTabs closableTabs />
				<div style={{ flex: 1, paddingTop: 8, background: '#1e1e1e' }}>
					<Editor
						width="100%"
						height="100%"
						language="javascript"
						theme="vs-dark"
						key={sandpack.activeFile}
						defaultValue={code}
						onChange={(value) => updateCode(value || '')}
						fontSize={24}
						options={MONACO_OPTIONS}
					/>
				</div>
			</SandpackStack>
		</>
	);
}
