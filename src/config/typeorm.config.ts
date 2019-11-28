import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TYPEORMCONFIG: TypeOrmModuleOptions = {
  database: 'chat_app_server',
  host: 'localhost',
  username: 'root',
  port: 3306,
  type: 'mysql',
  entities: [__dirname + '/../**/*.entity{.js,.ts}'],
  synchronize: true,
};

// export const TYPEORMCONFIG: TypeOrmModuleOptions = {
//   database: 'chat_app_server.db',
//   type: 'sqlite',
//   entities: [__dirname + '/../**/*.entity{.js,.ts}'],
//   synchronize: true,
// };

/*
ClearDB config 
*/

// const database = 'heroku_b6c8628db9f69b2';
// const host = 'eu-cdbr-west-02.cleardb.net';
// const username = 'b0ec56135a6d95';
// const password = 'cbd1c26e';
// const port = 3306;

// export const TYPEORMCONFIG: TypeOrmModuleOptions = {
//   database,
//   host,
//   username,
//   password,
//   port,
//   type: 'mysql',
//   entities: [__dirname + '/../**/*.entity{.js,.ts}'],
//   synchronize: true,
// };
