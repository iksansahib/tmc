import { DataSource } from 'typeorm';
import { ProductsQueryEntity } from './products-query.entity';

export const productsQueryProviders = [
  {
    provide: 'PRODUCTS_QUERY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductsQueryEntity),
    inject: ['DATA_SOURCE_QUERY'],
  },
];
