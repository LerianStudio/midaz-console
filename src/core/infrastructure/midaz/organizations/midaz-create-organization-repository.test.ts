import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { MidazCreateOrganizationRepository } from './midaz-create-organization-repository'
import { MidazError } from '../../errors/midaz-error'

jest.mock('../../utils/midaz-error-handler', () => ({
  handleMidazError: jest.fn()
}))

describe('MidazCreateOrganizationRepository', () => {
  let repository: MidazCreateOrganizationRepository
  let originalFetch: typeof fetch

  beforeEach(() => {
    repository = new MidazCreateOrganizationRepository()
    originalFetch = global.fetch
  })

  afterEach(() => {
    global.fetch = originalFetch
    jest.clearAllMocks()
  })

  it('should call fetch with the correct parameters', async () => {
    const organizationData: OrganizationEntity = {
      id: '123',
      legalName: 'Org 1',
      legalDocument: '123456789',
      address: {
        line1: 'Street',
        neighborhood: 'Neighborhood',
        zipCode: '123456',
        city: 'City',
        state: 'State',
        country: 'Country'
      },
      status: {
        code: 'active',
        description: 'Active'
      }
    }

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(organizationData)
    } as any

    global.fetch = jest.fn().mockResolvedValue(mockResponse)

    await repository.create(organizationData)

    expect(global.fetch).toHaveBeenCalledWith(
      process.env.MIDAZ_BASE_PATH + '/organizations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(organizationData)
      }
    )
  })

  it('should handle error when response is not successful', async () => {
    const organizationData: OrganizationEntity = {
      id: '123',
      legalName: 'Org 1',
      legalDocument: '123456789',
      address: {
        line1: 'Street',
        neighborhood: 'Neighborhood',
        zipCode: '123456',
        city: 'City',
        state: 'State',
        country: 'Country'
      },
      status: {
        code: 'active',
        description: 'Active'
      }
    }

    const mockErrorResponse = {
      ok: false,
      json: jest
        .fn()
        .mockResolvedValue({ message: 'Error when create organization' })
    } as any

    global.fetch = jest.fn().mockResolvedValue(mockErrorResponse)
    ;(handleMidazError as jest.Mock).mockImplementation(() => {
      throw new MidazError('Midaz error')
    })
    await expect(repository.create(organizationData)).rejects.toThrow(
      'Midaz error'
    )

    expect(handleMidazError).toHaveBeenCalledWith({
      message: 'Error when create organization'
    })
  })
})
