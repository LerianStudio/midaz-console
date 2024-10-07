import { MidazCreateLedgerRepository } from './midaz-create-ledger-repository'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { handleMidazError } from '../../utils/midaz-error-handler'

jest.mock('../../utils/midaz-error-handler')

describe('MidazCreateLedgerRepository', () => {
  const baseUrl = 'http://example.com'
  let repository: MidazCreateLedgerRepository
  let originalFetch: typeof fetch

  beforeAll(() => {
    process.env.MIDAZ_BASE_PATH = baseUrl
    originalFetch = global.fetch
  })

  beforeEach(() => {
    repository = new MidazCreateLedgerRepository()
  })

  afterAll(() => {
    global.fetch = originalFetch
  })

  it('should create a ledger successfully', async () => {
    const organizationId = 'org123'
    const ledger: LedgerEntity = {
      id: 'ledger123',
      name: 'Test Ledger',
      metadata: {},
      status: { code: 'active', description: 'Active' }
    }
    const mockResponse = { ...ledger }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    })

    const result = await repository.create(organizationId, ledger)

    expect(result).toEqual(mockResponse)
    expect(global.fetch).toHaveBeenCalledWith(
      `${baseUrl}/organizations/${organizationId}/ledgers`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ledger)
      })
    )
  })

  it('should throw an error if the response is not ok', async () => {
    const organizationId = 'org123'
    const ledger: LedgerEntity = {
      id: 'ledger123',
      name: 'Test Ledger',
      metadata: {},
      status: { code: 'active', description: 'Active' }
    }
    const mockErrorResponse = { message: 'Error' }

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockErrorResponse)
    })
    ;(handleMidazError as jest.Mock).mockResolvedValue(
      new Error('Handled Error')
    )

    await expect(repository.create(organizationId, ledger)).rejects.toThrow(
      'Handled Error'
    )
    expect(handleMidazError).toHaveBeenCalledWith(mockErrorResponse)
  })
})
