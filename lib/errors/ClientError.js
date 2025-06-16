export class ClientError extends Error {
  constructor(message, friendlyMessage, statusCode = 400) {
    super(message)
    this.name = 'ClientError'
    this.friendlyMessage = friendlyMessage
    this.statusCode = statusCode
  }
}
