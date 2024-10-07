import { AssetEntity } from '../../entities/asset-entity'

export interface UpdateAssetRepository {
  update: (
    organizationId: string,
    ledgerId: string,
    assetId: string,
    asset: Partial<AssetEntity>
  ) => Promise<AssetEntity>
}
