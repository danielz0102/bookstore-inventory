export class AuthenticationError extends Error {
  constructor(message = 'Authentication failed') {
    super(message)
    this.name = 'AuthenticationError'
    this.friendlyMessage =
      'Authentication failed. Please check your credentials.'
    this.statusCode = 401
  }
}
