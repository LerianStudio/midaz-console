import { FetchAllOrganizationsUseCase } from './fetch-all-organizations-use-case'
import { FetchAllOrganizationsRepository } from '@/core/domain/repositories/organizations/fetch-all-organizations-repository'
import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { organizationEntityToDto } from '../../mappers/organization-mapper'
import { OrganizationResponseDto } from '../../dto/organization-response-dto'

jest.mock('../../mappers/organization-mapper')

describe('FetchAllOrganizationsUseCase', () => {
  let fetchAllOrganizationsRepository: FetchAllOrganizationsRepository
  let fetchAllOrganizationsUseCase: FetchAllOrganizationsUseCase

  beforeEach(() => {
    fetchAllOrganizationsRepository = {
      fetchAll: jest.fn()
    }
    fetchAllOrganizationsUseCase = new FetchAllOrganizationsUseCase(
      fetchAllOrganizationsRepository
    )
  })

  it('should fetch all organizations and return them as DTOs', async () => {
    const limit = 10
    const page = 1
    const organizations: OrganizationEntity[] = [
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
    const paginationEntity: PaginationEntity<OrganizationEntity> = {
      items: organizations,
      limit,
      page
    }

    ;(fetchAllOrganizationsRepository.fetchAll as jest.Mock).mockResolvedValue(
      paginationEntity
    )
    ;(organizationEntityToDto as jest.Mock).mockImplementation(
      (org: OrganizationEntity) => {
        const ortaniztionDto: OrganizationResponseDto = {
          id: org.id!,
          legalName: org.legalName,
          legalDocument: org.legalDocument,
          doingBusinessAs: org.doingBusinessAs,
          parentOrganizationId: org.parentOrganizationId,
          address: org.address,
          metadata: org.metadata,
          status: {
            code: 'active',
            description: 'Active'
          },
          createdAt: org.createdAt!,
          updatedAt: org.updatedAt!
        }
        return ortaniztionDto
      }
    )

    const result = await fetchAllOrganizationsUseCase.execute(limit, page)

    expect(fetchAllOrganizationsRepository.fetchAll).toHaveBeenCalledWith(
      limit,
      page
    )
    expect(result.items).toEqual(organizations)
    expect(result.limit).toBe(limit)
    expect(result.page).toBe(page)
  })

  it('should return an empty array if no organizations are found', async () => {
    const limit = 10
    const page = 1
    const paginationEntity: PaginationEntity<OrganizationEntity> = {
      items: [],
      limit,
      page
    }

    ;(fetchAllOrganizationsRepository.fetchAll as jest.Mock).mockResolvedValue(
      paginationEntity
    )

    const result = await fetchAllOrganizationsUseCase.execute(limit, page)

    expect(fetchAllOrganizationsRepository.fetchAll).toHaveBeenCalledWith(
      limit,
      page
    )
    expect(result.items).toEqual([])
    expect(result.limit).toBe(limit)
    expect(result.page).toBe(page)
  })
})
