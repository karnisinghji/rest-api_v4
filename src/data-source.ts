import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'host.docker.internal',
  port: 5432,
  username: 'postgres', // Change this if needed
  password: 'postgres',
  database: 'restapi',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});
