import { BaseRepository } from '@/core/repositories/base-repository'
import { OryCreateLoginFlowResponseDTO } from '@/core/domain/dto/ory-response-dto'
import { OrySubmitLoginRequestDTO } from '@/core/domain/dto/ory-request-dto'
import { OrySessionEntity } from '@/core/domain/entities/ory-session-entity'

export interface OryAuthRepository extends BaseRepository<any> {
  createLoginFlow(): Promise<OryCreateLoginFlowResponseDTO>
  submitLoginFlow(
    submitLoginData: OrySubmitLoginRequestDTO
  ): Promise<OrySessionEntity>
}
