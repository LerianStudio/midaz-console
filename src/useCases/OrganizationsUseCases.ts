import { OrganizationEntity } from '@/domain/entities/OrganizationEntity'
import type { IOrganizationRepository } from '@/repositories/OrganizationsRepository'

type IOrganizationsUseCases = {
  listOrganizationsUseCases: () => Promise<OrganizationEntity[]>
  getOrganizationByIdUseCases: (
    id: string
  ) => Promise<OrganizationEntity | null>
  deleteOrganizationUseCases: (id: string) => Promise<void>
  createOrganizationUseCases: (
    organization: OrganizationEntity
  ) => Promise<void>
  updateOrganizationUseCases: (
    id: string,
    organization: OrganizationEntity
  ) => Promise<void>
}

class OrganizationsUseCases implements IOrganizationsUseCases {
  constructor(
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  async listOrganizationsUseCases(): Promise<OrganizationEntity[]> {
    return await this.organizationRepository.list()
  }

  async getOrganizationByIdUseCases(
    id: string
  ): Promise<OrganizationEntity | null> {
    return await this.organizationRepository.getById(id)
  }

  async deleteOrganizationUseCases(id: string) {
    return await this.organizationRepository.delete(id)
  }

  async createOrganizationUseCases(organization: OrganizationEntity) {
    return await this.organizationRepository.create(organization)
  }

  async updateOrganizationUseCases(
    id: string,
    organization: OrganizationEntity
  ) {
    return await this.organizationRepository.update(id, organization)
  }
}

export default OrganizationsUseCases
