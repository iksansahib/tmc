import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { queryDatabaseProviders } from './query-database.provider';

@Module({
  providers: [...databaseProviders, ...queryDatabaseProviders],
  exports: [...databaseProviders, ...queryDatabaseProviders],
})
export class DatabaseModule {}
