import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generate } from 'random-words';
import toast from 'react-hot-toast';
import Logo from '../components/Logo';
import { Box, Stack, Typography } from '@mui/material';

function Home() {
	const [roomId, setRoomId] = useState('');
	const [username, setUsername] = useState('');
	const [editorType, setEditortype] = useState('javascript');
	const editortypes = {
		js: 'javascript',
		frontend: 'frontend',
	};
	const navigate = useNavigate();

	const generateRoomId = (event) => {
		event.preventDefault();
		const roomdId = generate({ exactly: 3, join: '-' });
		setRoomId(roomdId);
		toast.success('Created new room');
	};

	const handleJoinRoom = () => {
		if (roomId === '' || username === '') {
			return toast.error('Room Id and User Name is required');
		}

		navigate('/editor/' + editorType + '/' + roomId, {
			state: { username: username },
		});
	};

	const handleInputEnter = (event) => {
		if (event.code === 'Enter') {
			handleJoinRoom();
		}
	};

	return (
		<div className="homePageWrapper">
			<div className="formWrapper">
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
						width: '83%',
					}}>
					<Logo
						style={{
							width: '18rem',
							marginBottom: '2rem',
						}}
					/>
				</div>
				<Box marginBottom={'16px'}>
					<Stack
						direction={'row'}
						justifyContent={'space-evenly'}
						alignItems={'center'}
						spacing={2}>
						<Box
							className={`editorType  ${editorType === editortypes.js ? 'activeEditorType' : 'inactiveEditorType'}`}
							onClick={() => setEditortype(editortypes.js)}>
							<Stack
								direction={'column'}
								alignItems={'center'}
								justifyContent={'center'}
								padding={'8px'}>
								<img
									src="/JavaScript-logo.png"
									alt=""
									className="editorTypeLogo"
								/>
								<Typography>Javascript</Typography>
							</Stack>
						</Box>
						<Box
							className={`editorType  ${editorType === editortypes.frontend ? ' activeEditorType' : 'inactiveEditorType'}`}
							onClick={() => setEditortype(editortypes.frontend)}>
							<Stack
								direction={'column'}
								alignItems={'center'}
								justifyContent={'center'}
								padding={'8px'}>
								<img
									alt="Frontend logo"
									src="/html1.jpg"
									className="editorTypeLogo"
								/>
								<Typography>Frontend</Typography>
							</Stack>
						</Box>
					</Stack>
				</Box>
				<h4 className="mainLabel">Paste invitation Room Id</h4>
				<div className="inputGroup">
					<input
						type="text"
						className="inputBox"
						placeholder="Room Id"
						value={roomId}
						onChange={(e) => setRoomId(e.target.value)}
						onKeyUp={handleInputEnter}
					/>
					<input
						type="text"
						className="inputBox"
						placeholder="User Name"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						onKeyUp={handleInputEnter}
					/>
					<button
						className="btn joinBtn"
						disabled={roomId !== '' && username !== '' ? false : true}
						onClick={handleJoinRoom}>
						Join
					</button>

					<span className="createInfo">
						If you dont have a invite then create &nbsp;
						<a
							href=""
							className="createNewBtn"
							onClick={generateRoomId}>
							new room
						</a>
					</span>
				</div>
			</div>

			<footer>
				Built with ❤️ by <a href="">Nimish Shinde </a>
			</footer>
		</div>
	);
}

export default Home;
