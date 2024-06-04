import { BaseRepository } from '@/core/repositories/BaseRepository'
import { OryCreateLoginFlowResponseDTO } from '@/core/domain/dto/OryResponseDTO'
import { OrySubmitLoginRequestDTO } from '@/core/domain/dto/OryRequestDTO'
import { OrySessionEntity } from '@/core/domain/entities/OrySessionEntity'

export interface OryAuthRepository extends BaseRepository<any> {
  createLoginFlow(): Promise<OryCreateLoginFlowResponseDTO>
  submitLoginFlow(
    submitLoginData: OrySubmitLoginRequestDTO
  ): Promise<OrySessionEntity>
}
