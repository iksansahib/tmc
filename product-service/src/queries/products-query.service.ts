import { Repository } from 'typeorm';
import { ProductsQueryEntity } from './products-query.entity';
import { Inject } from '@nestjs/common';
import { SavedProductEvent } from './../commands/products/products.event';

export class ProductsQueryService {
  constructor(
    @Inject('PRODUCTS_QUERY_REPOSITORY')
    private productsQueryEntityRepository: Repository<ProductsQueryEntity>,
  ) {}

  async find(where, take: number, skip: number, page: number) {
    const data = await this.productsQueryEntityRepository.findAndCount({
      where,
      take,
      skip,
    });
    return {
      data: data[0],
      paging: {
        size: take,
        total: data[1],
        current: page,
      },
    };
  }

  async save(savedProductEvent: SavedProductEvent) {
    this.productsQueryEntityRepository.save(savedProductEvent);
  }
}
