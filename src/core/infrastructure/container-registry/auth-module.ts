import { ContainerModule, interfaces } from 'inversify'

import {
  AuthLogin,
  AuthLoginUseCase
} from '@/core/application/use-cases/auth/auth-login-use-case'

import { AuthLoginRepository } from '@/core/domain/repositories/auth/auth-login-repository'

import { CasdoorAuthLoginRepository } from '../casdoor/casdoor-auth-login-repository'

export const AuthRegistry = {
  AuthLoginRepository: Symbol.for('AuthLoginRepository'),
  AuthLoginUseCase: Symbol.for('AuthLoginUseCase')
}

export const AuthModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<AuthLoginRepository>(AuthRegistry.AuthLoginRepository).toConstantValue(
    new CasdoorAuthLoginRepository()
  )

  bind<AuthLogin>(AuthRegistry.AuthLoginUseCase).toDynamicValue((context) => {
    return new AuthLoginUseCase(
      context.container.get(AuthRegistry.AuthLoginRepository)
    )
  })
})
