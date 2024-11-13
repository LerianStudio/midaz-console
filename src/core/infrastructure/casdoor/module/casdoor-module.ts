import { Container, ContainerModule } from '../../utils/di/container'
import { CasdoorAuthModule } from './auth-module'

export const CasdoorModule = new ContainerModule((container: Container) => {
  container.load(CasdoorAuthModule)
})
