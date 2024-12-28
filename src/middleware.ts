import 'reflect-metadata'
import { NextRequest, NextResponse } from 'next/server'
import { requestIdMiddleware } from '@/lib/middleware/request-id'
import { containerRequest } from './core/infrastructure/container-registry/container-request-registry'
import { container } from './core/infrastructure/container-registry/container-registry'
import {
  MIDAZ_ID_KEY,
  MidazRequestContext
} from './core/infrastructure/logger/decorators/midaz-id'
// const withRequestId = requestIdMiddleware()

export async function middleware(request: NextRequest) {
  // const response = NextResponse.next()
  request.headers.set('X-Midaz-Id', '123')
  // await withRequestId(request, async () => response)

  // const midazId = request.headers.get('X-Midaz-Id')

  // // if (midazId) {
  // //   response.headers.set('X-Midaz-Id', midazId)
  // // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*']
}
