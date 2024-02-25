import { CategorySaveDto } from './categories.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApieKeyGuard } from '../../api-key.guard';

@Controller('api/categories')
@UseGuards(ApieKeyGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Post()
  async save(@Body() categorySaveDto: CategorySaveDto) {
    return await this.categoriesService.save(categorySaveDto);
  }
}
