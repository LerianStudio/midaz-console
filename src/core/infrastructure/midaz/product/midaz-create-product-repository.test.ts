import { MidazCreateProductRepository } from './midaz-create-product-repository'
import { ProductEntity } from '@/core/domain/entities/product-entity'
import { HTTP_METHODS } from '../../utils/http-fetch-utils'

jest.mock('../../utils/http-fetch-utils', () => ({
  httpMidazAuthFetch: jest.fn(),
  HTTP_METHODS: {
    POST: 'POST'
  }
}))

describe('MidazCreateProductRepository', () => {
  let repository: MidazCreateProductRepository
  let mockHttpFetchUtils: { httpMidazAuthFetch: jest.Mock }

  beforeEach(() => {
    mockHttpFetchUtils = { httpMidazAuthFetch: jest.fn() }
    repository = new MidazCreateProductRepository(mockHttpFetchUtils as any)
    jest.clearAllMocks()
  })

  it('should create a product successfully', async () => {
    const organizationId = '1'
    const ledgerId = '1'
    const product: ProductEntity = {
      id: '1',
      name: 'Test Product',
      status: { code: 'ACTIVE', description: '' },
      metadata: {}
    }
    const response: ProductEntity = { ...product }

    mockHttpFetchUtils.httpMidazAuthFetch.mockResolvedValueOnce(response)

    const result = await repository.create(organizationId, ledgerId, product)

    expect(mockHttpFetchUtils.httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}/products`,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(product)
    })
    expect(result).toEqual(response)
  })

  it('should handle errors when creating a product', async () => {
    const organizationId = '1'
    const ledgerId = '1'
    const product: ProductEntity = {
      id: '1',
      name: 'Test Product',
      status: { code: 'ACTIVE', description: '' },
      metadata: {}
    }
    const error = new Error('Error occurred')

    mockHttpFetchUtils.httpMidazAuthFetch.mockRejectedValueOnce(error)

    await expect(
      repository.create(organizationId, ledgerId, product)
    ).rejects.toThrow('Error occurred')

    expect(mockHttpFetchUtils.httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}/products`,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(product)
    })
  })
})
