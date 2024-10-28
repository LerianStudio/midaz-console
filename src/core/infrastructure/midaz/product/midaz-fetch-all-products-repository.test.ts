import { MidazFetchAllProductsRepository } from './midaz-fetch-all-products-repository'
import { ProductEntity } from '@/core/domain/entities/product-entity'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

jest.mock('../../utils/http-fetch-utils', () => ({
  httpMidazAuthFetch: jest.fn(),
  HTTP_METHODS: {
    GET: 'GET'
  }
}))

describe('MidazFetchAllProductsRepository', () => {
  let repository: MidazFetchAllProductsRepository

  beforeEach(() => {
    repository = new MidazFetchAllProductsRepository()
    jest.clearAllMocks()
  })

  it('should fetch all products successfully', async () => {
    const organizationId = '1'
    const ledgerId = '1'
    const limit = 10
    const page = 1
    const response: PaginationEntity<ProductEntity> = {
      items: [
        {
          id: '1',
          name: 'Test Product',
          status: { code: 'ACTIVE', description: '' },
          metadata: {}
        },
        {
          id: '2',
          name: 'Test Product 2',
          status: { code: 'ACTIVE', description: '' },
          metadata: {}
        }
      ],
      limit,
      page
    }

    ;(httpMidazAuthFetch as jest.Mock).mockResolvedValueOnce(response)

    const result = await repository.fetchAll(
      organizationId,
      ledgerId,
      limit,
      page
    )

    expect(httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}/products?limit=${limit}&page=${page}`,
      method: HTTP_METHODS.GET
    })
    expect(result).toEqual(response)
  })

  it('should handle errors when fetching all products', async () => {
    const organizationId = '1'
    const ledgerId = '1'
    const limit = 10
    const page = 1
    const error = new Error('Error occurred')

    ;(httpMidazAuthFetch as jest.Mock).mockRejectedValueOnce(error)

    await expect(
      repository.fetchAll(organizationId, ledgerId, limit, page)
    ).rejects.toThrow('Error occurred')

    expect(httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}/products?limit=${limit}&page=${page}`,
      method: HTTP_METHODS.GET
    })
  })
})
