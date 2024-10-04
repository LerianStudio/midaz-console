import { FetchParentOrganizationsUseCase } from './fetch-parent-organizations-use-case'
import { FetchAllOrganizationsRepository } from '@/core/domain/repositories/organizations/fetch-all-organizations-repository'
import { OrganizationResponseDto } from '../../dto/organization-response-dto'
import { organizationEntityToDto } from '../../mappers/oganization-mapper'
import { OrganizationEntity } from '@/core/domain/entities/organization-entity'

describe('FetchParentOrganizationsUseCase', () => {
  let fetchAllOrganizationsRepository: FetchAllOrganizationsRepository
  let fetchParentOrganizationsUseCase: FetchParentOrganizationsUseCase

  beforeEach(() => {
    fetchAllOrganizationsRepository = {
      fetchAll: jest.fn()
    }
    fetchParentOrganizationsUseCase = new FetchParentOrganizationsUseCase(
      fetchAllOrganizationsRepository
    )
  })

  it('should return parent organizations excluding the given organizationId', async () => {
    const mockOrganizations: OrganizationEntity[] = [
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
        parentOrganizationId: '1',
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
      },
      {
        id: '3',
        parentOrganizationId: '1',
        legalName: 'Org 3',
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
      },
      {
        id: '4',
        parentOrganizationId: '2',
        legalName: 'Org 4',
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
    ]

    const expectedOrganizations: OrganizationResponseDto[] = [
      organizationEntityToDto(mockOrganizations[1]),
      organizationEntityToDto(mockOrganizations[2])
    ]

    ;(fetchAllOrganizationsRepository.fetchAll as jest.Mock).mockResolvedValue(
      mockOrganizations
    )

    const result = await fetchParentOrganizationsUseCase.execute('4')

    expect(result).toEqual(expectedOrganizations)
    expect(fetchAllOrganizationsRepository.fetchAll).toHaveBeenCalledTimes(1)
  })

  it('should return an empty array if no parent organizations are found', async () => {
    const mockOrganizations: OrganizationEntity[] = [
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
    ]

    ;(fetchAllOrganizationsRepository.fetchAll as jest.Mock).mockResolvedValue(
      mockOrganizations
    )

    const result = await fetchParentOrganizationsUseCase.execute('1')

    expect(result).toEqual([])
    expect(fetchAllOrganizationsRepository.fetchAll).toHaveBeenCalledTimes(1)
  })

  it('should return an empty array if no organizations are found', async () => {
    ;(fetchAllOrganizationsRepository.fetchAll as jest.Mock).mockResolvedValue(
      []
    )

    const result = await fetchParentOrganizationsUseCase.execute('1')

    expect(result).toEqual([])
    expect(fetchAllOrganizationsRepository.fetchAll).toHaveBeenCalledTimes(1)
  })
})
