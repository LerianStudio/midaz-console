import { ApiException } from '@/core/application/exceptions/api-exception'

export class MidazError extends ApiException {
  constructor(message: string, code: string = '0000') {
    super(code, 'Midaz Error', message)
  }
}
