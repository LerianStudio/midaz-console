import { Container, ContainerModule } from '../../utils/di/container'
import {
  AuthLogin,
  AuthLoginUseCase
} from '@/core/application/use-cases/auth/auth-login-use-case'

export const AuthUseCaseModule = new ContainerModule((container: Container) => {
  container.bind<AuthLogin>(AuthLoginUseCase).toSelf()
})
