import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { KEYS } from '../redux/store';
import TerminalHeader from './TerminalHeader';
import { setOpenTerminal } from '../Pages/slices/terminalSlice';
import { Box, Stack } from '@mui/material';

// import component 👇
import Drawer from 'react-modern-drawer';

//import styles 👇
import 'react-modern-drawer/dist/index.css';
import TerminalResult from './TerminalResult';

function Terminal() {
	const { terminalSlice } = KEYS;
	const dispatch = useDispatch();
	const open = useSelector((state) => {
		return state[terminalSlice].open;
	});

	const terminalState = useSelector((state) => {
		return state[terminalSlice].data;
	});

	const closeTerminal = () => {
		dispatch(setOpenTerminal(false));
	};

	useEffect(() => {
		console.log('Terminal Open Close: ', open);
	}, [open]);

	useEffect(() => {
		console.log({ terminalState });
	}, [terminalState]);

	if (open) {
		return (
			<Box
				sx={{
					scrollBehavior: 'smooth',
					overflowX: ' overflow',
					overflow: 'smooth',
				}}
				bgcolor={'#1e1e1e'}>
				<Stack
					direction={'row'}
					justifyContent={'flex-end'}
					alignItems={'center'}
					sx={{
						float: 'right',
						left: '100',
						width: '80%',
					}}>
					<Drawer
						open={open}
						onClose={closeTerminal}
						enableOverlay={false}
						direction="bottom"
						style={{
							backgroundColor: '#1e1e1e',
							// width: '82%',
							left: '100',
						}}>
						<TerminalHeader />
						<Box
							sx={{
								overflow: 'scroll',
								scrollBehavior: 'smooth',
								height: '100%',
							}}>
							{terminalState.map((result, idx) => (
								<>
									<TerminalResult result={result} />
								</>
							))}
						</Box>
					</Drawer>
				</Stack>
			</Box>
		);
	}
}

export default Terminal;

//
