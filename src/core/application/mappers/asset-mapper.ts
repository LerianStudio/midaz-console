import { AssetEntity } from '@/core/domain/entities/asset-entity'
import { AssetResponseDto } from '../dto/asset-response-dto'
import { CreateAssetDto } from '../dto/create-asset-dto'
import { UpdateAssetDto } from '../dto/update-asset-dto'

export function assetEntityToDto(asset: AssetEntity): AssetResponseDto {
  return {
    id: asset.id!,
    organizationId: asset.organizationId!,
    ledgerId: asset.ledgerId!,
    name: asset.name,
    type: asset.type,
    code: asset.code,
    status: asset.status,
    metadata: asset.metadata,
    createdAt: asset.createdAt!,
    updatedAt: asset.updatedAt!,
    deletedAt: asset.deletedAt!
  }
}

export function assetDtoToEntity(dto: CreateAssetDto): AssetEntity {
  return {
    name: dto.name,
    type: dto.type,
    code: dto.code,
    status: dto.status,
    metadata: dto.metadata
  }
}

export function assetUpdateDtoToEntity(
  dto: Partial<UpdateAssetDto>
): Partial<AssetEntity> {
  return {
    ...dto
  }
}
