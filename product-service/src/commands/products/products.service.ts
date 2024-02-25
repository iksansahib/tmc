import { ProductSaveDto } from './products.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ProductsEntity } from './products.entity';
import { Repository } from 'typeorm';
import { CategoriesEntity } from '../categories/categories.entity';
import { SavedProductEvent } from './products.event';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private productsEntityRepository: Repository<ProductsEntity>,
    @Inject('CATEGORIES_REPOSITORY')
    private categoriesEntityRepository: Repository<CategoriesEntity>,
    @InjectQueue('cqrs') private cqrs: Queue,
  ) {}

  async save(productSaveDto: ProductSaveDto): Promise<void> {
    const entity = await this.productsEntityRepository.save(productSaveDto);
    const category = await this.categoriesEntityRepository.findOneBy({
      id: entity.category.id,
    });
    await this.cqrs.add(
      new SavedProductEvent(
        entity.id,
        entity.sku,
        entity.name,
        entity.price,
        entity.stock,
        entity.category.id,
        category.name,
      ),
    );
  }
  async checkSkuExists(sku: string) {
    return await this.productsEntityRepository.findOneBy({ sku });
  }
}
