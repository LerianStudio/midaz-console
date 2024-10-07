import { FetchAllAssetsRepository } from '@/core/domain/repositories/assets/fetch-all-assets-repository'
import { AssetResponseDto } from '../../dto/asset-response-dto'
import { PaginationDto } from '../../dto/pagination-dto'
import { AssetEntity } from '@/core/domain/entities/asset-entity'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { assetEntityToDto } from '../../mappers/asset-mapper'

export interface FetchAllAssets {
  execute: (
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number,
    type?: string,
    code?: string,
    metadata?: Record<string, string>
  ) => Promise<PaginationDto<AssetResponseDto>>
}

export class FetchAllAssetsUseCase implements FetchAllAssets {
  constructor(
    private readonly fetchAllAssetsRepository: FetchAllAssetsRepository
  ) {}

  async execute(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number,
    type?: string,
    code?: string,
    metadata?: Record<string, string>
  ): Promise<PaginationDto<AssetResponseDto>> {
    const assetsResult: PaginationEntity<AssetEntity> =
      await this.fetchAllAssetsRepository.fetchAll(
        organizationId,
        ledgerId,
        limit,
        page,
        type,
        code,
        metadata
      )

    const { items } = assetsResult

    const assetDto = items && items !== null ? items.map(assetEntityToDto) : []

    const assetsResponse: PaginationDto<AssetResponseDto> = {
      items: assetDto,
      limit: assetsResult.limit,
      page: assetsResult.page
    }

    return assetsResponse
  }
}
