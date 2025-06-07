import db from '../db/pool.js'
import { handleDbError } from '../errors/DatabaseError.js'

class GenresModel {
  async getAll() {
    const { rows } = await handleDbError(() => db.query('SELECT * FROM genres'))
    return rows
  }
}

export default new GenresModel()
