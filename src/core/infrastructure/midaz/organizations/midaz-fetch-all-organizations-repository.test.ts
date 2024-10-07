import { MidazFetchAllOrganizationsRepository } from './midaz-fetch-all-organizations-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { OrganizationEntity } from '@/core/domain/entities/organization-entity'

jest.mock('../../utils/midaz-error-handler')

describe('MidazFetchAllOrganizationsRepository', () => {
  let repository: MidazFetchAllOrganizationsRepository
  const baseUrl = 'http://example.com/organizations'
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv, MIDAZ_BASE_PATH: 'http://example.com' }
    repository = new MidazFetchAllOrganizationsRepository()
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should fetch all organizations successfully', async () => {
    const limit = 10
    const page = 1
    const mockResponse = {
      data: [
        {
          id: '1',
          legalName: 'Org 1',
          legalDocument: '123456789',
          address: {
            line1: 'Test Address',
            neighborhood: 'Test Neighborhood',
            zipCode: '123456',
            city: 'Test City',
            state: 'Test State',
            country: 'Test Country'
          },
          status: { code: 'active', description: 'Active' }
        },
        {
          id: '2',
          legalName: 'Org 2',
          legalDocument: '987654321',
          address: {
            line1: 'Test Address',
            neighborhood: 'Test Neighborhood',
            zipCode: '123456',
            city: 'Test City',
            state: 'Test State',
            country: 'Test Country'
          },
          status: { code: 'active', description: 'Active' }
        }
      ],
      limit: 10,
      page: 1
    }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    })

    const result = await repository.fetchAll(limit, page)

    expect(global.fetch).toHaveBeenCalledWith(
      `${baseUrl}?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    expect(result).toEqual(mockResponse)
  })

  it('should return empty result when there are no organizations', async () => {
    const limit = 10
    const page = 1
    const resultExpectation: OrganizationEntity[] = []
    const mockResponse: PaginationEntity<OrganizationEntity> = {
      items: resultExpectation,
      limit,
      page
    }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    })

    const result = await repository.fetchAll(limit, page)

    expect(global.fetch).toHaveBeenCalledWith(
      `${baseUrl}?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    expect(result).toEqual(mockResponse)
  })

  it('should handle errors correctly', async () => {
    const mockErrorResponse = { message: 'Error occurred' }
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockErrorResponse)
    })
    const handleMidazErrorMock = handleMidazError as jest.Mock
    handleMidazErrorMock.mockRejectedValue(new Error('Handled error'))

    await expect(repository.fetchAll(10, 1)).rejects.toThrow('Handled error')
    expect(handleMidazErrorMock).toHaveBeenCalledWith(mockErrorResponse)
  })
})
