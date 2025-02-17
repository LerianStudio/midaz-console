import { getServerSession } from 'next-auth'
import { nextAuthCasdoorOptions } from '../next-auth/casdoor/next-auth-casdoor-provider'
import { handleMidazError } from './midaz-error-handler'
import { isNil } from 'lodash'
import { MidazRequestContext } from '../logger/decorators/midaz-id'
import { inject, injectable } from 'inversify'
import { LoggerAggregator } from '@/core/application/logger/logger-aggregator'

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

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${access_token}`,
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

@injectable()
export class MidazHttpFetchUtils {
  constructor(
    @inject(MidazRequestContext)
    private readonly midazRequestContext: MidazRequestContext,
    @inject(LoggerAggregator)
    private readonly midazLogger: LoggerAggregator
  ) {}

  async httpMidazAuthFetch<T>(httpFetchOptions: HttpFetchOptions): Promise<T> {
    const session = await getServerSession(nextAuthCasdoorOptions)
    const { access_token } = session?.user

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
      'X-Request-Id': this.midazRequestContext.getMidazId(),
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
      this.midazLogger.error('[ERROR] - httpMidazAuthFetch ', midazResponse)
      throw await handleMidazError(midazResponse)
    }

    return midazResponse
  }
}
