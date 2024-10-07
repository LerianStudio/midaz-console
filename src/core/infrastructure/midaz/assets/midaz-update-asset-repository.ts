import { AssetEntity } from '@/core/domain/entities/asset-entity'
import { UpdateAssetRepository } from '@/core/domain/repositories/assets/update-asset-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazUpdateAssetRepository implements UpdateAssetRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string
  async update(
    organizationId: string,
    ledgerId: string,
    assetId: string,
    asset: Partial<AssetEntity>
  ): Promise<AssetEntity> {
    const response = await fetch(
      `${this.baseUrl}/${organizationId}/ledgers/${ledgerId}/assets/${assetId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(asset)
      }
    )

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazUpdateAssetRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
