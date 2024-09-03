import { OrganizationsType } from '@/types/organizations-type'
import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { IOrganizationRepository } from '@/core/repositories/organizations-repository'
import { ParentOrganizationsType } from '@/types/parent-organizations-type'

type IOrganizationsUseCases = {
  listOrganizationsUseCases: () => Promise<OrganizationsType[]>
  getParentOrganizationsUseCases: (
    idActualOrganization?: string
  ) => Promise<ParentOrganizationsType[]>
  getOrganizationByIdUseCases: (
    id: string
  ) => Promise<OrganizationEntity | null>
  deleteOrganizationUseCases: (id: string) => Promise<void>
  createOrganizationUseCases: (
    organization: OrganizationEntity
  ) => Promise<void>
  updateOrganizationUseCases: (
    id: string,
    organization: OrganizationsType
  ) => Promise<void>
}

class OrganizationsUseCases implements IOrganizationsUseCases {
  constructor(
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  async listOrganizationsUseCases(): Promise<OrganizationsType[]> {
    const organizations = await this.organizationRepository.list()

    return organizations.map((organization: OrganizationEntity) => {
      return this.castOrganizationToType(organization)
    })
  }

  async getOrganizationByIdUseCases(
    id: string
  ): Promise<OrganizationEntity | null> {
    const organization = await this.organizationRepository.getById(id)

    if (!organization) throw new Error('Organization not found')

    return this.castOrganizationToType(organization)
  }

  async getParentOrganizationsUseCases(
    idActualOrganization?: string
  ): Promise<ParentOrganizationsType[]> {
    const organizations = await this.organizationRepository.list()

    if (idActualOrganization) {
      return organizations
        .filter(
          (organization: OrganizationEntity) =>
            organization.id !== idActualOrganization
        )
        .map((organization: OrganizationEntity) => {
          return {
            id: organization.id as string,
            legalName: organization.legalName
          }
        })
    }

    return organizations.map((organization: OrganizationEntity) => {
      return {
        id: organization.id as string,
        legalName: organization.legalName
      }
    })
  }

  async deleteOrganizationUseCases(id: string) {
    return await this.organizationRepository.delete(id)
  }

  async createOrganizationUseCases(organization: OrganizationsType) {
    try {
      const organizationEntity = this.castOrganizationToEntity(organization)

      return await this.organizationRepository.create(organizationEntity)
    } catch (error) {
      console.error(
        'Error creating organization - organizationsUseCases',
        error
      )
      throw new Error('Error creating organization')
    }
  }

  async updateOrganizationUseCases(
    id: string,
    organization: OrganizationsType
  ) {
    const organizationEntity: OrganizationEntity =
      this.castOrganizationToEntity(organization)

    delete organizationEntity.id
    delete (organizationEntity as { legalDocument?: string }).legalDocument

    return await this.organizationRepository.update(id, organizationEntity)
  }

  private castOrganizationToEntity(organization: OrganizationsType) {
    const result = {
      legalName: organization.legalName,
      doingBusinessAs: organization.doingBusinessAs,
      parentOrganizationId: organization.parentOrganizationId as string,
      legalDocument: organization.legalDocument,
      address: organization.address,
      status: organization.status
    }

    let metadata = {}

    if (organization.organizationAccentColor)
      metadata = {
        ...metadata,
        organizationAccentColor: organization.organizationAccentColor
      }
    if (organization.organizationAvatar)
      metadata = {
        ...metadata,
        organizationAvatar: organization.organizationAvatar
      }
    if (organization.metadata)
      metadata = { ...metadata, ...organization.metadata }

    if (Object.keys(metadata).length > 0) return { ...result, metadata }

    return result
  }

  private castOrganizationToType(organization: OrganizationEntity) {
    return {
      id: organization.id,
      legalName: organization.legalName,
      doingBusinessAs: organization.doingBusinessAs,
      legalDocument: organization.legalDocument,
      parentOrganizationId: organization.parentOrganizationId,
      address: organization.address,
      metadata: Object.fromEntries(
        Object.entries(organization.metadata || {})
          .filter(([key]) => {
            return (
              key !== 'organizationAccentColor' && key !== 'organizationAvatar'
            )
          })
          .map(([key, value]) => [key, value])
      ),
      organizationAccentColor:
        Object.entries(organization.metadata || {}).find(
          ([key]) => key === 'organizationAccentColor'
        )?.[1] || '',
      organizationAvatar:
        Object.entries(organization.metadata || {}).find(
          ([key]) => key === 'organizationAvatar'
        )?.[1] || '',
      status: organization.status
    }
  }
}

export default OrganizationsUseCases
