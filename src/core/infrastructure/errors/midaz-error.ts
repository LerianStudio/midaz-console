export class MidazError extends Error {
  code = '0000'

  constructor(message: string, code: string = '0000') {
    super(message)
    this.code = code
  }
}
