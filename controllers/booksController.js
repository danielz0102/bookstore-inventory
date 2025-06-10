import multer from 'multer'
import { validationResult, matchedData } from 'express-validator'
import asyncHandler from 'express-async-handler'

import BooksModel from '../models/booksModel.js'
import GenresModel from '../models/genresModel.js'
import { NotFoundError } from '../lib/errors/NotFoundError.js'
import { validateBook } from '../lib/validations/bookValidation.js'

const upload = multer({ dest: 'public/uploads/bookCovers/' })

class BooksController {
  renderBooksPage = asyncHandler(async (req, res) => {
    const books = await BooksModel.getAll()
    res.render('books/index', { title: 'Books', books })
  })

  renderAddBookPage = asyncHandler(async (req, res) => {
    const genres = await GenresModel.getPage(10)
    res.render('books/add', { title: 'Add a new book', genres })
  })

  postBook = [
    upload.single('coverImg'),
    validateBook,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const genres = await GenresModel.getPage(10)

        return res.render('books/add', {
          title: 'Add a new book',
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
        coverPath: req.file
          ? `bookCovers/${req.file.filename}`
          : 'initial/placeholder.webp',
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

    console.log({ path: book.cover_path })

    res.render('books/detail', {
      title: book.name,
      book,
      genres,
    })
  })

  delete = asyncHandler(async (req, res) => {
    const bookId = Number(req.params.id)
    await BooksModel.delete(bookId)
    res.redirect('/books')
  })

  renderUpdatePage = asyncHandler(async (req, res) => {
    const bookId = Number(req.params.id)
    const book = await BooksModel.getById(bookId)

    if (book === false) {
      throw new NotFoundError(
        `Book with ID ${bookId} not found`,
        'Book not found',
      )
    }

    const genres = await GenresModel.getPage(10)
    res.render('books/update', { title: 'Update book', book, genres })
  })

  updateBook = [
    validateBook,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const bookId = Number(req.params.id)
        const book = await BooksModel.getById(bookId)
        const genres = await GenresModel.getPage(10)

        return res.render('books/update', {
          title: 'Update book',
          errors: errors.array(),
          book,
          genres,
        })
      }

      const bookId = Number(req.params.id)
      const book = matchedData(req)

      await BooksModel.update(bookId, book)
      res.redirect(`/books/${bookId}`)
    }),
  ]
}

export default new BooksController()
