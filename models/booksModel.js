import db from '../db/pool.js'
import { handleDbError } from '../errors/DatabaseError.js'

class BooksModel {
  async getAll() {
    const { rows } = await handleDbError(() => db.query('SELECT * FROM books'))
    return rows
  }

  async addBook(book) {
    const { title, author, description, image, pages, publishedDate } = book
    const query =
      'INSERT INTO books (title, author, description, image, pages, published_date) VALUES ($1, $2, $3, $4, $5, $6)'
    const values = [title, author, description, image, pages, publishedDate]

    const result = await handleDbError(() => db.query(query, values))
    return result
  }
}

export default new BooksModel()
