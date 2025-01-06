import { MIDAZ_ID_KEY } from './midaz-id'

import { container } from '../../container-registry/container-registry'

import { MidazRequestContext } from './midaz-id'
import { containerRequest } from '../../container-registry/container-request-registry'

export function MidazId() {
  return function (target: any, propertyKey: string) {
    // descriptor.value = async function (...args: any[]) {
    //   const midazId = container.get<MidazRequestContext>(MIDAZ_ID_KEY)
    //   console.log('midazId', midazId.getMidazId())
    //   return midazId.getMidazId()
    // }

    let value: string | null = null

    const getter = function () {
      if (!value) {
        try {
          const midazId = container.get<MidazRequestContext>(MIDAZ_ID_KEY)
          value = midazId.getMidazId()
        } catch (err) {
          console.warn('[@MidazId] MidazRequestContext not available.', err)
          value = ''
        }
      }
      return value
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      enumerable: true,
      configurable: true
    })
  }
}
