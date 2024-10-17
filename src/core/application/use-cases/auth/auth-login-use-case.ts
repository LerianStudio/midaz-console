import {
  AuthEntity,
  AuthSessionEntity
} from '@/core/domain/entities/auth-entity'
import { AuthLoginRepository } from '@/core/domain/repositories/auth/auth-login-repository'
import { AuthLoginDto, AuthSessionDto } from '../../dto/auth-dto'
import {
  authSessionEntityToDto,
  dtoToAuthEntity
} from '../../mappers/auth-mapper'

export interface AuthLogin {
  execute: (loginData: AuthLoginDto) => Promise<AuthSessionDto>
}

export class AuthLoginUseCase implements AuthLogin {
  constructor(private readonly authLoginRepository: AuthLoginRepository) {}
  async execute(loginData: AuthLoginDto): Promise<AuthSessionDto> {
    const authLoginEntity: AuthEntity = dtoToAuthEntity(loginData)

    const authLoginResponse: AuthSessionEntity =
      await this.authLoginRepository.login(authLoginEntity)

    const authLoginResponseDto: AuthSessionDto =
      authSessionEntityToDto(authLoginResponse)

    return authLoginResponseDto
  }
}
