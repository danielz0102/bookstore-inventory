import BooksModel from '../models/booksModel.js'
import GenresModel from '../models/genresModel.js'
import asyncHandler from 'express-async-handler'
import { NotFoundError } from '../errors/NotFoundError.js'
import { validateBook } from '../validations/bookValidation.js'
import { validationResult, matchedData } from 'express-validator'

class BooksController {
  renderBooksPage = asyncHandler(async (req, res) => {
    const books = await BooksModel.getAll()
    res.render('books', { books })
  })

  renderAddBookPage = asyncHandler(async (req, res) => {
    const genres = await GenresModel.getPage(10)
    res.render('addBook', { genres })
  })

  postBook = [
    validateBook,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const genres = await GenresModel.getPage(10)

        return res.render('addBook', {
          errors: errors.array(),
          oldData: req.body,
          genres,
        })
      }

      const book = matchedData(req)
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
        pages: book.pages,
        publishedDate: book.publishedDate,
        isbn: book.isbn,
        genresIds,
      }

      await BooksModel.add(modelBook)
      res.redirect('/books')
    }),
  ]

  renderBookDetailPage = asyncHandler(async (req, res) => {
    const bookId = Number(req.params.id)
    const book = await BooksModel.getById(bookId)

    if (book === false) {
      throw new NotFoundError(
        `Book with ID ${bookId} not found`,
        'Book not found',
      )
    }

    const genres = await GenresModel.getByBookId(book.id)

    res.render('bookDetail', { book, genres })
  })

  delete = asyncHandler(async (req, res) => {
    const bookId = Number(req.params.id)
    await BooksModel.delete(bookId)
    res.redirect('/books')
  })
}

export default new BooksController()
