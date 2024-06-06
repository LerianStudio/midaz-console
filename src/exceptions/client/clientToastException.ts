export class ClientToastException extends Error {
  messageAttributeName: string

  constructor(message: string, messageAttributeName: string) {
    super(message)
    this.messageAttributeName = messageAttributeName
  }
}
