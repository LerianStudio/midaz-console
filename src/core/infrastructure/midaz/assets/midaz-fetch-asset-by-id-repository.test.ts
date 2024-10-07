import { MidazFetchAssetByIdRepository } from './midaz-fetch-asset-by-id-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { AssetEntity } from '@/core/domain/entities/asset-entity'

jest.mock('../../utils/midaz-error-handler')

describe('MidazFetchAssetByIdRepository', () => {
  const originalFetch = global.fetch
  const baseUrl = 'http://example.com'
  let repository: MidazFetchAssetByIdRepository
  process.env.MIDAZ_BASE_PATH = baseUrl

  const organizationId = 'org123'
  const ledgerId = 'ledger123'
  const assetId = 'asset123'
  const assetUrl = `${baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/assets/${assetId}`

  beforeEach(() => {
    repository = new MidazFetchAssetByIdRepository()
  })

  afterEach(() => {
    global.fetch = originalFetch
    jest.resetAllMocks()
  })

  it('should fetch asset by id successfully', async () => {
    const mockAsset: AssetEntity = {
      id: assetId,
      organizationId: organizationId,
      ledgerId: ledgerId,
      name: 'Asset Name',
      type: 'Asset Type',
      code: 'Asset Code',
      status: { code: 'active', description: 'Active' },
      metadata: { key: 'value' },
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockAsset)
    })

    const result = await repository.fetchById(organizationId, ledgerId, assetId)

    expect(global.fetch).toHaveBeenCalledWith(assetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    expect(result).toEqual(mockAsset)
  })

  it('should handle error when fetch fails', async () => {
    const mockErrorResponse = { message: 'Error occurred' }
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockErrorResponse)
    })
    ;(handleMidazError as jest.Mock).mockRejectedValue(
      new Error('Handled Error')
    )

    await expect(
      repository.fetchById(organizationId, ledgerId, assetId)
    ).rejects.toThrow('Handled Error')

    expect(global.fetch).toHaveBeenCalledWith(assetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    expect(handleMidazError).toHaveBeenCalledWith(mockErrorResponse)
  })
})
