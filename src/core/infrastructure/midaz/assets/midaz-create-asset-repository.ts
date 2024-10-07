import { AssetEntity } from '@/core/domain/entities/asset-entity'
import { CreateAssetRepository } from '@/core/domain/repositories/assets/create-asset-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazCreateAssetRepository implements CreateAssetRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string
  async create(
    organizationId: string,
    ledgerId: string,
    asset: AssetEntity
  ): Promise<AssetEntity> {
    console.log('MidazCreateAssetRepository', asset)

    const response = await fetch(
      `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/assets`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(asset)
      }
    )

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazCreateAssetRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
