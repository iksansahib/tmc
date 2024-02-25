import { dataSourceOptions } from './database.source';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = dataSourceOptions;
      return dataSource.initialize();
    },
  },
];
