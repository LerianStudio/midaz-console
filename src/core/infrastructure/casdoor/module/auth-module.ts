import { Container, ContainerModule } from '../../utils/di/container'

import { AuthLoginRepository } from '@/core/domain/repositories/auth/auth-login-repository'
import { AuthPermissionRepository } from '@/core/domain/repositories/auth/auth-permission-repository'

import { CasdoorAuthLoginRepository } from '../casdoor-auth-login-repository'
import { CasdoorAuthPermissionRepository } from '../casdoor-auth-permission-repository'

export const CasdoorAuthModule = new ContainerModule((container: Container) => {
  container
    .bind<AuthLoginRepository>(AuthLoginRepository)
    .to(CasdoorAuthLoginRepository)
  container
    .bind<AuthPermissionRepository>(AuthPermissionRepository)
    .to(CasdoorAuthPermissionRepository)
})
