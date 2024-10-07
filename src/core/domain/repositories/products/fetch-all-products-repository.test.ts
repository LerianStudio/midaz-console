import { FetchAllProductsRepository } from './fetch-all-products-repository'
import { PaginationEntity } from '../../entities/pagination-entity'
import { ProductEntity } from '../../entities/product-entity'

describe('FetchAllProductsRepository', () => {
  let fetchAllProductsRepository: FetchAllProductsRepository

  beforeEach(() => {
    fetchAllProductsRepository = {
      fetchAll: jest.fn()
    }
  })

  it('should fetch all products with given organizationId and ledgerId', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'
    const limit = 10
    const page = 1
    const expectedProducts: PaginationEntity<ProductEntity> = {
      items: [
        {
          id: '1',
          name: 'Test Product',
          organizationId: 'org123',
          ledgerId: 'ledger123',
          metadata: { key: 'value' },
          status: { code: 'active', description: 'Active' },
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        },
        {
          id: '2',
          name: 'Test Product 2',
          organizationId: 'org123',
          ledgerId: 'ledger123',
          metadata: { key: 'value' },
          status: { code: 'active', description: 'Active' },
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        }
      ],
      page: 1,
      limit: 10
    }
    ;(fetchAllProductsRepository.fetchAll as jest.Mock).mockResolvedValue(
      expectedProducts
    )

    const result = await fetchAllProductsRepository.fetchAll(
      organizationId,
      ledgerId,
      limit,
      page
    )

    expect(fetchAllProductsRepository.fetchAll).toHaveBeenCalledWith(
      organizationId,
      ledgerId,
      limit,
      page
    )
    expect(result).toEqual(expectedProducts)
  })

  it('should handle errors when fetching products', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'
    const limit = 10
    const page = 1
    const error = new Error('Failed to fetch products')

    ;(fetchAllProductsRepository.fetchAll as jest.Mock).mockRejectedValue(error)

    await expect(
      fetchAllProductsRepository.fetchAll(organizationId, ledgerId, limit, page)
    ).rejects.toThrow('Failed to fetch products')
  })
})
