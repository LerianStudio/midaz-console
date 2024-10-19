import { FetchAssetByIdRepository } from '@/core/domain/repositories/assets/fetch-asset-by-id-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { AssetEntity } from '@/core/domain/entities/asset-entity'

export class MidazFetchAssetByIdRepository implements FetchAssetByIdRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchById(
    organizationId: string,
    ledgerId: string,
    assetId: string
  ): Promise<AssetEntity> {
    const assetUrl = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/assets/${assetId}`

    const response = await fetch(assetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazFetchAssetByIdRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
