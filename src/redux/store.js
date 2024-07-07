import { configureStore } from '@reduxjs/toolkit';
import codeReducer from '../../src/Pages/editorPageSlice';

export const store = configureStore({
	reducer: {
		code: codeReducer,
	},
});
