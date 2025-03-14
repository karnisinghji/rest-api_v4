"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || '34.126.210.143',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '2000',
    database: process.env.DB_NAME || 'viratkohli',
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: true,
});
exports.AppDataSource.initialize()
    .then(() => console.log('Data Source initialized'))
    .catch((err) => console.error('Error during Data Source initialization', err));
//# sourceMappingURL=data-source%202.js.map