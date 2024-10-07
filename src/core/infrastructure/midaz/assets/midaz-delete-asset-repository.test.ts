import { MidazDeleteAssetRepository } from './midaz-delete-asset-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

jest.mock('../../utils/midaz-error-handler')

describe('MidazDeleteAssetRepository', () => {
  let repository: MidazDeleteAssetRepository
  const baseUrl = 'http://example.com'
  const organizationId = 'org123'
  const ledgerId = 'ledger123'
  const assetId = 'asset123'

  beforeAll(() => {
    process.env.MIDAZ_BASE_PATH = baseUrl
    repository = new MidazDeleteAssetRepository()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call fetch with the correct URL and options', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({})
    })

    await repository.delete(organizationId, ledgerId, assetId)

    expect(global.fetch).toHaveBeenCalledWith(
      `${baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/assets/${assetId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  })

  it('should handle a successful delete request', async () => {
    const mockResponse = undefined
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    })

    const result = await repository.delete(organizationId, ledgerId, assetId)

    expect(result).toEqual(mockResponse)
  })

  it('should handle an unsuccessful delete request', async () => {
    const mockErrorResponse = { message: 'Error' }
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockErrorResponse)
    })
    ;(handleMidazError as jest.Mock).mockResolvedValue(
      new Error('Handled Error')
    )

    await expect(
      repository.delete(organizationId, ledgerId, assetId)
    ).rejects.toThrow('Handled Error')
    expect(handleMidazError).toHaveBeenCalledWith(mockErrorResponse)
  })
})
