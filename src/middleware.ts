import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { apiLoggerMiddleware } from './middleware/api-logger.middleware'
export async function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith('/api')) {
  //   return apiLoggerMiddleware(request, () =>
  //     Promise.resolve(NextResponse.next())
  //   )
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|public/.*).*)'
  ]
}
