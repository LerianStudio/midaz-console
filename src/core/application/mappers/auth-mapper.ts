import {
  AuthEntity,
  AuthResponseEntity,
  AuthSessionEntity
} from '@/core/domain/entities/auth-entity'
import {
  AuthLoginDto,
  AuthLoginResponseDto,
  AuthSessionDto
} from '../dto/auth-dto'

export function authEntityToDto(
  entity: AuthResponseEntity
): AuthLoginResponseDto {
  return {
    access_token: entity.access_token,
    token_type: entity.token_type,
    expires_in: entity.expires_in,
    refresh_token: entity.refresh_token,
    scope: entity.scope
  }
}

export function dtoToAuthEntity(dto: AuthLoginDto): AuthEntity {
  return {
    username: dto.username,
    password: dto.password
  }
}

export function authSessionEntityToDto(
  entity: AuthSessionEntity
): AuthSessionDto {
  return {
    id: entity.id,
    username: entity.username,
    name: entity.name,
    access_token: entity.access_token,
    refresh_token: entity.refresh_token
  }
}
