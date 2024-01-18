import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import { AppDataSource } from './data-source';
import 'reflect-metadata';
import { Server } from 'socket.io';
import { rescheduleSessions } from './services/session/sessionService';

//For env File
dotenv.config();

let io: Server;

AppDataSource.initialize()
  .then(async () => {
    const app: Application = express();
    const port = process.env.PORT || 8000;

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use('/', router);
    const httpServer = app.listen(port, () => {
      rescheduleSessions();
      console.log(`Server is Fire at http://localhost:${port}`);
    });

    io = new Server(httpServer);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export { io };
