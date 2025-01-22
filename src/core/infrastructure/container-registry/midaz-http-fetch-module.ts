import { Container, ContainerModule } from '../utils/di/container'
import { MidazHttpFetchUtils } from '../utils/http-fetch-utils'
export const ContainerTypeMidazHttpFetch = {
  MidazHttpFetchUtils: 'MidazHttpFetchUtils'
}
export const MidazHttpFetchModule = new ContainerModule(
  (container: Container) => {
    container
      .bind<MidazHttpFetchUtils>(
        ContainerTypeMidazHttpFetch.MidazHttpFetchUtils
      )
      .to(MidazHttpFetchUtils)
  }
)
