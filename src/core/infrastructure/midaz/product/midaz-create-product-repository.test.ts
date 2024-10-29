import { MidazCreateProductRepository } from './midaz-create-product-repository'
import { ProductEntity } from '@/core/domain/entities/product-entity'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

jest.mock('../../utils/http-fetch-utils', () => ({
  httpMidazAuthFetch: jest.fn(),
  HTTP_METHODS: {
    POST: 'POST'
  }
}))

describe('MidazCreateProductRepository', () => {
  let repository: MidazCreateProductRepository

  beforeEach(() => {
    repository = new MidazCreateProductRepository()
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

    ;(httpMidazAuthFetch as jest.Mock).mockResolvedValueOnce(response)

    const result = await repository.create(organizationId, ledgerId, product)

    expect(httpMidazAuthFetch).toHaveBeenCalledWith({
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

    ;(httpMidazAuthFetch as jest.Mock).mockRejectedValueOnce(error)

    await expect(
      repository.create(organizationId, ledgerId, product)
    ).rejects.toThrow('Error occurred')

    expect(httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}/products`,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(product)
    })
  })
})
