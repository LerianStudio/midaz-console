import { BaseRepository } from '@/repositories/BaseRepository'
import { OryCreateLoginFlowResponseDTO } from '@/domain/dto/OryResponseDTO'
import { OrySubmitLoginRequestDTO } from '@/domain/dto/OryRequestDTO'
import { OrySessionEntity } from '@/domain/entities/OrySessionEntity'

export interface OryAuthRepository extends BaseRepository<any> {
  createLoginFlow(): Promise<OryCreateLoginFlowResponseDTO>
  submitLoginFlow(
    submitLoginData: OrySubmitLoginRequestDTO
  ): Promise<OrySessionEntity>
}
