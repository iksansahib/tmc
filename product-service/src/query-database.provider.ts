import { queryDatabaseSourceOptions } from './query-database.source';

export const queryDatabaseProviders = [
  {
    provide: 'DATA_SOURCE_QUERY',
    useFactory: async () => {
      const dataSource = queryDatabaseSourceOptions;
      return dataSource.initialize();
    },
  },
];
