import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	openFile: false,
};

export const sandboxSlice = createSlice({
	name: 'sandboxSlice',
	initialState,
	reducers: {
		openCloseFile: (state, action) => {
			state.openFile = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
// This let us use openCloseFile in the component's
export const { openCloseFile } = sandboxSlice.actions;

export default sandboxSlice.reducer;
