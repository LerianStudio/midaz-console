import { DeleteProductRepository } from './delete-product-repository'

describe('DeleteProductRepository', () => {
  let deleteProductRepository: DeleteProductRepository

  beforeEach(() => {
    deleteProductRepository = {
      delete: jest.fn()
    }
  })

  it('should call delete with correct parameters', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'
    const productId = 'product123'

    await deleteProductRepository.delete(organizationId, ledgerId, productId)

    expect(deleteProductRepository.delete).toHaveBeenCalledWith(
      organizationId,
      ledgerId,
      productId
    )
  })

  it('should return a promise that resolves to void', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'
    const productId = 'product123'

    ;(deleteProductRepository.delete as jest.Mock).mockResolvedValueOnce(
      undefined
    )

    await expect(
      deleteProductRepository.delete(organizationId, ledgerId, productId)
    ).resolves.toBeUndefined()
  })
})
