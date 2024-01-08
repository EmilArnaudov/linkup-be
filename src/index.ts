import express, { Express, Request, Response, Application } from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import router from './routes';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});