import db from '../db/pool.js'
import { handleDbError } from '../errors/DatabaseError.js'

class GenresModel {
  async getAll() {
    const { rows } = await handleDbError(() => db.query('SELECT * FROM genres'))
    return rows
  }

  async create(name) {
    const { rows } = await handleDbError(() =>
      db.query('INSERT INTO genres (name) VALUES ($1) RETURNING id', [name]),
    )
    return rows[0].id
  }

  async getById(id) {
    const { rows } = await handleDbError(() =>
      db.query('SELECT * FROM genres WHERE id = $1', [id]),
    )

    if (rows.length === 0) {
      return false
    }

    return rows[0]
  }
}

export default new GenresModel()
