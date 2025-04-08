import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	showFileSystem: false,
	files: [],
	currentFile: null,
};

export const fileSystemSlice = createSlice({
	name: 'fileSystemSlice',
	initialState,
	reducers: {
		addFile: (state, action) => {
			state.files.push(action.payload);
		},
		toggleFileSystem: (state) => {
			state.showFileSystem = !state.showFileSystem;
		},
	},
});

// Action creators are generated for each case reducer function
// This let us use openCloseFile in the component's
export const { addFile, toggleFileSystem } = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
