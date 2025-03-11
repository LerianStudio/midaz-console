import { Container, ContainerModule } from '../../utils/di/container'
import { AuthModule } from './auth-module'

export const LerianAuthModule = new ContainerModule((container: Container) => {
  container.load(AuthModule)
})
