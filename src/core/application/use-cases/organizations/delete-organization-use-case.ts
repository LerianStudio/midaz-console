import { DeleteOrganizationRepository } from '@/core/domain/repositories/organizations/delete-organization-repository'

export interface DeleteOrganization {
  execute(organizationId: string): Promise<void>
}

export class DeleteOrganizationUseCase implements DeleteOrganization {
  constructor(
    private readonly deleteOrganizationRepository: DeleteOrganizationRepository
  ) {}

  async execute(organizationId: string): Promise<void> {
    await this.deleteOrganizationRepository.deleteOrganization(organizationId)
  }
}
