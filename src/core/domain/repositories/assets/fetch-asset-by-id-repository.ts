import { AssetEntity } from '../../entities/asset-entity'

export interface FetchAssetByIdRepository {
  fetchById: (
    organizationId: string,
    ledgerId: string,
    assetId: string
  ) => Promise<AssetEntity>
}
