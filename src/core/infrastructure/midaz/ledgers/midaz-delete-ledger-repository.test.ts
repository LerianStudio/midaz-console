import { MidazDeleteLedgerRepository } from './midaz-delete-ledger-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

jest.mock('../../utils/midaz-error-handler')

describe('MidazDeleteLedgerRepository', () => {
  let repository: MidazDeleteLedgerRepository
  const baseUrl = 'http://example.com'
  const organizationId = 'org123'
  const ledgerId = 'ledger123'
  const ledgerUrl = `${baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}`

  beforeAll(() => {
    process.env.MIDAZ_BASE_PATH = baseUrl
    repository = new MidazDeleteLedgerRepository()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call fetch with the correct URL and method', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({})
    })

    await repository.delete(organizationId, ledgerId)

    expect(global.fetch).toHaveBeenCalledWith(ledgerUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })

  it('should handle errors correctly', async () => {
    const errorResponse = { message: 'Error' }
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(errorResponse)
    })
    ;(handleMidazError as jest.Mock).mockResolvedValue(
      new Error('Handled Error')
    )

    await expect(repository.delete(organizationId, ledgerId)).rejects.toThrow(
      'Handled Error'
    )
    expect(handleMidazError).toHaveBeenCalledWith(errorResponse)
  })

  it('should return the response if successful', async () => {
    const successResponse = { message: 'Success' }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(successResponse)
    })

    const result = await repository.delete(organizationId, ledgerId)

    expect(result).toEqual(successResponse)
  })
})
