import { CreateProductRepository } from './create-product-repository'
import { ProductEntity } from '../../entities/product-entity'

class MockCreateProductRepository implements CreateProductRepository {
  async create(
    organizationId: string,
    ledgerId: string,
    product: ProductEntity
  ): Promise<ProductEntity> {
    return product
  }
}

describe('CreateProductRepository', () => {
  let repository: CreateProductRepository
  let mockProduct: ProductEntity

  beforeEach(() => {
    repository = new MockCreateProductRepository()
    mockProduct = {
      id: '1',
      name: 'Test Product',
      organizationId: 'org123',
      ledgerId: 'ledger123',
      metadata: {
        key: 'value'
      },
      status: {
        code: 'active',
        description: 'Active'
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }
  })

  it('should create a product successfully', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'

    const spyCreate = jest.spyOn(repository, 'create')

    const result = await repository.create(
      organizationId,
      ledgerId,
      mockProduct
    )

    expect(result).toEqual(mockProduct)
    expect(spyCreate).toHaveBeenCalledWith(
      organizationId,
      ledgerId,
      mockProduct
    )
  })

  it('should throw an error if product creation fails', async () => {
    const failingRepository: CreateProductRepository = {
      create: jest.fn().mockRejectedValue(new Error('Creation failed'))
    }

    await expect(
      failingRepository.create('org123', 'ledger123', mockProduct)
    ).rejects.toThrow('Creation failed')
  })
})
