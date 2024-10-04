export class MissingFieldsMidazError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class InvalidFieldMidazError extends Error {
  constructor() {
    super('Invalid field')
  }
}
