import { AssetEntity } from '@/core/domain/entities/asset-entity'
import { AssetResponseDto } from '../../dto/asset-response-dto'
import { CreateAssetRepository } from '@/core/domain/repositories/assets/create-asset-repository'
import { assetDtoToEntity, assetEntityToDto } from '../../mappers/asset-mapper'
import { CreateAssetDto } from '../../dto/create-asset-dto'

export interface CreateAsset {
  execute: (
    organizationId: string,
    ledgerId: string,
    asset: CreateAssetDto
  ) => Promise<AssetResponseDto>
}

export class CreateAssetUseCase implements CreateAsset {
  constructor(private readonly createAssetRepository: CreateAssetRepository) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    asset: CreateAssetDto
  ): Promise<AssetResponseDto> {
    const assetEntity: AssetEntity = assetDtoToEntity(asset)

    const assetCreated = await this.createAssetRepository.create(
      organizationId,
      ledgerId,
      assetEntity
    )

    const assetResponseDto = assetEntityToDto(assetCreated)

    return assetResponseDto
  }
}
