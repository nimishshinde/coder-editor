import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import ACTIONS from '../Actions';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import { Logo, Cilent, Editor, Terminal, MonacoEditor } from '../components';
import { initSocket } from '../socket/socket';
import { useSelector, useDispatch } from 'react-redux';
import { KEYS } from '../redux/store';
import { setOpenTerminal, setTerminalData } from '../redux/slices/terminalSlice';
import { SUCCESS, ERROR } from './constants';
import { Outlet } from 'react-router-dom';
import { toggleFileSystem } from '../redux/slices/fileSystemSlice';

function EditorPage() {
	const { codeSlice, terminalSlice } = KEYS;
	const socketRef = useRef(null);
	const location = useLocation();
	const { roomId, editorType } = useParams();
	const reactNavigate = useNavigate();
	const dispatch = useDispatch();

	const [cilents, setCilents] = useState([]);

	const workerRef = useRef(null);

	const code = useSelector((state) => {
		return state[codeSlice];
	});
	const terminal = useSelector((state) => {
		return state[terminalSlice];
	});
	const sandboxEditor = useSelector((state) => {
		return state[KEYS.sandboxSlice];
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

	const insertInTerimalData = (data) => {
		const terminalData = terminal.data;
		const temp = [...terminalData, data];
		dispatch(setTerminalData(temp));
	};

	const setTerminalResultData = (type, data) => {
		insertInTerimalData({
			resultType: type,
			resultData: data,
		});
	};

	const onMessageReceived = (data) => {
		const { error } = data.data;
		if (error) {
			setTerminalResultData(ERROR, error);
		} else {
			setTerminalResultData(SUCCESS, data.data);
		}

		dispatch(setOpenTerminal(true));
		workerRef.current.terminate();

		//To avoid alerting the user of code taking too long to run, in destroyWorkerFn
		workerRef.current = null;
	};

	/**
	 * @returns {void}
	 * @description This function is written to destroy the worker if the worker takes more than 2 secs
	 * to give back the result, assuming the worker is blocked into infinite loop
	 */
	function destroyWorkerFn() {
		setTimeout(() => {
			if (workerRef.current) {
				alert('Taking too long to run, please check your code and try again');
				workerRef.current?.terminate();
			}
		}, 2000);
	}

	const runCode = () => {
		try {
			if (!window.Worker) {
				alert(
					'Your browser doesnt support certain features to run code,' +
						'Please try some other browser such as Chrome, Edge, Firefox, etc.'
				);
				return '';
			}

			workerRef.current = new Worker(new URL('../workers/worker.js', import.meta.url));
			workerRef.current.postMessage(code);
			workerRef.current.onmessage = onMessageReceived;
			destroyWorkerFn();
		} catch (error) {
			console.error('Error occurred while running the code', error);
			alert('Error occurred while running the code, Please reload the window and try again');
		}
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
				setCilents((prevCilents) =>
					prevCilents.filter((cilent) => cilent.socketId !== socketId)
				);
			});
		};

		init();
	}, []);

	useEffect(() => {
		if (editorType === 'frontend') {
			dispatch(toggleFileSystem());
		}
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
					onClick={handleCopyBtn}>
					Copy Room Id
				</button>
				<button
					className="btn leaveBtn"
					onClick={runCode}>
					Run Code
				</button>
				<button
					className="btn leaveBtn"
					onClick={handleLeaveRoom}>
					Leave
				</button>
			</div>

			<div className="editorWrap">
				{/* <Editor
					socketRef={socketRef}
					roomId={roomId}
				/> */}
				{/* <MonacoEditor
					socketRef={socketRef}
					roomId={roomId}
				/> */}
				<Outlet
					context={{
						socketRef,
						roomId,
					}}
				/>
				<Terminal />
			</div>
		</div>
	);
}

export default EditorPage;
