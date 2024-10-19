import { AssetEntity } from '@/core/domain/entities/asset-entity'
import { CreateAssetRepository } from '@/core/domain/repositories/assets/create-asset-repository'
import { HTTP_METHODS, httpMidazAuthFetch } from '../../utils/http-fetch-utils'
import { handleMidazError } from '../../utils/midaz-error-handler'

export class MidazCreateAssetRepository implements CreateAssetRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string
  async create(
    organizationId: string,
    ledgerId: string,
    asset: AssetEntity
  ): Promise<AssetEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/assets`

    const response = await httpMidazAuthFetch<AssetEntity>({
      url,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(asset)
    })

    return response
  }
}
