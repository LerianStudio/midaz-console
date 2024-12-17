import { DeleteOrganizationRepository } from '@/core/domain/repositories/organizations/delete-organization-repository'
import { inject, injectable } from 'inversify'

export interface DeleteOrganization {
  execute(organizationId: string): Promise<void>
}

@injectable()
export class DeleteOrganizationUseCase implements DeleteOrganization {
  constructor(
    @inject(DeleteOrganizationRepository)
    private readonly deleteOrganizationRepository: DeleteOrganizationRepository
  ) {}

  async execute(organizationId: string): Promise<void> {
    await this.deleteOrganizationRepository.deleteOrganization(organizationId)
  }
}
