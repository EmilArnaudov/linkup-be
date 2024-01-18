import { io } from '.';

io.on('connection', (socket) => {
  socket.on('joinSession', (sessionId) => {
    socket.join(String(sessionId));
  });
});
