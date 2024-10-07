import { DeleteAssetRepository } from '@/core/domain/repositories/assets/delete-asset-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazDeleteAssetRepository implements DeleteAssetRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async delete(
    organizationId: string,
    ledgerId: string,
    assetId: string
  ): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/${organizationId}/ledgers/${ledgerId}/assets/${assetId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazDeleteAssetRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
