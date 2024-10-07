import { AssetEntity } from '@/core/domain/entities/asset-entity'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'
import { FetchAllAssetsRepository } from '@/core/domain/repositories/assets/fetch-all-assets-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazFetchAllAssetsRepository implements FetchAllAssetsRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async fetchAll(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number,
    type?: string,
    code?: string,
    metadata?: Record<string, string>
  ): Promise<PaginationEntity<AssetEntity>> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      type: type || '',
      code: code || ''
    })
    const assetUrl = `${this.baseUrl}/${organizationId}/ledgers/${ledgerId}/assets?${params.toString()}`

    const response = await fetch(assetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const midazResponse = await response.json()

    if (!response.ok) {
      console.error('MidazFetchAllAssetsRepository', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
