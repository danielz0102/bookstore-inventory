import db from '../db/pool.js'
import { handleDbError } from '../errors/DatabaseError.js'

class BooksModel {
  async getAll() {
    const { rows } = await handleDbError(() => db.query('SELECT * FROM books'))
    return rows
  }
}

export default new BooksModel()
