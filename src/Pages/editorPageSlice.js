import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	code: '',
};

export const codeSlice = createSlice({
	name: 'codeSlice',
	initialState,
	reducers: {
		update: (state, payload) => {
			state.code = payload.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { update } = codeSlice.actions;

export default codeSlice.reducer;
