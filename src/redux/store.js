import { configureStore } from '@reduxjs/toolkit';
import codeReducer from '../../src/Pages/editorPageSlice';

export const store = configureStore({
	reducer: {
		codeSlice: codeReducer,
	},
});

export const KEYS = {
	codeSlice: 'codeSlice',
};
