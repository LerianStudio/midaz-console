import { AssetEntity } from '@/core/domain/entities/asset-entity'
import { UpdateAssetRepository } from '@/core/domain/repositories/assets/update-asset-repository'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'
import { injectable } from 'inversify'

@injectable()
export class MidazUpdateAssetRepository implements UpdateAssetRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string
  async update(
    organizationId: string,
    ledgerId: string,
    assetId: string,
    asset: Partial<AssetEntity>
  ): Promise<AssetEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/assets/${assetId}`

    const response = await httpMidazAuthFetch<AssetEntity>({
      url,
      method: HTTP_METHODS.PATCH,
      body: JSON.stringify(asset)
    })

    return response
  }
}
