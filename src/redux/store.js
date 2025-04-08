import { configureStore } from '@reduxjs/toolkit';
import codeReducer from '../../src/Pages/slices/editorPageSlice';
import terminalReducer from '../../src/Pages/slices/terminalSlice';
import sandboxReducer from '../../src/components/slices/sandboxSlice';

export const KEYS = {
	codeSlice: 'codeSlice',
	terminalSlice: 'terminalSlice',
	sandboxSlice: 'sandboxSlice',
};

export const store = configureStore({
	reducer: {
		[KEYS.codeSlice]: codeReducer,
		[KEYS.terminalSlice]: terminalReducer,
		[KEYS.sandboxSlice]: sandboxReducer,
	},
});
