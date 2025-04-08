import { configureStore } from '@reduxjs/toolkit';
import codeReducer from './slices/editorPageSlice';
import terminalReducer from './slices/terminalSlice';
import sandboxReducer from './slices/sandboxSlice';
import fileSystemReducer from './slices/fileSystemSlice';

export const KEYS = {
	codeSlice: 'codeSlice',
	terminalSlice: 'terminalSlice',
	sandboxSlice: 'sandboxSlice',
	fileSystemSlice: 'fileSystemSlice',
};

export const store = configureStore({
	reducer: {
		[KEYS.codeSlice]: codeReducer,
		[KEYS.terminalSlice]: terminalReducer,
		[KEYS.sandboxSlice]: sandboxReducer,
		[KEYS.fileSystemSlice]: fileSystemReducer,
	},
});
