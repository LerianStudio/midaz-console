import { FetchAssetByIdRepository } from '@/core/domain/repositories/assets/fetch-asset-by-id-repository'
import { AssetResponseDto } from '../../dto/asset-response-dto'
import { assetEntityToDto } from '../../mappers/asset-mapper'
import { inject, injectable } from 'inversify'

export interface FetchAssetById {
  execute: (
    organizationId: string,
    ledgerId: string,
    assetId: string
  ) => Promise<AssetResponseDto>
}

@injectable()
export class FetchAssetByIdUseCase implements FetchAssetById {
  constructor(
    @inject(FetchAssetByIdRepository)
    private readonly fetchAssetByIdRepository: FetchAssetByIdRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    assetId: string
  ): Promise<AssetResponseDto> {
    const assetEntity = await this.fetchAssetByIdRepository.fetchById(
      organizationId,
      ledgerId,
      assetId
    )

    const assetDto: AssetResponseDto = assetEntityToDto(assetEntity)

    return assetDto
  }
}
