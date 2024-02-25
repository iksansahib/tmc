import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDbs1708770026719 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE TABLE products_query (
      id varchar(36) NOT NULL,
      sku varchar(255) NOT NULL,
      name varchar(255) NOT NULL,
      price int NOT NULL,
      stock int NOT NULL,
      categoryId varchar(255) NOT NULL,
      categoryName varchar(255) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP TABLE products_query;');
  }
}
