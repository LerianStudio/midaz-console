import { MidazFetchOrganizationByIdRepository } from './midaz-fetch-organization-by-id-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { OrganizationEntity } from '@/core/domain/entities/organization-entity'

jest.mock('../../utils/midaz-error-handler')

describe('MidazFetchOrganizationByIdRepository', () => {
  const originalFetch = global.fetch
  const baseUrl = process.env.MIDAZ_BASE_PATH + '/organizations'
  let repository: MidazFetchOrganizationByIdRepository

  beforeEach(() => {
    repository = new MidazFetchOrganizationByIdRepository()
  })

  afterEach(() => {
    global.fetch = originalFetch
    jest.resetAllMocks()
  })

  it('should fetch organization by id successfully', async () => {
    const mockOrganization: OrganizationEntity = {
      id: '1',
      legalName: 'Test Org',
      legalDocument: '123456789',
      doingBusinessAs: 'Test Org',

      parentOrganizationId: '2',
      address: {
        line1: 'street',
        line2: 'city',
        neighborhood: 'neighborhood',
        city: 'city',
        state: 'state',
        country: 'country',
        zipCode: 'zipCode'
      },
      status: {
        code: 'active',
        description: 'active'
      },
      metadata: {
        key: 'value'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockOrganization)
    })

    const result = await repository.fetchById('1')

    expect(global.fetch).toHaveBeenCalledWith(`${baseUrl}/1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    expect(result).toEqual(mockOrganization)
  })

  it('should throw an error if fetch fails', async () => {
    const mockErrorResponse = { message: 'Not Found' }
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockErrorResponse)
    })
    ;(handleMidazError as jest.Mock).mockResolvedValue(new Error('Not Found'))

    await expect(repository.fetchById('1')).rejects.toThrow('Not Found')

    expect(global.fetch).toHaveBeenCalledWith(`${baseUrl}/1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    expect(handleMidazError).toHaveBeenCalledWith(mockErrorResponse)
  })
})
