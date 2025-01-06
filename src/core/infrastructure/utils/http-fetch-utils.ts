import { getServerSession } from 'next-auth'
import { nextAuthCasdoorOptions } from '../next-auth/casdoor/next-auth-casdoor-provider'
import { handleMidazError } from './midaz-error-handler'
import { isNil } from 'lodash'
import { MIDAZ_ID_KEY } from '../logger/decorators/midaz-id'
import { MidazRequestContext } from '../logger/decorators/midaz-id'
import { container } from '../container-registry/container-registry'
import { MidazId } from '../logger/decorators/MidazId.decorator'

export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export type HttpFetchOptions = {
  url: string
  method: HTTP_METHODS
  headers?: Record<string, string>
  body?: string
}

export async function httpMidazAuthFetch<T>(
  httpFetchOptions: HttpFetchOptions
): Promise<T> {
  const session = await getServerSession(nextAuthCasdoorOptions)
  const { access_token } = session?.user
  const midazId: MidazRequestContext =
    container.get<MidazRequestContext>(MIDAZ_ID_KEY)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${access_token}`,
    'Midaz-Id': midazId.getMidazId(),
    ...httpFetchOptions.headers
  }

  const response = await fetch(httpFetchOptions.url, {
    method: httpFetchOptions.method,
    body: httpFetchOptions.body,
    headers: {
      ...headers
    }
  })

  const midazResponse = !isNil(response.body) ? await response.json() : {}

  if (!response.ok) {
    console.error('[ERROR] - httpMidazAuthFetch ', midazResponse)
    throw await handleMidazError(midazResponse)
  }

  return midazResponse
}

export class HttpFetchUtils {
  @MidazId()
  private readonly midazId!: string

  httpMidazAuthFetch<T>(httpFetchOptions: HttpFetchOptions): Promise<T> {
    httpFetchOptions.headers = {
      ...httpFetchOptions.headers,
      'Midaz-Id': this.midazId
    }
    return httpMidazAuthFetch(httpFetchOptions)
  }
}
