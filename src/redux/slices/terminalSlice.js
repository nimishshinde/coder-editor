import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	open: false,
	data: [],
	exeId: 0,
	error: {},
};

export const terminalSlice = createSlice({
	name: 'terminalSlice',
	initialState,
	reducers: {
		setOpenTerminal: (state, action) => {
			state.open = action.payload;
		},
		setTerminalData: (state, action) => {
			state.data = action.payload;
		},
		setExeId: (state, action) => {
			state.exeId = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setOpenTerminal, setTerminalData, setExeId } = terminalSlice.actions;

export default terminalSlice.reducer;
