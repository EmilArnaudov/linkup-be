import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './entities/User.entity';

//For env File
dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [__dirname + '/entities/*{.js,.ts}'],
  migrations: [__dirname + '/database/migrations/*.ts'],
});
