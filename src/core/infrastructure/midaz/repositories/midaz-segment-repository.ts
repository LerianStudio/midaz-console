import { injectable, inject } from 'inversify'
import { SegmentEntity } from '@/core/domain/entities/segment-entity'
import { SegmentRepository } from '@/core/domain/repositories/segment-repository'
import { HTTP_METHODS, HttpFetchUtils } from '../../utils/http-fetch-utils'
import { ContainerTypeMidazHttpFetch } from '../../container-registry/midaz-http-fetch-module'
import { PaginationEntity } from '@/core/domain/entities/pagination-entity'

@injectable()
export class MidazSegmentRepository implements SegmentRepository {
  private baseUrl: string = process.env.MIDAZ_BASE_PATH as string

  constructor(
    @inject(ContainerTypeMidazHttpFetch.HttpFetchUtils)
    private readonly midazHttpFetchUtils: HttpFetchUtils
  ) {}

  async create(
    organizationId: string,
    ledgerId: string,
    segment: SegmentEntity
  ): Promise<SegmentEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/segments`
    const response =
      await this.midazHttpFetchUtils.httpMidazFetch<SegmentEntity>({
        url,
        method: HTTP_METHODS.POST,
        body: JSON.stringify(segment)
      })

    return response
  }

  async fetchAll(
    organizationId: string,
    ledgerId: string,
    limit: number,
    page: number
  ): Promise<PaginationEntity<SegmentEntity>> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/segments?limit=${limit}&page=${page}`

    const response = await this.midazHttpFetchUtils.httpMidazFetch<
      PaginationEntity<SegmentEntity>
    >({
      url,
      method: HTTP_METHODS.GET
    })

    return response
  }

  async fetchById(
    organizationId: string,
    ledgerId: string,
    segmentId: string
  ): Promise<SegmentEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/segments/${segmentId}`

    const response =
      await this.midazHttpFetchUtils.httpMidazFetch<SegmentEntity>({
        url,
        method: HTTP_METHODS.GET
      })

    return response
  }

  async update(
    organizationId: string,
    ledgerId: string,
    segmentId: string,
    segment: Partial<SegmentEntity>
  ): Promise<SegmentEntity> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/segments/${segmentId}`

    const response =
      await this.midazHttpFetchUtils.httpMidazFetch<SegmentEntity>({
        url,
        method: HTTP_METHODS.PATCH,
        body: JSON.stringify(segment)
      })

    return response
  }

  async delete(
    organizationId: string,
    ledgerId: string,
    segmentId: string
  ): Promise<void> {
    const url = `${this.baseUrl}/organizations/${organizationId}/ledgers/${ledgerId}/segments/${segmentId}`

    await this.midazHttpFetchUtils.httpMidazFetch<void>({
      url,
      method: HTTP_METHODS.DELETE
    })

    return
  }
}
