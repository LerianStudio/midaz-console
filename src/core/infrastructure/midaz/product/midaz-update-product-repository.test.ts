import { MidazUpdateProductRepository } from './midaz-update-product-repository'
import { ProductEntity } from '@/core/domain/entities/product-entity'
import { HTTP_METHODS } from '../../utils/http-fetch-utils'

jest.mock('../../utils/http-fetch-utils', () => ({
  httpMidazAuthFetch: jest.fn(),
  HTTP_METHODS: {
    PATCH: 'PATCH'
  }
}))

describe('MidazUpdateProductRepository', () => {
  let repository: MidazUpdateProductRepository
  let mockHttpFetchUtils: { httpMidazAuthFetch: jest.Mock }

  beforeEach(() => {
    mockHttpFetchUtils = { httpMidazAuthFetch: jest.fn() }
    repository = new MidazUpdateProductRepository(mockHttpFetchUtils as any)
    jest.clearAllMocks()
  })

  it('should update a product successfully', async () => {
    const organizationId = '1'
    const ledgerId = '1'
    const productId = '1'
    const productData: Partial<ProductEntity> = { name: 'Updated Product' }
    const response: ProductEntity = {
      id: productId,
      name: 'Updated Product',
      status: { code: 'ACTIVE', description: '' },
      metadata: {}
    }

    mockHttpFetchUtils.httpMidazAuthFetch.mockResolvedValueOnce(response)

    const result = await repository.update(
      organizationId,
      ledgerId,
      productId,
      productData
    )

    expect(mockHttpFetchUtils.httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`,
      method: HTTP_METHODS.PATCH,
      body: JSON.stringify(productData)
    })
    expect(result).toEqual(response)
  })

  it('should handle errors when updating a product', async () => {
    const organizationId = '1'
    const ledgerId = '1'
    const productId = '1'
    const productData: Partial<ProductEntity> = { name: 'Updated Product' }
    const error = new Error('Error occurred')

    mockHttpFetchUtils.httpMidazAuthFetch.mockRejectedValueOnce(error)

    await expect(
      repository.update(organizationId, ledgerId, productId, productData)
    ).rejects.toThrow('Error occurred')

    expect(mockHttpFetchUtils.httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`,
      method: HTTP_METHODS.PATCH,
      body: JSON.stringify(productData)
    })
  })
})
