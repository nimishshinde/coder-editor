import React from 'react';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setOpenTerminal } from '../Pages/slices/terminalSlice';
import { Box, Stack } from '@mui/material';

function TerminalHeader() {
	const dispatch = useDispatch();
	const closeTerminal = () => {
		dispatch(setOpenTerminal(false));
	};

	return (
		<Box
			sx={{
				width: '100%',
				borderBottom: '2px solid #222222',
				marginBottom: '8px',
			}}>
			<Stack
				display={'flex'}
				direction={'column'}
				alignItems={'flex-end'}
				justifyContent={'center'}>
				<IconButton
					style={{
						color: 'white',
					}}
					onClick={closeTerminal}
					children={<Close sx={{ fontSize: '16px' }} />}
				/>
			</Stack>
		</Box>
	);
}

export default TerminalHeader;
