export class SaveProductsQueryDto {
  sku: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  categoryName: string;
}

export class GetProductQuery {
  public readonly sku: string[];
  public readonly name: string[];
  public readonly 'price.end': number;
  public readonly 'price.start': number;
  public readonly 'stock.end': number;
  public readonly 'stock.start': number;
  public readonly 'category.id': string[];
  public readonly 'category.name': string[];
  public readonly size: number;
  public readonly page: number;
}
