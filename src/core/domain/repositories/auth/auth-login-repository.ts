import {
  AuthEntity,
  AuthResponseEntity,
  AuthSessionEntity
} from '../../entities/auth-entity'

export interface AuthLoginRepository {
  login: (loginData: AuthEntity) => Promise<AuthSessionEntity>
}
