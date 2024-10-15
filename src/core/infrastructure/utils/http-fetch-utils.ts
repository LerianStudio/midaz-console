import { getServerSession } from 'next-auth'
import { nextAuthCasdoorOptions } from '../next-auth/casdoor/next-auth-casdoor-provider'

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

export async function httpMidazAuthFetch(httpFetchOptions: HttpFetchOptions) {
  const session = await getServerSession(nextAuthCasdoorOptions)
  const { access_token } = session?.user as any

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

  return response
}
