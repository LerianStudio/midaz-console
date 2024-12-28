import { v4 as uuidv4 } from 'uuid'
import { injectable } from 'inversify'

export const MIDAZ_ID_KEY = Symbol.for('midazId')

@injectable()
export class MidazRequestContext {
  private midazId: string

  constructor() {
    this.midazId = uuidv4()
  }

  getMidazId(): string {
    return this.midazId
  }
}
