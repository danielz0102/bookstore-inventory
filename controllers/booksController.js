import BooksModel from '../models/booksModel.js'
import asyncHandler from 'express-async-handler'

class BooksController {
  renderBooksPage = asyncHandler(async (req, res) => {
    const books = await BooksModel.getAll()
    res.render('books', { books })
  })
}

export default new BooksController()
