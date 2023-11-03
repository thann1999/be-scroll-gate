import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: ['src/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/**/migrations/*{.ts,.js}'],
  synchronize: true,
  migrationsRun: false,
});

export default AppDataSource;
