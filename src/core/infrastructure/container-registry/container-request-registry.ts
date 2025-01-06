import { Container, interfaces } from 'inversify'
import {
  MIDAZ_ID_KEY,
  MidazRequestContext
} from '../logger/decorators/midaz-id'
import { container } from './container-registry'

export const containerRequest = new Container()

containerRequest.bind<MidazRequestContext>(MIDAZ_ID_KEY).to(MidazRequestContext)
containerRequest.parent = container.container
