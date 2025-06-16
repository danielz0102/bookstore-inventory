import asyncHandler from 'express-async-handler'
import { validationResult, matchedData } from 'express-validator'

import BooksModel from '../models/booksModel.js'
import GenresModel from '../models/genresModel.js'
import { NotFoundError } from '../lib/errors/NotFoundError.js'
import { ClientError } from '../lib/errors/ClientError.js'
import { booksFallbackOptions } from './lib/constants/booksFallbackOptions.js'
import { getBookCard } from './lib/mappers/getBookCard.js'

class BooksController {
  renderBooksPage = asyncHandler(async (req, res) => {
    const search = req.query.search ?? ''
    const page = Number(req.query.page) || 1
    const limit = 18
    const [modelBooks, totalBooks] = await Promise.all([
      BooksModel.searchByTitleOrAuthor(search, limit, page),
      BooksModel.countByTitleOrAuthor(search),
    ])
    const books = modelBooks.map(getBookCard)
    const dbIsEmpty = modelBooks.length === 0 && search === ''
    const fallback = dbIsEmpty
      ? booksFallbackOptions
      : {
          ...booksFallbackOptions,
          description: 'No books found',
        }
    const totalPages = Math.ceil(totalBooks / limit)

    const allGenres = await GenresModel.getAll()
    const allGenresNames = allGenres.map((genre) => genre.name)

    res.render('books/pages/index', {
      title: 'Books',
      books,
      fallback,
      search,
      page,
      allGenres: allGenresNames,
      totalPages,
      totalBooks,
    })
  })

  renderBookDetailPage = asyncHandler(async (req, res) => {
    const bookId = Number(req.params.id)
    const book = await BooksModel.getById(bookId)

    if (!book) {
      throw new NotFoundError(
        `Book with ID ${bookId} not found`,
        'Book not found',
      )
    }

    const bookGenres = await GenresModel.getByBookId(book.id)
    const bookGenresNames = bookGenres.map((genre) => genre.name)

    const allGenres = await GenresModel.getAll()
    const allGenresNames = allGenres.map((genre) => genre.name)

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    res.render('books/pages/detail', {
      title: book.title,
      book: {
        ...book,
        publishedDate: formatDate(book.published_date),
        genres: bookGenresNames,
      },
      allGenres: allGenresNames,
    })
  })

  add = asyncHandler(async (req, res) => {
    const errors = validationResult(req).array()

    if (errors.length > 0) {
      console.error({ errors })
      throw new ClientError('Validation error', 'Form data is invalid')
    }

    const data = matchedData(req)
    const coverPath = req.file
      ? `/uploads/bookCovers/${req.file.filename}`
      : null

    const bookId = await BooksModel.add({
      ...data,
      coverPath,
    })

    res.redirect(`/books/${bookId}`)
  })

  delete = asyncHandler(async (req, res) => {
    const bookId = Number(req.params.id)
    await BooksModel.delete(bookId)
    res.redirect('/books')
  })

  update = asyncHandler(async (req, res) => {
    const errors = validationResult(req).array()

    if (errors.length > 0) {
      console.error({ errors })
      throw new ClientError('Validation error', 'Form data is invalid')
    }

    const bookId = Number(req.params.id)
    const data = matchedData(req)
    const coverPath = req.file
      ? `/uploads/bookCovers/${req.file.filename}`
      : null

    await BooksModel.update(bookId, {
      ...data,
      coverPath,
    })

    res.redirect(`/books/${bookId}`)
  })
}

export default new BooksController()
