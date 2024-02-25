import { Test } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategorySaveDto } from './categories.dto';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: 'CATEGORIES_REPOSITORY',
          useFactory: jest.fn(() => ({
            save: jest.fn(),
          })),
        },
        CategoriesService,
      ],
    }).compile();
    categoriesService = moduleRef.get<CategoriesService>(CategoriesService);
    categoriesController =
      moduleRef.get<CategoriesController>(CategoriesController);
  });

  describe('save', () => {
    it('should successfully save new category', async () => {
      jest.spyOn(categoriesService, 'save').mockImplementation(() => null);
      const params = new CategorySaveDto();

      expect(await categoriesController.save(params)).toBe(null);
    });
  });
});
