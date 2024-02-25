import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products_query')
export class ProductsQueryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  categoryId: string;

  @Column()
  categoryName: string;
}
