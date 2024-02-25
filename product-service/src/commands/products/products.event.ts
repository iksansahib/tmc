export class SavedProductEvent {
  constructor(
    public readonly id: string,
    public readonly sku: string,
    public readonly name: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly categoryId: string,
    public readonly categoryName: string,
  ) {}
}
