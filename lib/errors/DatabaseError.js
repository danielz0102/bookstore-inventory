export class DatabaseError extends Error {
  constructor(message) {
    super(message)
    this.name = 'DatabaseError'
    this.statusCode = 500
  }
}

export async function handleDbError(fn) {
  try {
    return await fn()
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}
