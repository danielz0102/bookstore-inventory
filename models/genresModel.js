import db from '../db/pool.js'
import { handleDbError } from '../lib/errors/DatabaseError.js'

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

  async update(id, name) {
    const { rowCount } = await handleDbError(() =>
      db.query('UPDATE genres SET name = $1 WHERE id = $2 RETURNING *', [
        name,
        id,
      ]),
    )

    return rowCount > 0
  }

  async delete(id) {
    // First, delete the associations in the junction table, if any
    await handleDbError(() =>
      db.query('DELETE FROM books_genres WHERE genre_id = $1', [id]),
    )

    const { rowCount } = await handleDbError(() =>
      db.query('DELETE FROM genres WHERE id = $1', [id]),
    )

    return rowCount > 0
  }

  async getPage(limit, offset = 0) {
    const { rows } = await handleDbError(() =>
      db.query('SELECT * FROM genres ORDER BY id LIMIT $1 OFFSET $2', [
        limit,
        offset,
      ]),
    )
    return rows
  }

  async getByBookId(bookId) {
    const { rows } = await handleDbError(() =>
      db.query(
        `SELECT g.* FROM genres g
         JOIN books_genres bg ON g.id = bg.genre_id
         WHERE bg.book_id = $1`,
        [bookId],
      ),
    )

    return rows
  }
}

export default new GenresModel()
