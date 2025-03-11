"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'host.docker.internal',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'restapi',
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
});
//# sourceMappingURL=data-source.js.map