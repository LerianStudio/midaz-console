import { Container, ContainerModule } from '../../utils/di/container'
import { OrganizationModule } from './organization-module'

export const MidazModule = new ContainerModule((container: Container) => {
  container.load(OrganizationModule)
})
