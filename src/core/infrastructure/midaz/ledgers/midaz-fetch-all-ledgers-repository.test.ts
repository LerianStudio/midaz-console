import { handleMidazError } from '../../utils/midaz-error-handler'
import { MidazFetchAllLedgersRepository } from './midaz-fetch-all-ledgers-repository'

jest.mock('../../utils/midaz-error-handler')

describe('MidazFetchAllLedgersRepository', () => {
  const baseUrl = 'http://example.com'
  let repository: MidazFetchAllLedgersRepository

  beforeAll(() => {
    process.env.MIDAZ_BASE_PATH = baseUrl
    repository = new MidazFetchAllLedgersRepository()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch all ledgers successfully', async () => {
    const organizationId = 'org123'
    const limit = 10
    const page = 1
    const mockResponse = {
      data: [
        {
          id: 'ledger123',
          organizationId: 'org123',
          name: 'Test Ledger',
          metadata: {},
          status: { code: 'active', description: 'Active' }
        },
        {
          id: 'ledger456',
          organizationId: 'org123',
          name: 'Test Ledger 2',
          metadata: {},
          status: { code: 'active', description: 'Active' }
        }
      ],
      limit,
      page
    }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    })

    const result = await repository.fetchAll(organizationId, limit, page)

    expect(global.fetch).toHaveBeenCalledWith(
      `${baseUrl}/organizations/${organizationId}/ledgers?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    expect(result).toEqual(mockResponse)
  })

  it('should handle errors when fetching ledgers', async () => {
    const organizationId = 'org123'
    const limit = 10
    const page = 1
    const mockErrorResponse = { message: 'Error occurred' }
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockErrorResponse)
    })
    const mockHandleMidazError = handleMidazError as jest.Mock
    mockHandleMidazError.mockRejectedValue(new Error('Handled error'))

    await expect(
      repository.fetchAll(organizationId, limit, page)
    ).rejects.toThrow('Handled error')

    expect(global.fetch).toHaveBeenCalledWith(
      `${baseUrl}/organizations/${organizationId}/ledgers?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    expect(mockHandleMidazError).toHaveBeenCalledWith(mockErrorResponse)
  })
})
