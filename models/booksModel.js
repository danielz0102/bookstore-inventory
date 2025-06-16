import db from '../db/pool.js'
import { handleDbError } from '../lib/errors/DatabaseError.js'
import { DatabaseError } from '../lib/errors/DatabaseError.js'

class BooksModel {
  async getAll() {
    const { rows } = await handleDbError(() => db.query('SELECT * FROM books'))
    return rows
  }

  async getById(id) {
    const { rows } = await handleDbError(() =>
      db.query('SELECT * FROM books WHERE id = $1', [id]),
    )
    return rows[0]
  }

  async getLast(limit) {
    const query = 'SELECT * FROM books ORDER BY id DESC LIMIT $1'
    const values = [limit]
    const { rows } = await handleDbError(() => db.query(query, values))
    return rows
  }

  async add(book) {
    const {
      title,
      author,
      description,
      pages,
      publishedDate,
      isbn,
      genresIds,
      coverPath,
    } = book
    const query =
      'INSERT INTO books (title, author, description, pages, published_date, isbn, cover_path) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id'
    const values = [
      title,
      author,
      description,
      pages,
      publishedDate,
      isbn,
      coverPath,
    ]

    const { rows } = await handleDbError(() => db.query(query, values))
    const bookId = rows[0].id

    // Also insert into the junction table
    if (genresIds?.length > 0) {
      await this.insertBookGenres(bookId, genresIds)
    }

    return bookId
  }

  async update(id, book) {
    const {
      title,
      author,
      description,
      pages,
      publishedDate,
      isbn,
      coverPath,
      genresIds,
    } = book
    const finalCoverPath = coverPath || (await this.getCoverPath(id))
    const query =
      'UPDATE books SET title = $1, author = $2, description = $3, pages = $4, published_date = $5, isbn = $6, cover_path = $7 WHERE id = $8'
    const values = [
      title,
      author,
      description,
      pages,
      publishedDate,
      isbn,
      finalCoverPath,
      id,
    ]

    await handleDbError(() => db.query(query, values))

    //Replace genres in the junction table
    await handleDbError(() =>
      db.query('DELETE FROM books_genres WHERE book_id = $1', [id]),
    )

    if (genresIds?.length > 0) {
      await this.insertBookGenres(id, genresIds)
    }
  }

  async insertBookGenres(bookId, genresIds) {
    const genreValues = genresIds.map((genreId) => [bookId, genreId])
    const valuePlaceholders = genreValues
      .map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
      .join(', ')
    const flatValues = genreValues.flat()
    const query = `INSERT INTO books_genres (book_id, genre_id) VALUES ${valuePlaceholders}`

    await handleDbError(() => db.query(query, flatValues))
  }

  async delete(id) {
    // First, delete any associations in the junction table
    await handleDbError(() =>
      db.query('DELETE FROM books_genres WHERE book_id = $1', [id]),
    )

    const { rowCount } = await handleDbError(() =>
      db.query('DELETE FROM books WHERE id = $1', [id]),
    )
    return rowCount > 0
  }

  async getPage(limit, offset) {
    const query = 'SELECT * FROM books ORDER BY id LIMIT $1 OFFSET $2'
    const values = [limit, offset]
    const { rows } = await handleDbError(() => db.query(query, values))
    return rows
  }

  async searchByTitleOrAuthor(term, limit = 30, page = 1) {
    const offset = (page - 1) * limit
    const query =
      'SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1 ORDER BY id LIMIT $2 OFFSET $3'
    const values = [`%${term}%`, limit, offset]
    const { rows } = await handleDbError(() => db.query(query, values))
    return rows
  }

  async countByTitleOrAuthor(term = '') {
    const query =
      'SELECT COUNT(*) FROM books WHERE title ILIKE $1 OR author ILIKE $1'
    const values = [`%${term}%`]
    const { rows } = await handleDbError(() => db.query(query, values))
    return Number(rows[0].count)
  }

  async getCoverPath(id) {
    const { rows } = await handleDbError(() =>
      db.query('SELECT cover_path FROM books WHERE id = $1', [id]),
    )

    if (rows.length === 0) {
      throw new DatabaseError(`Book with ID ${id} not found`)
    }

    return rows[0].cover_path
  }
}

export default new BooksModel()
