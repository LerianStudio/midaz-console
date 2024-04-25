
export enum HttpStatusCode {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500
}

abstract class HttpException extends Error {
  abstract statusCode: HttpStatusCode;
  
  protected constructor(message: string) {
    super(message);
  }
}

class BadRequestException extends HttpException {
  statusCode = HttpStatusCode.BadRequest;
  
  constructor(message: string = 'The request is malformed') {
    super(message);
  }
}

class UnauthorizedException extends HttpException {
  statusCode = HttpStatusCode.Unauthorized;
  
  constructor(message: string = 'Authentication credentials are missing or invalid') {
    super(message);
  }
}

class ForbiddenException extends HttpException {
  statusCode = HttpStatusCode.Forbidden;
  
  constructor(message: string = 'You do not have permission to access this resource') {
    super(message);
  }
}

class NotFoundException extends HttpException {
  statusCode = HttpStatusCode.NotFound;
  
  constructor(message: string = 'The requested resource was not found') {
    super(message);
  }
}

class InternalServerErrorException extends HttpException {
  statusCode = HttpStatusCode.InternalServerError;
  
  constructor(message: string = 'An internal server error occurred') {
    super(message);
  }
}

const httpExceptionHelper = (statusCode: number) => {
  switch (statusCode) {
    case HttpStatusCode.BadRequest:
      return BadRequestException
    case HttpStatusCode.NotFound:
      return NotFoundException
    case HttpStatusCode.Forbidden:
      return ForbiddenException
    case HttpStatusCode.Unauthorized:
      return UnauthorizedException
    default:
      return InternalServerErrorException
  }
}


export {
  HttpException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  httpExceptionHelper
}

