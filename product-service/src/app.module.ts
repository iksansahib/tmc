import { ProductsController } from './commands/products/products.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsService } from './commands/products/products.service';
import { ProductsEntity } from './commands/products/products.entity';
import { productsProviders } from './commands/products/products.provider';
import { DatabaseModule } from './database.module';
import { CategoriesController } from './commands/categories/categories.controller';
import { CategoriesService } from './commands/categories/categories.service';
import { CategoriesEntity } from './commands/categories/categories.entity';
import { categoriesProviders } from './commands/categories/categories.provider';
import { CqrsModule } from '@nestjs/cqrs';
import { productsQueryProviders } from './queries/products-query.provider';
import { ProductsQueryEntity } from './queries/products-query.entity';
import { ProductsQueryService } from './queries/products-query.service';
import { ProductSavedHandler } from './queries/products-query.handler';
import { BullModule } from '@nestjs/bull';
import { ProductsQueryController } from './queries/products-query.controller';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './exception.filter';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    BullModule.registerQueue({
      name: 'cqrs',
      redis: {
        host: 'cache',
        port: 6379,
      },
    }),
  ],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    ProductsQueryController,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
    ProductSavedHandler,

    ProductsEntity,
    CategoriesEntity,
    ProductsQueryEntity,

    ProductsQueryService,
    ProductsService,
    CategoriesService,

    ...productsProviders,
    ...categoriesProviders,
    ...productsQueryProviders,
  ],
})
export class AppModule {}
