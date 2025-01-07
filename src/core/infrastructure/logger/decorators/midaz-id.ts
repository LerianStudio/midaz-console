import { v4 as uuidv4 } from 'uuid'
import { injectable } from 'inversify'

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
