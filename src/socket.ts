import { io } from '.';

io.on('connection', (socket) => {
  console.log('somethings happening');

  socket.on('joinSession', (sessionId) => {
    console.log('joined session room with id:', sessionId);

    socket.join(String(sessionId));
  });
});

io.engine.on('connection_error', (err) => {
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});
