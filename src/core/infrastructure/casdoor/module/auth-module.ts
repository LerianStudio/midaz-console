import { Container, ContainerModule } from '../../utils/di/container'

import { AuthLoginRepository } from '@/core/domain/repositories/auth/auth-login-repository'

import { CasdoorAuthLoginRepository } from '../casdoor-auth-login-repository'

export const CasdoorAuthModule = new ContainerModule((container: Container) => {
  container
    .bind<AuthLoginRepository>(AuthLoginRepository)
    .to(CasdoorAuthLoginRepository)
})
