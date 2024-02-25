import { Test } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductSaveDto } from './products.dto';
import { BullModule, getQueueToken } from '@nestjs/bull';
describe('ProductsService', () => {
  let productsService: ProductsService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: 'cqrs',
        }),
      ],
      controllers: [],
      providers: [
        {
          provide: 'PRODUCTS_REPOSITORY',
          useFactory: jest.fn(() => ({
            save: jest.fn(() => {
              return {
                categoryId: '001',
              };
            }),
          })),
        },
        {
          provide: 'CATEGORIES_REPOSITORY',
          useFactory: jest.fn(() => ({
            save: jest.fn(),
            findOneBy: jest.fn(() => {
              return {
                id: '001',
                name: 'category',
              };
            }),
          })),
        },
        ProductsService,
      ],
    })
      .overrideProvider(getQueueToken('cqrs'))
      .useValue({
        add: jest.fn(),
      })
      .compile();
    productsService = moduleRef.get<ProductsService>(ProductsService);
  });

  describe('save', () => {
    it('should save when no validation error', async () => {
      const params = new ProductSaveDto();
      await productsService.save(params);
    });
  });
});
