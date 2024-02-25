import { Test } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSaveDto } from './products.dto';
import { BullModule, getQueueToken } from '@nestjs/bull';
describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: 'cqrs',
        }),
      ],
      controllers: [ProductsController],
      providers: [
        {
          provide: 'PRODUCTS_REPOSITORY',
          useFactory: jest.fn(() => ({
            save: jest.fn(),
          })),
        },
        {
          provide: 'CATEGORIES_REPOSITORY',
          useFactory: jest.fn(() => ({
            save: jest.fn(),
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
    productsController = moduleRef.get<ProductsController>(ProductsController);
    productsService = moduleRef.get<ProductsService>(ProductsService);
  });

  describe('save', () => {
    it('should save when no validation error', async () => {
      const params = new ProductSaveDto();
      jest.spyOn(productsService, 'save').mockResolvedValueOnce();
      expect(await productsController.save(params)).toBe(undefined);
      expect(productsService.save).toHaveBeenCalled();
    });
  });
});
