export class FailureMidazError extends Error {
  constructor() {
    super('Midaz connection failure')
  }
}

export class MissingFieldsMidazError extends Error {
  constructor() {
    const intl = super('Missing fields')
  }
}

export class MidazError extends Error {
  constructor(message: string) {
    super(message)
  }
}
