import { OryAuthRepository } from '@/core/repositories/ory-auth-repository'
import { OrySubmitLoginRequestDTO } from '@/core/domain/dto/ory-request-dto'
import { OryCreateLoginFlowResponseDTO } from '@/core/domain/dto/ory-response-dto'
import { OrySessionEntity } from '@/core/domain/entities/ory-session-entity'
import {
  HttpException,
  InternalServerErrorException
} from '@/core/infrastructure/errors/http-exceptions'

type IOryAuthUseCases = {
  usernamePasswordLogin: (
    username: string,
    password: string
  ) => Promise<OrySessionEntity>
}

class OryAuthUseCases implements IOryAuthUseCases {
  constructor(private readonly oryAuthAdapter: OryAuthRepository) {}

  async usernamePasswordLogin(
    username: string,
    password: string
  ): Promise<OrySessionEntity> {
    try {
      const loginFlow: OryCreateLoginFlowResponseDTO =
        await this.oryAuthAdapter.createLoginFlow()

      const loginData: OrySubmitLoginRequestDTO = {
        identifier: username,
        password: password,
        nextActionUrl: loginFlow.nextActionUrl,
        csrfToken: loginFlow.csrfToken,
        csrfCookie: loginFlow.csrfCookie
      }

      return await this.oryAuthAdapter.submitLoginFlow(loginData)
    } catch (error: any) {
      console.error(error)

      if (error instanceof HttpException) {
        throw error
      }

      throw new InternalServerErrorException()
    }
  }
}

export default OryAuthUseCases
