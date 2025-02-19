import { Container, ContainerModule } from '../../utils/di/container'

import { AuthLoginRepository } from '@/core/domain/repositories/auth/auth-login-repository'
import { AuthPermissionRepository } from '@/core/domain/repositories/auth/auth-permission-repository'

import { LerianAuthLoginRepository } from '../lerian-auth-login-repository'
import { LerianAuthPermissionRepository } from '../lerian-auth-permission-repository'

export const AuthModule = new ContainerModule((container: Container) => {
  container
    .bind<AuthLoginRepository>(AuthLoginRepository)
    .to(LerianAuthLoginRepository)
  container
    .bind<AuthPermissionRepository>(AuthPermissionRepository)
    .to(LerianAuthPermissionRepository)
})
