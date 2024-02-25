import { DataSource } from 'typeorm';

export const dataSourceOptions = new DataSource({
  type: 'mysql',
  name: 'command',
  host: 'mysql-db',
  port: 3306,
  username: 'db_user',
  password: 'password',
  database: 'test_database',
  entities: ['./**/commands/**/*.entity.js'],
  migrations: ['./../**/migrations/*.js'],
});
