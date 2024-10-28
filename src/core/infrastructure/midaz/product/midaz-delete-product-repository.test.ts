import { MidazDeleteProductRepository } from './midaz-delete-product-repository'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

jest.mock('../../utils/http-fetch-utils', () => ({
  httpMidazAuthFetch: jest.fn(),
  HTTP_METHODS: {
    DELETE: 'DELETE'
  }
}))

describe('MidazDeleteProductRepository', () => {
  let repository: MidazDeleteProductRepository

  beforeEach(() => {
    repository = new MidazDeleteProductRepository()
    jest.clearAllMocks()
  })

  it('should delete a product successfully', async () => {
    const organizationId = '1'
    const ledgerId = '1'
    const productId = '1'

    ;(httpMidazAuthFetch as jest.Mock).mockResolvedValueOnce(undefined)

    await repository.delete(organizationId, ledgerId, productId)

    expect(httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`,
      method: HTTP_METHODS.DELETE
    })
  })

  it('should handle errors when deleting a product', async () => {
    const organizationId = '1'
    const ledgerId = '1'
    const productId = '1'
    const error = new Error('Error occurred')

    ;(httpMidazAuthFetch as jest.Mock).mockRejectedValueOnce(error)

    await expect(
      repository.delete(organizationId, ledgerId, productId)
    ).rejects.toThrow('Error occurred')

    expect(httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}/products/${productId}`,
      method: HTTP_METHODS.DELETE
    })
  })
})
