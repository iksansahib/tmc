import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ProductsQueryService } from './products-query.service';
import { GetProductQuery } from './products-query.dto';
import { In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { ApieKeyGuard } from '../api-key.guard';

@Controller('api/search')
@UseGuards(ApieKeyGuard)
export class ProductsQueryController {
  constructor(private productsQueryService: ProductsQueryService) {}
  @Get()
  async search(@Query() query: GetProductQuery) {
    let where = {};
    if (query.sku && query.sku.length > 0) {
      where = {
        ...where,
        sku: In(query.sku),
      };
    }

    if (query.name && query.name.length > 0) {
      where = {
        ...where,
        name: In(query.name),
      };
    }

    if (query['price.start']) {
      where = {
        ...where,
        price: MoreThanOrEqual(query['price.start']),
      };
    }

    if (query['price.end']) {
      where = {
        ...where,
        price: LessThanOrEqual(query['price.end']),
      };
    }

    if (query['stock.start']) {
      where = {
        ...where,
        stock: MoreThanOrEqual(query['stock.start']),
      };
    }

    if (query['stock.end']) {
      where = {
        ...where,
        stock: LessThanOrEqual(query['stock.end']),
      };
    }

    if (query['category.id'] && query['category.id'].length > 0) {
      where = {
        ...where,
        categoryId: In(query['category.id']),
      };
    }

    if (query['category.name'] && query['category.name'].length > 0) {
      where = {
        ...where,
        categoryName: In(query['category.name']),
      };
    }
    const entity = await this.productsQueryService.find(
      where,
      query.size,
      query.page == 1 ? 0 : (query.page - 1) * query.size,
      query.page,
    );
    return entity;
  }
}
