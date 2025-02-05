import { DeleteProductRepository } from '@/core/domain/repositories/products/delete-product-repository'
import { inject, injectable } from 'inversify'
import { LogOperation } from '../../decorators/log-operation'

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
  @LogOperation({ layer: 'application' })
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
