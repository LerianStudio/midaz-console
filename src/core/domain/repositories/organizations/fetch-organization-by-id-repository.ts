import { OrganizationEntity } from '../../entities/organization-entity'

export interface FetchOrganizationByIdRepository {
  fetchById: (id: string) => Promise<OrganizationEntity>
}
