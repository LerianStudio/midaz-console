import { MidazDeleteLedgerRepository } from './midaz-delete-ledger-repository'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

jest.mock('../../utils/http-fetch-utils', () => ({
  httpMidazAuthFetch: jest.fn(),
  HTTP_METHODS: {
    DELETE: 'DELETE'
  }
}))

describe('MidazDeleteLedgerRepository', () => {
  let repository: MidazDeleteLedgerRepository

  beforeEach(() => {
    repository = new MidazDeleteLedgerRepository()
    jest.clearAllMocks()
  })

  it('should delete a ledger successfully', async () => {
    const organizationId = '1'
    const ledgerId = '1'

    ;(httpMidazAuthFetch as jest.Mock).mockResolvedValueOnce(undefined)

    await repository.delete(organizationId, ledgerId)

    expect(httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}`,
      method: HTTP_METHODS.DELETE
    })
  })

  it('should handle errors when deleting a ledger', async () => {
    const organizationId = '1'
    const ledgerId = '1'
    const error = new Error('Error occurred')

    ;(httpMidazAuthFetch as jest.Mock).mockRejectedValueOnce(error)

    await expect(repository.delete(organizationId, ledgerId)).rejects.toThrow(
      'Error occurred'
    )

    expect(httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}/ledgers/${ledgerId}`,
      method: HTTP_METHODS.DELETE
    })
  })
})
