import { UpdateAssetRepository } from '@/core/domain/repositories/assets/update-asset-repository'
import { AssetResponseDto } from '../../dto/asset-response-dto'
import { UpdateAssetDto } from '../../dto/update-asset-dto'
import { AssetEntity } from '@/core/domain/entities/asset-entity'
import {
  assetEntityToDto,
  assetUpdateDtoToEntity
} from '../../mappers/asset-mapper'

export interface UpdateAsset {
  execute: (
    organizationId: string,
    ledgerId: string,
    assetId: string,
    asset: Partial<UpdateAssetDto>
  ) => Promise<AssetResponseDto>
}

export class UpdateAssetUseCase implements UpdateAsset {
  constructor(private readonly updateAssetRepository: UpdateAssetRepository) {}
  async execute(
    organizationId: string,
    ledgerId: string,
    assetId: string,
    asset: Partial<UpdateAssetDto>
  ): Promise<AssetResponseDto> {
    const updateAssetEntity: Partial<AssetEntity> =
      assetUpdateDtoToEntity(asset)

    const updatedAssetEntity = await this.updateAssetRepository.update(
      organizationId,
      ledgerId,
      assetId,
      updateAssetEntity
    )

    const assetResponseDto: AssetResponseDto =
      assetEntityToDto(updatedAssetEntity)

    return assetResponseDto
  }
}
