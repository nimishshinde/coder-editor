const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const ACTIONS = require('./src/Actions');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

function getAllConnectedCilents(roomId) {
	/**
	 * Gives you list of all connected cilents in a room.
	 * */
	return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
		return {
			socketId,
			username: userSocketMap[socketId],
		};
	});
}

io.on('connection', (socket) => {
	socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
		console.log('RoomId and username', roomId, username);
		/**
		 * Steps
		 * 1. Add user to room and keep its entry in userSocketMap
		 * 2. Get list of all connected cilents
		 * 3. Emit joined event to all connected cilents in the room with the new connection
		 *    socket Id & username
		 * */

		// Step 1
		userSocketMap[socket.id] = username;
		socket.join(roomId);

		// Step 2
		const cilents = getAllConnectedCilents(roomId);

		// Step 3
		cilents.forEach(({ socketId }) => {
			console.log('Emiting to', socketId);
			io.to(socketId).emit(ACTIONS.JOINED, {
				cilents,
				socketId: socket.id,
				username,
			});
		});
	});

	socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
		socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
	});

	socket.on('disconnecting', () => {
		console.log('disconnecting event recieved ');
		const rooms = [...socket.rooms];
		console.log('rooms', rooms);
		rooms.forEach((roomId) => {
			socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
				socketId: socket.id,
				username: userSocketMap[socket.id],
			});
		});

		delete userSocketMap[socket.id];
		socket.leave();
	});
});

const PORT = 5001;
server.listen(PORT, () => {
	console.log('Listening on port' + PORT);
});
