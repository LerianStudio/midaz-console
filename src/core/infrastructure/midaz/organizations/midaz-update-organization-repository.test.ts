import { MidazUpdateOrganizationRepository } from './midaz-update-organization-repository'
import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { handleMidazError } from '../../utils/midaz-error-handler'

jest.mock('../../utils/midaz-error-handler')

describe('MidazUpdateOrganizationRepository', () => {
  let repository: MidazUpdateOrganizationRepository
  const mockBaseUrl = 'http://mock-base-url/organizations'
  const mockOrganizationId = '123'
  const mockOrganization: Partial<OrganizationEntity> = {
    legalName: 'Test Org',
    status: { code: 'active', description: 'Active' },
    address: {
      line1: 'line1',
      neighborhood: 'neighborhood',
      zipCode: 'zipCode',
      city: 'city',
      state: 'state',
      country: 'country'
    },
    legalDocument: '123456789'
  }

  const mockResponse: OrganizationEntity = {
    id: mockOrganizationId,
    legalName: 'Test Org',
    status: { code: 'active', description: 'Active' },
    address: {
      line1: 'line1',
      neighborhood: 'neighborhood',
      zipCode: 'zipCode',
      city: 'city',
      state: 'state',
      country: 'country'
    },
    legalDocument: '123456789'
  }

  beforeAll(() => {
    process.env.MIDAZ_BASE_PATH = 'http://mock-base-url'
    repository = new MidazUpdateOrganizationRepository()
  })

  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should update organization successfully', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    })

    const result = await repository.updateOrganization(
      mockOrganizationId,
      mockOrganization
    )

    expect(result).toEqual(mockResponse)
    expect(global.fetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/${mockOrganizationId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockOrganization)
      }
    )
  })

  it('should throw an error if the response is not ok', async () => {
    const mockErrorResponse = { message: 'Error' }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce(mockErrorResponse)
    })
    ;(handleMidazError as jest.Mock).mockResolvedValueOnce(
      new Error('Handled Error')
    )

    await expect(
      repository.updateOrganization(mockOrganizationId, mockOrganization)
    ).rejects.toThrow('Handled Error')

    expect(global.fetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/${mockOrganizationId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockOrganization)
      }
    )
    expect(handleMidazError).toHaveBeenCalledWith(mockErrorResponse)
  })
})
