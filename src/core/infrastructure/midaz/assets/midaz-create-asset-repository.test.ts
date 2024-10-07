import { MidazCreateAssetRepository } from './midaz-create-asset-repository'
import { AssetEntity } from '@/core/domain/entities/asset-entity'
import { handleMidazError } from '../../utils/midaz-error-handler'

jest.mock('../../utils/midaz-error-handler')

describe('MidazCreateAssetRepository', () => {
  const baseUrl = 'http://example.com'
  let repository: MidazCreateAssetRepository
  let fetchMock: jest.Mock

  beforeAll(() => {
    process.env.MIDAZ_BASE_PATH = baseUrl
  })

  beforeEach(() => {
    repository = new MidazCreateAssetRepository()
    fetchMock = jest.fn()
    global.fetch = fetchMock
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create an asset successfully', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'
    const asset: AssetEntity = {
      id: 'asset123',
      name: 'Asset Name',
      type: 'Asset Type',
      code: 'Asset Code',
      status: { code: 'active', description: 'Active' },
      metadata: { key: 'value' }
    }
    const response = { ok: true, json: jest.fn().mockResolvedValue(asset) }

    fetchMock.mockResolvedValue(response)

    const result = await repository.create(organizationId, ledgerId, asset)

    expect(fetchMock).toHaveBeenCalledWith(
      `${baseUrl}/${organizationId}/ledgers/${ledgerId}/assets`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(asset)
      }
    )
    expect(result).toEqual(asset)
  })

  it('should handle error response', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'
    const asset: AssetEntity = {
      id: 'asset123',
      name: 'Asset Name',
      type: 'Asset Type',
      code: 'Asset Code',
      status: { code: 'active', description: 'Active' },
      metadata: { key: 'value' }
    }
    const errorResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({ error: 'Error' })
    }

    fetchMock.mockResolvedValue(errorResponse)
    ;(handleMidazError as jest.Mock).mockResolvedValue(
      new Error('Handled Error')
    )

    await expect(
      repository.create(organizationId, ledgerId, asset)
    ).rejects.toThrow('Handled Error')

    expect(fetchMock).toHaveBeenCalledWith(
      `${baseUrl}/${organizationId}/ledgers/${ledgerId}/assets`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(asset)
      }
    )
    expect(handleMidazError).toHaveBeenCalledWith({ error: 'Error' })
  })
})
