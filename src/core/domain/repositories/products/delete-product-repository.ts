export interface DeleteProductRepository {
  delete: (
    organizationId: string,
    ledgerId: string,
    productId: string
  ) => Promise<void>
}
