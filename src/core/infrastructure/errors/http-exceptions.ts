import { HttpStatus } from '@/lib/http'

abstract class HttpException extends Error {
  abstract statusCode: HttpStatus

  protected constructor(message: string) {
    super(message)
  }
}

class UnauthorizedException extends HttpException {
  statusCode = HttpStatus.UNAUTHORIZED

  constructor(
    message: string = 'Authentication credentials are missing or invalid'
  ) {
    super(message)
  }
}

const httpExceptionHelper = (statusCode: number) => {
  switch (statusCode) {
    case HttpStatus.UNAUTHORIZED:
      return UnauthorizedException
  }
}

export { HttpException, UnauthorizedException, httpExceptionHelper }
