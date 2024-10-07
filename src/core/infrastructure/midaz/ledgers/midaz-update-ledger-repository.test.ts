import { MidazUpdateLedgerRepository } from './midaz-update-ledger-repository'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { handleMidazError } from '../../utils/midaz-error-handler'

jest.mock('../../utils/midaz-error-handler')

describe('MidazUpdateLedgerRepository', () => {
  const baseUrl = 'http://example.com'
  let repository: MidazUpdateLedgerRepository

  beforeAll(() => {
    process.env.MIDAZ_BASE_PATH = baseUrl
    repository = new MidazUpdateLedgerRepository()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should update ledger successfully', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'
    const ledger: Partial<LedgerEntity> = { name: 'Updated Ledger' }
    const mockResponse = {
      id: ledgerId,
      name: 'Updated Ledger',
      status: { code: 'active', description: 'Active' },
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    })

    const result = await repository.update(organizationId, ledgerId, ledger)

    expect(global.fetch).toHaveBeenCalledWith(
      `${baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ledger)
      }
    )
    expect(result).toEqual(mockResponse)
  })

  it('should handle error response', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'
    const ledger: Partial<LedgerEntity> = { name: 'Updated Ledger' }
    const mockErrorResponse = { message: 'Error occurred' }

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockErrorResponse)
    })
    ;(handleMidazError as jest.Mock).mockResolvedValue(
      new Error('Handled Error')
    )

    await expect(
      repository.update(organizationId, ledgerId, ledger)
    ).rejects.toThrow('Handled Error')

    expect(global.fetch).toHaveBeenCalledWith(
      `${baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ledger)
      }
    )
    expect(handleMidazError).toHaveBeenCalledWith(mockErrorResponse)
  })
})
