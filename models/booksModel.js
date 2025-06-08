import db from '../db/pool.js'
import { handleDbError } from '../errors/DatabaseError.js'

class BooksModel {
  async getAll() {
    const { rows } = await handleDbError(() => db.query('SELECT * FROM books'))
    return rows
  }

  async getById(id) {
    const { rows } = await handleDbError(() =>
      db.query('SELECT * FROM books WHERE id = $1', [id]),
    )

    if (rows.length === 0) {
      return false
    }

    return rows[0]
  }

  async add(book) {
    const { title, author, description, pages, publishedDate } = book
    const query =
      'INSERT INTO books (title, author, description, pages, published_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id'
    const values = [title, author, description, pages, publishedDate]

    const { rows } = await handleDbError(() => db.query(query, values))
    return rows[0].id
  }

  async update(id, book) {
    const { title, author, description, pages, publishedDate } = book
    const query =
      'UPDATE books SET title = $1, author = $2, description = $3, pages = $4, published_date = $5 WHERE id = $6'
    const values = [title, author, description, pages, publishedDate, id]
    const { rowCount } = await handleDbError(() => db.query(query, values))

    return rowCount > 0
  }

  async delete(id) {
    // First, delete any associations in the junction table if needed
    await handleDbError(() =>
      db.query('DELETE FROM books_genres WHERE book_id = $1', [id]),
    )

    const { rowCount } = await handleDbError(() =>
      db.query('DELETE FROM books WHERE id = $1', [id]),
    )
    return rowCount > 0
  }
}

export default new BooksModel()
