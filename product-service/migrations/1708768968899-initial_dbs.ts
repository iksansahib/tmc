import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDbs1708768968899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`CREATE TABLE categories (
        id varchar(36) NOT NULL,
        name varchar(255) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`);
    queryRunner.query(`
    CREATE TABLE products (
        id varchar(36) NOT NULL,
        sku varchar(255) NOT NULL,
        name varchar(255) NOT NULL,
        price int NOT NULL,
        stock int NOT NULL,
        categoryId varchar(255) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY IDX_c44ac33a05b144dd0d9ddcf932 (sku),
        KEY FK_ff56834e735fa78a15d0cf21926 (categoryId),
        CONSTRAINT FK_ff56834e735fa78a15d0cf21926 FOREIGN KEY (categoryId) REFERENCES categories (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    DROP TABLE categories;`);
    queryRunner.query(`
    DROP TABLE products;`);
  }
}
