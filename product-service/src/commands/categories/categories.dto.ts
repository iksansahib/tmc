import { IsNotEmpty, MaxLength } from 'class-validator';

export class CategorySaveDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
