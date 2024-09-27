import { configureStore } from '@reduxjs/toolkit';
import codeReducer from '../../src/Pages/slices/editorPageSlice';
import terminalReducer from '../../src/Pages/slices/terminalSlice';

export const store = configureStore({
	reducer: {
		codeSlice: codeReducer,
		terminalSlice: terminalReducer,
	},
});

export const KEYS = {
	codeSlice: 'codeSlice',
	terminalSlice: 'terminalSlice',
};
