import { UpdateProductRepository } from './update-product-repository'
import { ProductEntity } from '../../entities/product-entity'

describe('UpdateProductRepository', () => {
  let updateProductRepository: UpdateProductRepository

  beforeEach(() => {
    updateProductRepository = {
      update: jest.fn()
    }
  })

  it('should update a product successfully', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'
    const productId = 'product123'
    const product: Partial<ProductEntity> = { name: 'Updated Product' }
    const updatedProduct: ProductEntity = {
      id: productId,
      name: 'Updated Product',
      organizationId,
      ledgerId,
      metadata: {},
      status: { code: 'active', description: 'Active' },
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }

    ;(updateProductRepository.update as jest.Mock).mockResolvedValue(
      updatedProduct
    )

    const result = await updateProductRepository.update(
      organizationId,
      ledgerId,
      productId,
      product
    )

    expect(result).toEqual(updatedProduct)
    expect(updateProductRepository.update).toHaveBeenCalledWith(
      organizationId,
      ledgerId,
      productId,
      product
    )
  })

  it('should throw an error if update fails', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'
    const productId = 'product123'
    const product: Partial<ProductEntity> = { name: 'Updated Product' }
    const errorMessage = 'Update failed'

    ;(updateProductRepository.update as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    )

    await expect(
      updateProductRepository.update(
        organizationId,
        ledgerId,
        productId,
        product
      )
    ).rejects.toThrow(errorMessage)
    expect(updateProductRepository.update).toHaveBeenCalledWith(
      organizationId,
      ledgerId,
      productId,
      product
    )
  })
})
