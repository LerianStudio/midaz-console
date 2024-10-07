import { handleMidazError } from '../../utils/midaz-error-handler'
import { MidazFetchAllAssetsRepository } from './midaz-fetch-all-assets-repository'

jest.mock('../../utils/midaz-error-handler')

describe('MidazFetchAllAssetsRepository', () => {
  let repository: MidazFetchAllAssetsRepository
  const mockBaseUrl = 'http://mock-base-url'
  const mockFetch = jest.fn()

  beforeAll(() => {
    process.env.MIDAZ_BASE_PATH = mockBaseUrl
    global.fetch = mockFetch
  })

  beforeEach(() => {
    repository = new MidazFetchAllAssetsRepository()
    mockFetch.mockClear()
  })

  it('should fetch all assets successfully', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: 'mockData' })
    }
    mockFetch.mockResolvedValue(mockResponse)

    const result = await repository.fetchAll('orgId', 'ledgerId', 10, 1)

    expect(mockFetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/orgId/ledgers/ledgerId/assets?limit=10&page=1&type=&code=`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    expect(result).toEqual({ data: 'mockData' })
  })

  it('should handle errors correctly', async () => {
    const mockErrorResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({ error: 'mockError' })
    }
    mockFetch.mockResolvedValue(mockErrorResponse)
    ;(handleMidazError as jest.Mock).mockResolvedValue(
      new Error('Handled Error')
    )

    await expect(
      repository.fetchAll('orgId', 'ledgerId', 10, 1)
    ).rejects.toThrow('Handled Error')

    expect(mockFetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/orgId/ledgers/ledgerId/assets?limit=10&page=1&type=&code=`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    expect(handleMidazError).toHaveBeenCalledWith({ error: 'mockError' })
  })
})
