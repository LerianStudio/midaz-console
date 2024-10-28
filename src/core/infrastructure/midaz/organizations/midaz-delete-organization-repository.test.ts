import { MidazDeleteOrganizationRepository } from './midaz-delete-organization-repository'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

jest.mock('../../utils/http-fetch-utils', () => ({
  httpMidazAuthFetch: jest.fn(),
  HTTP_METHODS: {
    DELETE: 'DELETE'
  }
}))

describe('MidazDeleteOrganizationRepository', () => {
  let repository: MidazDeleteOrganizationRepository

  beforeEach(() => {
    repository = new MidazDeleteOrganizationRepository()
    jest.clearAllMocks()
  })

  it('should delete an organization successfully', async () => {
    const organizationId = '1'

    ;(httpMidazAuthFetch as jest.Mock).mockResolvedValueOnce(undefined)

    await repository.deleteOrganization(organizationId)

    expect(httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}`,
      method: HTTP_METHODS.DELETE
    })
  })

  it('should handle errors when deleting an organization', async () => {
    const organizationId = '1'
    const error = new Error('Error occurred')

    ;(httpMidazAuthFetch as jest.Mock).mockRejectedValueOnce(error)

    await expect(repository.deleteOrganization(organizationId)).rejects.toThrow(
      'Error occurred'
    )

    expect(httpMidazAuthFetch).toHaveBeenCalledWith({
      url: `${process.env.MIDAZ_BASE_PATH}/organizations/${organizationId}`,
      method: HTTP_METHODS.DELETE
    })
  })
})
