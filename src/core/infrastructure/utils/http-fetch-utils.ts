import { getServerSession } from 'next-auth'
import { nextAuthCasdoorOptions } from '../next-auth/casdoor/next-auth-casdoor-provider'
import { handleMidazError } from './midaz-error-handler'
import { isNil } from 'lodash'
import { MidazRequestContext } from '../logger/decorators/midaz-id'
import { inject, injectable } from 'inversify'
import { LoggerAggregator } from '@/core/application/logger/logger-aggregator'
import { OtelTracerProvider } from '../observability/otel-tracer-provider'
import { SpanStatusCode } from '@opentelemetry/api'

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

@injectable()
export class MidazHttpFetchUtils {
  constructor(
    @inject(MidazRequestContext)
    private readonly midazRequestContext: MidazRequestContext,
    @inject(LoggerAggregator)
    private readonly midazLogger: LoggerAggregator,
    @inject(OtelTracerProvider)
    private readonly otelTracerProvider: OtelTracerProvider
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

    const customSpan = this.otelTracerProvider.startCustomSpan('midaz-request')

    const response = await fetch(httpFetchOptions.url, {
      method: httpFetchOptions.method,
      body: httpFetchOptions.body,
      headers: {
        ...headers
      }
    })

    this.otelTracerProvider.endCustomSpan(
      customSpan
        .setAttributes({
          'http.url': httpFetchOptions.url,
          'http.method': httpFetchOptions.method,
          'http.status_code': response.status
        })
        .setStatus({
          code: response.ok ? SpanStatusCode.OK : SpanStatusCode.ERROR
        })
    )

    const midazResponse = !isNil(response.body) ? await response.json() : {}

    if (!response.ok) {
      this.midazLogger.error('[ERROR] - httpMidazAuthFetch ', {
        url: httpFetchOptions.url,
        method: httpFetchOptions.method,
        status: response.status,
        response: midazResponse
      })
      throw await handleMidazError(midazResponse)
    }

    this.midazLogger.info('[INFO] - httpMidazAuthFetch ', {
      url: httpFetchOptions.url,
      method: httpFetchOptions.method,
      status: response.status
    })

    return midazResponse
  }
}
