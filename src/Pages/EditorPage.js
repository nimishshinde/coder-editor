import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import ACTIONS from '../Actions';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import { Logo, Cilent, Editor } from '../components';
import { initSocket } from '../socket/socket';
import { useSelector, useDispatch } from 'react-redux';
import { KEYS } from '../redux/store';

function EditorPage() {
	const { codeSlice } = KEYS;
	const socketRef = useRef(null);
	const location = useLocation();
	const { roomId } = useParams();
	const reactNavigate = useNavigate();

	const [cilents, setCilents] = useState([]);
	const code = useSelector((state) => {
		return state[codeSlice];
	});

	const handleCopyBtn = async () => {
		try {
			navigator.clipboard.writeText(roomId);
			toast.success('Room Id has copied to clipboard');
		} catch (err) {
			toast.error('Could not copy the room Id');
			console.error(err);
		}
	};

	const handleLeaveRoom = () => {
		socketRef.current.disconnect();
		reactNavigate('/');
	};

	const runCode = () => {
		console.log(code);
	};

	useEffect(() => {
		if (!location.state?.username) {
			return;
		}

		function handleError(err) {
			toast.error('Connection failed please try again later.');
			reactNavigate('/');
		}

		const init = async () => {
			socketRef.current = await initSocket();

			// Error Handling
			socketRef.current.on('connect_error', (err) => handleError(err));
			socketRef.current.on('connect_failed', (err) => handleError(err));

			// Event: Join
			socketRef.current.emit(ACTIONS.JOIN, {
				roomId,
				username: location.state?.username,
			});

			// Event: Joined
			socketRef.current.on(ACTIONS.JOINED, ({ cilents, socketId, username }) => {
				setCilents(cilents);
				if (username !== location.state?.username) {
					toast.success(`${username} joined the room`);
				}
			});

			// Event: Disconnected
			socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
				alert('disconnected event triggered');
				toast.success(`${username} left the room`);
				setCilents((prevCilents) => prevCilents.filter((cilent) => cilent.socketId !== socketId));
			});
		};

		init();
	}, []);

	if (!location.state?.username) {
		return <Navigate to="/" />;
	}

	return (
		<div className="mainWrap">
			<div className="aside">
				<div className="asideInner">
					<div className="logo">
						<Logo customeClass="logoImage" />
					</div>
					<h3>Connected</h3>
					<div className="clientsList">
						{cilents.map((cilent) => (
							<Cilent
								key={cilent.socketId}
								userName={cilent.username}
							/>
						))}
					</div>
				</div>

				<button
					className="btn copyBtn"
					onClick={handleCopyBtn}
				>
					Copy Room Id
				</button>
				<button
					className="btn leaveBtn"
					onClick={runCode}
				>
					Run Code
				</button>
				<button
					className="btn leaveBtn"
					onClick={handleLeaveRoom}
				>
					Leave
				</button>
			</div>

			<div className="editorWrap">
				<Editor
					socketRef={socketRef}
					roomId={roomId}
				/>
			</div>
		</div>
	);
}

export default EditorPage;
