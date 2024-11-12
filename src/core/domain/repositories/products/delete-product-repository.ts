export abstract class DeleteProductRepository {
  abstract delete: (
    organizationId: string,
    ledgerId: string,
    productId: string
  ) => Promise<void>
}
