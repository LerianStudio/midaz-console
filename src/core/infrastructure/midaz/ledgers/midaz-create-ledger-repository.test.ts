import { MidazCreateLedgerRepository } from './midaz-create-ledger-repository'
import { LedgerEntity } from '@/core/domain/entities/ledger-entity'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

jest.mock('../../utils/http-fetch-utils', () => ({
  httpMidazAuthFetch: jest.fn(),
  HTTP_METHODS: {
    POST: 'POST'
  }
}))

describe('MidazCreateLedgerRepository', () => {
  let repository: MidazCreateLedgerRepository
  let mockHttpFetchUtils: { httpMidazAuthFetch: jest.Mock }

  beforeEach(() => {
    mockHttpFetchUtils = { httpMidazAuthFetch: jest.fn() }
    repository = new MidazCreateLedgerRepository(mockHttpFetchUtils as any)
    jest.clearAllMocks()
  })

  it('should create a ledger successfully', async () => {
    const organizationId = '1'
    const ledger: LedgerEntity = {
      id: 'ledger123',
      name: 'Test Ledger',
      metadata: {},
      status: { code: 'active', description: 'Active' }
    }
    const response: LedgerEntity = { ...ledger }

    mockHttpFetchUtils.httpMidazAuthFetch.mockResolvedValueOnce(response)

    const result = await repository.create(organizationId, ledger)

    expect(mockHttpFetchUtils.httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers`,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(ledger)
    })
    expect(result).toEqual(response)
  })

  it('should handle errors when creating a ledger', async () => {
    const organizationId = '1'
    const ledger: LedgerEntity = {
      id: 'ledger123',
      name: 'Test Ledger',
      metadata: {},
      status: { code: 'active', description: 'Active' }
    }
    const error = new Error('Error occurred')

    mockHttpFetchUtils.httpMidazAuthFetch.mockRejectedValueOnce(error)

    await expect(repository.create(organizationId, ledger)).rejects.toThrow(
      'Error occurred'
    )

    expect(mockHttpFetchUtils.httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers`,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(ledger)
    })
  })
})
