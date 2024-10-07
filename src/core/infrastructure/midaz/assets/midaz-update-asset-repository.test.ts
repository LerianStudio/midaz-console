import { MidazUpdateAssetRepository } from './midaz-update-asset-repository'
import { AssetEntity } from '@/core/domain/entities/asset-entity'
import { handleMidazError } from '../../utils/midaz-error-handler'

jest.mock('../../utils/midaz-error-handler')

describe('MidazUpdateAssetRepository', () => {
  let repository: MidazUpdateAssetRepository
  const baseUrl = 'http://example.com'
  const organizationId = 'org123'
  const ledgerId = 'ledger123'
  const assetId = 'asset123'
  const asset: Partial<AssetEntity> = { name: 'Updated Asset' }

  beforeAll(() => {
    process.env.MIDAZ_BASE_PATH = baseUrl
    repository = new MidazUpdateAssetRepository()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update an asset successfully', async () => {
    const mockResponse = { id: assetId, name: 'Updated Asset' }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    })

    const result = await repository.update(
      organizationId,
      ledgerId,
      assetId,
      asset
    )

    expect(global.fetch).toHaveBeenCalledWith(
      `${baseUrl}/${organizationId}/ledgers/${ledgerId}/assets/${assetId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(asset)
      }
    )
    expect(result).toEqual(mockResponse)
  })

  it('should handle errors when the update fails', async () => {
    const mockErrorResponse = { message: 'Error occurred' }
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockErrorResponse)
    })
    const mockHandleMidazError = handleMidazError as jest.Mock
    mockHandleMidazError.mockRejectedValue(new Error('Handled Error'))

    await expect(
      repository.update(organizationId, ledgerId, assetId, asset)
    ).rejects.toThrow('Handled Error')

    expect(global.fetch).toHaveBeenCalledWith(
      `${baseUrl}/${organizationId}/ledgers/${ledgerId}/assets/${assetId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(asset)
      }
    )
    expect(mockHandleMidazError).toHaveBeenCalledWith(mockErrorResponse)
  })
})
