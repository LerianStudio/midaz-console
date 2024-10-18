import { OrganizationEntity } from '@/core/domain/entities/organization-entity'
import { CreateOrganizationDto } from '../dto/create-organization-dto'
import { OrganizationResponseDto } from '../dto/organization-response-dto'
import { UpdateOrganizationDto } from '../dto/update-organization-dto'

export function organizationDtoToEntity(
  dto: CreateOrganizationDto
): OrganizationEntity {
  return {
    legalName: dto.legalName,
    parentOrganizationId: dto.parentOrganizationId,
    doingBusinessAs: dto.doingBusinessAs,
    legalDocument: dto.legalDocument,
    address: dto.address,
    metadata: dto.metadata,
    status: dto.status
  }
}

export function organizationEntityToDto(
  entity: OrganizationEntity
): OrganizationResponseDto {
  return {
    id: entity.id!,
    legalName: entity.legalName,
    parentOrganizationId: entity.parentOrganizationId,
    doingBusinessAs: entity.doingBusinessAs,
    legalDocument: entity.legalDocument,
    address: entity.address,
    metadata: entity.metadata,
    status: entity.status,
    createdAt: entity.createdAt!,
    updatedAt: entity.updatedAt!,
    deletedAt: entity.deletedAt
  }
}

export function organizationUpdateDtoToEntity(
  dto: Partial<UpdateOrganizationDto>
): Partial<OrganizationEntity> {
  return {
    ...dto
  }
}
