import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../next-auth/casdoor/next-auth-provider'
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
export class HttpFetchUtils {
  private midazCustomSpanName: string = 'midaz-request'
  private midazAuthCustomSpanName: string = 'midaz-auth-request'

  constructor(
    @inject(MidazRequestContext)
    private readonly midazRequestContext: MidazRequestContext,
    @inject(LoggerAggregator)
    private readonly midazLogger: LoggerAggregator,
    @inject(OtelTracerProvider)
    private readonly otelTracerProvider: OtelTracerProvider
  ) {}

  // Midaz Authorization Fetch

  async httpMidazFetch<T>(httpFetchOptions: HttpFetchOptions): Promise<T> {
    const session = await getServerSession(nextAuthOptions)
    const { access_token } = session?.user
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
      'X-Request-Id': this.midazRequestContext.getMidazId(),
      ...httpFetchOptions.headers
    }

    const midazResponse = await this.httpFetch<T>(
      { ...httpFetchOptions, headers },
      this.midazCustomSpanName
    )

    return midazResponse
  }

  // Midaz Without Authorization Fetch

  async httpMidazWithoutAuthFetch<T>(
    httpFetchOptions: HttpFetchOptions
  ): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      'X-Request-Id': this.midazRequestContext.getMidazId(),
      ...httpFetchOptions.headers
    }

    const midazResponse = await this.httpFetch<T>(
      { ...httpFetchOptions, headers },
      this.midazAuthCustomSpanName
    )

    return midazResponse
  }

  private async httpFetch<T>(
    httpFetchOptions: HttpFetchOptions,
    spanName: string
  ): Promise<T> {
    const customSpan = this.otelTracerProvider.startCustomSpan(spanName)

    const response = await fetch(httpFetchOptions.url, {
      method: httpFetchOptions.method,
      body: httpFetchOptions.body,
      headers: httpFetchOptions.headers
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
      this.midazLogger.error('[ERROR] - httpFetch ', {
        url: httpFetchOptions.url,
        method: httpFetchOptions.method,
        status: response.status,
        response: midazResponse
      })
      throw await handleMidazError(midazResponse)
    }

    this.midazLogger.info('[INFO] - httpFetch ', {
      url: httpFetchOptions.url,
      method: httpFetchOptions.method,
      status: response.status
    })

    return midazResponse
  }
}
