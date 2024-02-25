import { Process, Processor } from '@nestjs/bull';
import { ProductsQueryService } from './products-query.service';
import { SavedProductEvent } from './../commands/products/products.event';
import { Job } from 'bull';

@Processor('cqrs')
export class ProductSavedHandler {
  constructor(private productsQueryService: ProductsQueryService) {}
  @Process()
  handle(job: Job<SavedProductEvent>) {
    this.productsQueryService.save(job.data);
  }
}
