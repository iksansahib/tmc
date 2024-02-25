import { DataSource } from 'typeorm';

export const queryDatabaseSourceOptions = new DataSource({
  type: 'mysql',
  name: 'query',
  host: 'mysql-db-query',
  port: 3306,
  username: 'db_user',
  password: 'password',
  database: 'test_database_query',
  entities: ['./**/queries/**/*.entity.js'],
  migrations: ['./../**/migrations-2/*.js'],
});
