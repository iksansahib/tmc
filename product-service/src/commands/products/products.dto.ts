import { IsNotEmpty, IsPositive, MaxLength } from 'class-validator';

export class ProductSaveDto {
  @IsNotEmpty()
  sku: string;

  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  category: {
    id: string;
  };
}
