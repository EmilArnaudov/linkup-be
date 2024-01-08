import express, { Express, Request, Response, Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import 'reflect-metadata';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'my-secret-pw',
//   database: 'mydb'
// });

// // Test the connection
// connection.connect(err => {
//   if (err) {
//     console.error('An error occurred: ' + err.message);
//     return;
//   }

//   console.log('Connected to the MySQL server.');
// });
