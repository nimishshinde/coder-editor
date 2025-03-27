/**
 *  This component take a single result from terminal state, regardless of
 *  success or error it display the console logs statements from code.
 */

import React from 'react';
import { Box, Typography, Chip, Icon } from '@mui/material';
// import TurnSlightRightIcon from '@mui/icons-material/TurnRight';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';

const FilePathUI = ({ children }) => {
	return (
		<Box
			sx={{
				backgroundColor: '#1e1e1e',
				marginBottom: '8px',
			}}>
			<Box
				display="flex"
				alignItems="center"
				sx={{
					padding: '8px 0px',
					borderRadius: '4px',
					color: 'white',
					fontFamily: 'monospace',
					width: '90%',
				}}>
				{/* File Path */}
				<Typography
					variant="body2"
					sx={{
						backgroundColor: '#3574f0',
						padding: '4px 10px',
						borderRadius: '4px',
						color: 'white',
						borderTopRightRadius: '20px',
						borderBottomRightRadius: '20px',
						'& span': { color: '#61dafb' }, // Highlights folder names
					}}>
					~/buddy-editor
				</Typography>
			</Box>
			<Box
				display={'flex'}
				alignItems={'center'}
				justifyContent={'flex-start'}>
				<Icon
					sx={{
						marginTop: '-10px',
						marginLeft: '-4px',
					}}>
					{' '}
					<TurnLeftIcon
						fontSize={'small'}
						sx={{ color: 'white', transform: 'rotate(180deg)' }}
					/>
				</Icon>
				{children}
			</Box>
		</Box>
	);
};

function TerminalResult({ result }) {
	console.log(result);

	const getErrorMessage = (result) => {
		if (result?.resultData?.stack?.split('\n')[0]) {
			return result.resultData.stack.split('\n')[0];
		} else {
			return result.resultData.message;
		}
	};

	if (result.resultType === 'error') {
		return (
			<FilePathUI>
				<Box>
					<Typography
						sx={{ whiteSpace: 'break-spaces', fontSize: '12px' }}
						color="#EC5228">
						{/* {result.resultData.stack.split('\n')[0]} */}
						{getErrorMessage(result)}
					</Typography>
					<Typography
						sx={{ whiteSpace: 'break-spaces', fontSize: '12px' }}
						color="#EC5228"></Typography>
				</Box>
			</FilePathUI>
		);
	} else {
		return (
			<FilePathUI>
				<Box>
					<Typography
						sx={{ whiteSpace: 'break-spaces', fontSize: '12px' }}
						color="white">
						{result.resultData}
					</Typography>
				</Box>
			</FilePathUI>
		);
	}
}

export default TerminalResult;
