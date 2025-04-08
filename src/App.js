import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Home, EditorPage } from './Pages';
import { MonacoEditor, SandboxEditor } from './components';
import './styles/index.css';
import './styles/app.css';
function App() {
	return (
		<>
			<div>
				<Toaster
					position="top-right"
					toastOptions={{
						duration: 5000,
						success: {
							theme: {
								primary: '#4aed88',
							},
						},
					}}></Toaster>
			</div>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/editor/:editorType/:roomId"
						element={<EditorPage />}
					/>
					<Route
						path="/editor"
						element={<EditorPage />}>
						<Route
							path="javascript/:roomId"
							element={<MonacoEditor />}
						/>
						<Route
							path="frontend/:roomId"
							element={<SandboxEditor />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
