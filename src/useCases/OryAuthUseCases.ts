import { OryAuthRepository } from '@/repositories/OryAuthRepository'
import { OrySubmitLoginRequestDTO } from '@/domain/dto/OryRequestDTO'
import { OryCreateLoginFlowResponseDTO } from '@/domain/dto/OryResponseDTO'
import { OrySessionEntity } from '@/domain/entities/OrySessionEntity'
import { HttpException, InternalServerErrorException } from '@/errors/HttpExceptions'

type IOryAuthUseCases = {
  usernamePasswordLogin: (
    username: string,
    password: string
  ) => Promise<OrySessionEntity>
}

class OryAuthUseCases implements IOryAuthUseCases {
  constructor(private readonly oryAuthAdapter: OryAuthRepository) {
  }
  
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
