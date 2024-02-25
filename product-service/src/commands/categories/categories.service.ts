import { CategorySaveDto } from './categories.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CategoriesEntity } from './categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private categoriesEntityRepository: Repository<CategoriesEntity>,
  ) {}

  async save(categorySaveDto: CategorySaveDto) {
    return await this.categoriesEntityRepository.save(categorySaveDto);
  }
}
