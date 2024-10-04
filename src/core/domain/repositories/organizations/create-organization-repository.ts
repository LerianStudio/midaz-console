import { OrganizationEntity } from '../../entities/organization-entity'

export interface CreateOrganizationRepository {
  create: (organization: OrganizationEntity) => Promise<OrganizationEntity>
}
