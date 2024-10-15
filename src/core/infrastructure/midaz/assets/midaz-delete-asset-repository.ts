import { DeleteAssetRepository } from '@/core/domain/repositories/assets/delete-asset-repository'
import { handleMidazError } from '../../utils/midaz-error-handler'
import { httpMidazAuthFetch, HTTP_METHODS } from '../../utils/http-fetch-utils'

export class MidazDeleteAssetRepository implements DeleteAssetRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  async delete(
    organizationId: string,
    ledgerId: string,
    assetId: string
  ): Promise<void> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/assets/${assetId}`

    const response = await httpMidazAuthFetch<void>({
      url,
      method: HTTP_METHODS.DELETE
    })

    return
  }
}
