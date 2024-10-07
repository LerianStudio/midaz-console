import { DeleteProductRepository } from '@/core/domain/repositories/products/delete-product-repository'

export interface DeleteProduct {
  execute: (
    organizationId: string,
    ledgerId: string,
    productId: string
  ) => Promise<void>
}

export class DeleteProductUseCase implements DeleteProduct {
  constructor(
    private readonly deleteProductRepository: DeleteProductRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    productId: string
  ): Promise<void> {
    await this.deleteProductRepository.delete(
      organizationId,
      ledgerId,
      productId
    )
  }
}
