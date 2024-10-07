import { MidazDeleteOrganizationRepository } from './midaz-delete-organization-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { MidazError } from '../../errors/midaz-error'

jest.mock('../../utils/midaz-error-handler')

describe('MidazDeleteOrganizationRepository', () => {
  let repository: MidazDeleteOrganizationRepository
  const mockFetch = jest.fn()

  beforeAll(() => {
    global.fetch = mockFetch
  })

  beforeEach(() => {
    repository = new MidazDeleteOrganizationRepository()
    jest.clearAllMocks()
  })

  it('should call fetch with the correct URL and method', async () => {
    const id = '123'
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({})
    })

    await repository.deleteOrganization(id)

    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.MIDAZ_BASE_PATH}/organizations/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  })

  it('should handle errors correctly when response is not ok', async () => {
    const id = '123'
    const errorResponse = { message: 'Error' }
    const mockErrorResponse = {
      ok: false,
      json: jest
        .fn()
        .mockResolvedValue({ message: 'Error when delete organization' })
    } as any

    global.fetch = jest.fn().mockResolvedValue(mockErrorResponse)
    ;(handleMidazError as jest.Mock).mockImplementation(() => {
      throw new MidazError('Midaz error')
    })
    await expect(repository.deleteOrganization(id)).rejects.toThrow(
      'Midaz error'
    )

    expect(handleMidazError).toHaveBeenCalledWith({
      message: 'Error when delete organization'
    })
  })
})
