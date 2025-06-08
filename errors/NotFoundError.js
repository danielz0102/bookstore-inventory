export class NotFoundError extends Error {
  constructor(message, friendlyMessage = 'Resource not found') {
    super(message)
    this.name = 'NotFoundError'
    this.friendlyMessage = friendlyMessage
    this.statusCode = 404
  }
}
