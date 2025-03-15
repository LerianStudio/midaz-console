import {
  AuthEntity,
  AuthSessionEntity
} from '@/core/domain/entities/auth-entity'
import { AuthLoginRepository } from '@/core/domain/repositories/auth/auth-login-repository'
import type { AuthLoginDto, AuthSessionDto } from '../../dto/auth-dto'
import {
  authSessionEntityToDto,
  dtoToAuthEntity
} from '../../mappers/auth-mapper'
import { inject, injectable } from 'inversify'
import { LogOperation } from '../../decorators/log-operation'

export interface AuthLogin {
  execute: (loginData: AuthLoginDto) => Promise<AuthSessionDto>
}

@injectable()
export class AuthLoginUseCase implements AuthLogin {
  constructor(
    @inject(AuthLoginRepository)
    private readonly authLoginRepository: AuthLoginRepository
  ) {}

  @LogOperation({ layer: 'application' })
  async execute(loginData: AuthLoginDto): Promise<AuthSessionDto> {
    const authLoginEntity: AuthEntity = dtoToAuthEntity(loginData)

    const authLoginResponse: AuthSessionEntity =
      await this.authLoginRepository.login(authLoginEntity)

    const authLoginResponseDto: AuthSessionDto =
      authSessionEntityToDto(authLoginResponse)

    return authLoginResponseDto
  }
}
