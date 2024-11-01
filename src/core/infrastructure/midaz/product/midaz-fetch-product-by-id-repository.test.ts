import { MidazFetchProductByIdRepository } from './midaz-fetch-product-by-id-repository'
import { ProductEntity } from '@/core/domain/entities/product-entity'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

jest.mock('../../utils/http-fetch-utils', () => ({
  httpMidazAuthFetch: jest.fn(),
  HTTP_METHODS: {
    GET: 'GET'
  }
}))

describe('MidazFetchProductByIdRepository', () => {
  let repository: MidazFetchProductByIdRepository

  beforeEach(() => {
    repository = new MidazFetchProductByIdRepository()
    jest.clearAllMocks()
  })

  it('should fetch a product by id successfully', async () => {
    const organizationId = '1'
    const ledgerId = '1'
    const productId = '1'
    const response: ProductEntity = {
      id: '1',
      name: 'Test Product',
      status: { code: 'ACTIVE', description: '' },
      metadata: {}
    }

    ;(httpMidazAuthFetch as jest.Mock).mockResolvedValueOnce(response)

    const result = await repository.fetchById(
      organizationId,
      ledgerId,
      productId
    )

    expect(httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`,
      method: HTTP_METHODS.GET
    })
    expect(result).toEqual(response)
  })

  it('should handle errors when fetching a product by id', async () => {
    const organizationId = '1'
    const ledgerId = '1'
    const productId = '1'
    const error = new Error('Error occurred')

    ;(httpMidazAuthFetch as jest.Mock).mockRejectedValueOnce(error)

    await expect(
      repository.fetchById(organizationId, ledgerId, productId)
    ).rejects.toThrow('Error occurred')

    expect(httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`,
      method: HTTP_METHODS.GET
    })
  })
})
