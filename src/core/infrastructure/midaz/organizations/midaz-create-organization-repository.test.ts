import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { MidazCreateOrganizationRepository } from './midaz-create-organization-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

jest.mock('../../utils/midaz-error-handler')

describe('MidazCreateOrganizationRepository', () => {
  const baseUrl = process.env.MIDAZ_BASE_PATH + '/organizations'
  let repository: MidazCreateOrganizationRepository
  let mockHttpFetch = jest.fn()

  beforeEach(() => {
    repository = new MidazCreateOrganizationRepository()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create an organization successfully', async () => {
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
    }

    mockHttpFetch.mockResolvedValue(mockResponse)

    const result = await repository.create(organizationData)

    expect(mockHttpFetch).toHaveBeenCalledWith({
      url: baseUrl,
      method: 'POST',
      body: JSON.stringify(organizationData)
    })
    expect(result).toEqual(organizationData)
  })

  it('should throw an error if the response is not ok', async () => {
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
    const mockError = new Error('Test Error')
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({ error: 'error' })
    }

    ;(mockHttpFetch as jest.Mock)
      .mockResolvedValue(mockResponse)(handleMidazError as jest.Mock)
      .mockResolvedValue(mockError)

    await expect(repository.create(organizationData)).rejects.toThrow(mockError)

    expect(mockHttpFetch).toHaveBeenCalledWith({
      url: baseUrl,
      method: 'POST',
      body: JSON.stringify(organizationData)
    })
    expect(handleMidazError).toHaveBeenCalledWith({ error: 'error' })
  })
})
