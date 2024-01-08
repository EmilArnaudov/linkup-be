import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import { AppDataSource } from './data-source';
import 'reflect-metadata';

//For env File
dotenv.config();

AppDataSource.initialize()
  .then(() => {
    const app: Application = express();
    const port = process.env.PORT || 8000;

    app.use(cors());
    app.use('/', router);
    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
