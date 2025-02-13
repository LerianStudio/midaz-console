import { SegmentEntity } from '@/core/domain/entities/segment-entity'
import { CreateSegmentRepository } from '@/core/domain/repositories/segments/create-segment-repository'
import { HTTP_METHODS, MidazHttpFetchUtils } from '../../utils/http-fetch-utils'
import { injectable, inject } from 'inversify'
import { ContainerTypeMidazHttpFetch } from '../../container-registry/midaz-http-fetch-module'

@injectable()
export class MidazCreateSegmentRepository implements CreateSegmentRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  constructor(
    @inject(ContainerTypeMidazHttpFetch.MidazHttpFetchUtils)
    private readonly midazHttpFetchUtils: MidazHttpFetchUtils
  ) {}

  async create(
    organizationId: string,
    ledgerId: string,
    segment: SegmentEntity
  ): Promise<SegmentEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/segments`
    const response =
      await this.midazHttpFetchUtils.httpMidazAuthFetch<SegmentEntity>({
        url,
        method: HTTP_METHODS.POST,
        body: JSON.stringify(segment)
      })

    return response
  }
}
