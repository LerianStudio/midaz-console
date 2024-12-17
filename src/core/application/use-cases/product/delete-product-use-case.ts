import { DeleteProductRepository } from '@/core/domain/repositories/products/delete-product-repository'
import { inject, injectable } from 'inversify'

export interface DeleteProduct {
  execute: (
    organizationId: string,
    ledgerId: string,
    productId: string
  ) => Promise<void>
}

@injectable()
export class DeleteProductUseCase implements DeleteProduct {
  constructor(
    @inject(DeleteProductRepository)
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
