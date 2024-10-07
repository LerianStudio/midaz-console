import { MidazFetchLedgerByIdRepository } from './midaz-fetch-ledger-by-id-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'

jest.mock('../../utils/midaz-error-handler')
global.fetch = jest.fn()

describe('MidazFetchLedgerByIdRepository', () => {
  const baseUrl = 'http://example.com'
  const organizationId = 'org123'
  const ledgerId = 'ledger123'
  const ledgerUrl = `${baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}`
  let repository: MidazFetchLedgerByIdRepository

  beforeEach(() => {
    process.env.MIDAZ_BASE_PATH = baseUrl
    repository = new MidazFetchLedgerByIdRepository()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch ledger by id successfully', async () => {
    const mockLedger: LedgerEntity = {
      id: 'ledger123',
      organizationId: 'org123',
      name: 'Test Ledger',
      metadata: {},
      status: { code: 'active', description: 'Active' }
    }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockLedger)
    })

    const result = await repository.fetchById(organizationId, ledgerId)

    expect(global.fetch).toHaveBeenCalledWith(ledgerUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    expect(result).toEqual(mockLedger)
  })

  it('should throw an error if fetch fails', async () => {
    const mockErrorResponse = { message: 'Error occurred' }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce(mockErrorResponse)
    })
    ;(handleMidazError as jest.Mock).mockRejectedValueOnce(
      new Error('Fetch error')
    )

    await expect(
      repository.fetchById(organizationId, ledgerId)
    ).rejects.toThrow('Fetch error')

    expect(global.fetch).toHaveBeenCalledWith(ledgerUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    expect(handleMidazError).toHaveBeenCalledWith(mockErrorResponse)
  })
})
