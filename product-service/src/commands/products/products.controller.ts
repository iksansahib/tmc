import { ProductsService } from './products.service';
import { ProductSaveDto } from './products.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProductsSkuValidation } from './products-sku-validation.pipe';
import { ApieKeyGuard } from '../../api-key.guard';

@Controller('api/products')
@UseGuards(ApieKeyGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Post()
  async save(@Body(ProductsSkuValidation) productSaveDto: ProductSaveDto) {
    await this.productsService.save(productSaveDto);
  }
}
