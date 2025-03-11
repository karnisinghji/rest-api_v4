import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'host.docker.internal',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'restapi',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Set to false in production
  logging: true,
});

AppDataSource.initialize()
  .then(() => console.log('Data Source initialized'))
  .catch((err) =>
    console.error('Error during Data Source initialization', err),
  );
