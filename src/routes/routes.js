import { Home, EditorPage } from '../Pages';

export const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/editor/:editorType/:roomId', element: <EditorPage /> },
];
