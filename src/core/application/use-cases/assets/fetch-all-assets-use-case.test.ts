import { FetchAllAssetsUseCase } from './fetch-all-assets-use-case'
import { FetchAllAssetsRepository } from '@/core/domain/repositories/assets/fetch-all-assets-repository'
import { AssetEntity } from '@/core/domain/entities/asset-entity'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { assetEntityToDto } from '../../mappers/asset-mapper'
import { PaginationDto } from '../../dto/pagination-dto'
import { AssetResponseDto } from '../../dto/asset-response-dto'

jest.mock('../../mappers/asset-mapper')

describe('FetchAllAssetsUseCase', () => {
  let fetchAllAssetsRepository: jest.Mocked<FetchAllAssetsRepository>
  let fetchAllAssetsUseCase: FetchAllAssetsUseCase

  beforeEach(() => {
    fetchAllAssetsRepository = {
      fetchAll: jest.fn()
    } as jest.Mocked<FetchAllAssetsRepository>
    fetchAllAssetsUseCase = new FetchAllAssetsUseCase(fetchAllAssetsRepository)
  })

  it('should fetch all assets and return a PaginationDto of AssetResponseDto', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'
    const limit = 10
    const page = 1
    const type = 'type1'
    const code = 'code1'
    const metadata = { key: 'value' }

    const assetEntity: AssetEntity[] = [
      {
        id: 'asset123',
        organizationId: 'org123',
        ledgerId: 'ledger123',
        name: 'Asset Name',
        type: 'Asset Type',
        code: 'Asset Code',
        status: { code: 'active', description: 'Active' },
        metadata: { key: 'value' },
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: 'asset456',
        organizationId: 'org123',
        ledgerId: 'ledger123',
        name: 'Asset Name',
        type: 'Asset Type',
        code: 'Asset Code',
        status: { code: 'active', description: 'Active' },
        metadata: { key: 'value' },
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    ]
    const paginationEntity: PaginationEntity<AssetEntity> = {
      items: assetEntity,
      limit,
      page
    }

    fetchAllAssetsRepository.fetchAll.mockResolvedValue(paginationEntity)
    ;(assetEntityToDto as jest.Mock).mockImplementation(
      (asset: AssetEntity) => {
        const assetResponseDto: AssetResponseDto = {
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
        return assetResponseDto
      }
    )

    const result: PaginationDto<AssetResponseDto> =
      await fetchAllAssetsUseCase.execute(
        organizationId,
        ledgerId,
        limit,
        page,
        type,
        code,
        metadata
      )

    expect(fetchAllAssetsRepository.fetchAll).toHaveBeenCalledWith(
      organizationId,
      ledgerId,
      limit,
      page,
      type,
      code,
      metadata
    )
    expect(result.items).toEqual(assetEntity)
    expect(result.limit).toBe(limit)
    expect(result.page).toBe(page)
  })

  it('should return an empty array if no assets are found', async () => {
    const organizationId = 'org123'
    const ledgerId = 'ledger123'
    const limit = 10
    const page = 1

    const paginationEntity: PaginationEntity<AssetEntity> = {
      items: [],
      limit,
      page
    }

    fetchAllAssetsRepository.fetchAll.mockResolvedValue(paginationEntity)

    const result: PaginationDto<AssetResponseDto> =
      await fetchAllAssetsUseCase.execute(organizationId, ledgerId, limit, page)

    expect(fetchAllAssetsRepository.fetchAll).toHaveBeenCalledWith(
      organizationId,
      ledgerId,
      limit,
      page,
      undefined,
      undefined,
      undefined
    )
    expect(result).toEqual({
      items: [],
      limit,
      page
    })
  })
})
