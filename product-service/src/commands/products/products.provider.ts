import { DataSource } from 'typeorm';
import { ProductsEntity } from './products.entity';

export const productsProviders = [
  {
    provide: 'PRODUCTS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductsEntity),
    inject: ['DATA_SOURCE'],
  },
];
