import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

dotenv.config();
const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, 'db', 'models', '*.entity{.ts,.js}')],
  synchronize: true,
  logging: true,
};

export = config;
