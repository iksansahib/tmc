import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoriesEntity } from '../categories/categories.entity';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  sku: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @ManyToOne(() => CategoriesEntity)
  @JoinColumn({ name: 'categoryId' })
  category: CategoriesEntity;
}
