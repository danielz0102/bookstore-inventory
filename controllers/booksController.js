import BooksModel from '../models/booksModel.js'
import GenresModel from '../models/genresModel.js'
import asyncHandler from 'express-async-handler'

class BooksController {
  renderBooksPage = asyncHandler(async (req, res) => {
    const books = await BooksModel.getAll()
    res.render('books', { books })
  })

  renderAddBookPage = asyncHandler(async (req, res) => {
    const genres = await GenresModel.getPage(10)
    res.render('addBook', { genres })
  })

  postBook = asyncHandler(async (req, res) => {
    const book = req.body
    let genresIds = []

    // If just one genre was sent
    if (typeof book.genres === 'string') {
      genresIds.push(Number(book.genres))
    } else if (Array.isArray(book.genres)) {
      genresIds = book.genres.map(Number)
    }

    const modelBook = {
      title: book.title,
      author: book.author,
      description: book.description,
      pages: Number(book.pages),
      publishedDate: book.publishedDate,
      genresIds,
    }

    await BooksModel.add(modelBook)
    res.redirect('/books')
  })
}

export default new BooksController()
