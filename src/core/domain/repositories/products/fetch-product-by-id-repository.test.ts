import { FetchProductByIdRepository } from './fetch-product-by-id-repository'
import { ProductEntity } from '../../entities/product-entity'

const product: ProductEntity = {
  id: '1',
  name: 'Test Product',
  organizationId: 'org123',
  ledgerId: 'ledger123',
  metadata: { key: 'value' },
  status: { code: 'active', description: 'Active' },
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null
}

class MockFetchProductByIdRepository implements FetchProductByIdRepository {
  fetchById(
    organizationId: string,
    ledgerId: string,
    productId: string
  ): Promise<ProductEntity> {
    return Promise.resolve(product)
  }
}

describe('FetchProductByIdRepository', () => {
  let repository: FetchProductByIdRepository

  beforeEach(() => {
    repository = new MockFetchProductByIdRepository()
  })

  it('should fetch product by id', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'
    const productId = '1'

    const product = await repository.fetchById(
      organizationId,
      ledgerId,
      productId
    )

    expect(product).toEqual(product)
  })

  it('should return a product with the correct id', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'
    const productId = '1'

    const product = await repository.fetchById(
      organizationId,
      ledgerId,
      productId
    )

    expect(product.id).toBe(productId)
  })
})
