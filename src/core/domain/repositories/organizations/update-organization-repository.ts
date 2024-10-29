import { OrganizationEntity } from '../../entities/organization-entity'

export interface UpdateOrganizationRepository {
  updateOrganization: (
    organizationId: string,
    organization: Partial<OrganizationEntity>
  ) => Promise<OrganizationEntity>
}
