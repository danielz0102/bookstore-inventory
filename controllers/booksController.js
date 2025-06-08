import BooksModel from '../models/booksModel.js'
import asyncHandler from 'express-async-handler'

class BooksController {
  renderBooksPage = asyncHandler(async (req, res) => {
    const books = await BooksModel.getAll()
    res.render('books', { books })
  })

  renderAddBookPage = asyncHandler(async (req, res) => {
    res.render('addBook')
  })

  postBook = asyncHandler(async (req, res) => {
    const book = req.body
    await BooksModel.addBook(book)
    res.redirect('/books')
  })
}

export default new BooksController()
