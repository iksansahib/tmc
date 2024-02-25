import { ProductsService } from './products.service';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ProductSaveDto } from './products.dto';

@Injectable()
export class ProductsSkuValidation implements PipeTransform {
  constructor(private productsService: ProductsService) {}
  async transform(value: ProductSaveDto) {
    const sku = await this.productsService.checkSkuExists(value.sku);
    if (sku) {
      throw new BadRequestException('sku must be unique');
    }
    return value;
  }
}
