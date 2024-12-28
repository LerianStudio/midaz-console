import { Container, interfaces } from 'inversify'
import {
  MIDAZ_ID_KEY,
  MidazRequestContext
} from '../logger/decorators/midaz-id'
import { container } from './container-registry'

const containerRequest = new Container()

containerRequest.bind<MidazRequestContext>(MIDAZ_ID_KEY).to(MidazRequestContext)

const loggerMiddleware: interfaces.Middleware = (next) => (args) => {
  console.log(`[Inversify] Resolving: ${args.serviceIdentifier.toString()}`)
  const result = next(args)
  console.log('[Inversify] Result: ', result)
  console.log(`[Inversify] Resolved: ${args.serviceIdentifier.toString()}`)
  return result
}

containerRequest.applyMiddleware(loggerMiddleware)

// containerRequest.parent = container.container

export { containerRequest }
