import { OrganizationsType } from '@/types/OrganizationsType'
import { OrganizationEntity } from '@/core/domain/entities/OrganizationEntity'
import { IOrganizationRepository } from '@/core/repositories/OrganizationsRepository'

type IOrganizationsUseCases = {
  listOrganizationsUseCases: () => Promise<OrganizationsType[]>
  getOrganizationByIdUseCases: (
    id: string
  ) => Promise<OrganizationEntity | null>
  deleteOrganizationUseCases: (id: string) => Promise<void>
  createOrganizationUseCases: (
    organization: OrganizationEntity
  ) => Promise<void>
  updateOrganizationUseCases: (
    id: string,
    organization: Partial<OrganizationEntity>
  ) => Promise<void>
}

class OrganizationsUseCases implements IOrganizationsUseCases {
  constructor(
    private readonly organizationRepository: IOrganizationRepository
  ) {
  }
  
  async listOrganizationsUseCases(): Promise<OrganizationsType[]> {
    const organizations = await this.organizationRepository.list()
    
    return organizations.map((organization: OrganizationEntity) => {
      console.log('organizationEntity', organization)
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
  
  async deleteOrganizationUseCases(id: string) {
    return await this.organizationRepository.delete(id)
  }
  
  async createOrganizationUseCases(organization: OrganizationsType) {
    try {
      const organizationEntity = this.castOrganizationToEntity(organization)
      
      return await this.organizationRepository.create(organizationEntity)
    } catch (error) {
      console.error('Error creating organization - organizationsUseCases', error)
      throw new Error('Error creating organization')
    }
  }
  
  async updateOrganizationUseCases(
    id: string,
    organization: Partial<OrganizationEntity>
  ) {
    delete organization.id
    delete organization.legalDocument
    
    return await this.organizationRepository.update(id, organization)
  }
  
  private castOrganizationToEntity(organization: OrganizationsType) {
    return {
      legalName: organization.legalName,
      doingBusinessAs: organization.doingBusinessAs,
      legalDocument: organization.legalDocument,
      address: organization.address,
      metadata: {
        organizationAccentColor: organization.organizationAccentColor,
        organizationAvatar: organization.organizationAvatar,
        ...organization.metadata
      },
      status: organization.status
    }
  }
  
  private castOrganizationToType(organization: OrganizationEntity) {
    const organizationType = {
      id: organization.id,
      legalName: organization.legalName,
      doingBusinessAs: organization.doingBusinessAs,
      legalDocument: organization.legalDocument,
      address: organization.address,
      metadata: Object.fromEntries(Object.entries(organization.metadata || {}).filter(
        ([key]) => {
          return (
            key !== 'organizationAccentColor' && key !== 'organizationAvatar'
          )
        }
      ).map(([key, value]) => [key, value])),
      organizationAccentColor: Object.entries(organization.metadata || {}).find(
        ([key]) => key === 'organizationAccentColor'
      )?.[1] || '',
      organizationAvatar: Object.entries(organization.metadata || {}).find(
        ([key]) => key === 'organizationAvatar'
      )?.[1] || '',
      status: organization.status
    }
    
    console.log('organizationType', organizationType)
    return organizationType
    
  }
}

export default OrganizationsUseCases
