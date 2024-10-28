import { MidazDeleteAssetRepository } from './midaz-delete-asset-repository'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

jest.mock('../../utils/http-fetch-utils', () => ({
  httpMidazAuthFetch: jest.fn(),
  HTTP_METHODS: {
    DELETE: 'DELETE'
  }
}))

describe('MidazDeleteAssetRepository', () => {
  let repository: MidazDeleteAssetRepository

  beforeEach(() => {
    repository = new MidazDeleteAssetRepository()
    jest.clearAllMocks()
  })

  it('should delete an asset successfully', async () => {
    const organizationId = '1'
    const ledgerId = '1'
    const assetId = '1'

    ;(httpMidazAuthFetch as jest.Mock).mockResolvedValueOnce(undefined)

    await repository.delete(organizationId, ledgerId, assetId)

    expect(httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}/assets/${assetId}`,
      method: HTTP_METHODS.DELETE
    })
  })

  it('should handle errors when deleting an asset', async () => {
    const organizationId = '1'
    const ledgerId = '1'
    const assetId = '1'
    const error = new Error('Error occurred')

    ;(httpMidazAuthFetch as jest.Mock).mockRejectedValueOnce(error)

    await expect(
      repository.delete(organizationId, ledgerId, assetId)
    ).rejects.toThrow('Error occurred')

    expect(httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}/assets/${assetId}`,
      method: HTTP_METHODS.DELETE
    })
  })
})
