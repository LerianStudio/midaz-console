import { AssetEntity } from '../../entities/asset-entity'

export interface CreateAssetRepository {
  create: (
    organizationId: string,
    ledgerId: string,
    asset: AssetEntity
  ) => Promise<AssetEntity>
}
