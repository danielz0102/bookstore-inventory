import asyncHandler from 'express-async-handler'

import BooksModel from '../models/booksModel.js'
import GenresModel from '../models/genresModel.js'
import { NotFoundError } from '../lib/errors/NotFoundError.js'
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
    res.render('books/pages/index', {
      title: 'Books',
      books,
      fallback,
      search,
      page,
      totalPages,
      totalBooks,
    })
  })

  renderAddBookPage = asyncHandler(async (req, res) => {
    const genres = await GenresModel.getPage(10)
    res.render('books/pages/add', { title: 'Add a new book', genres })
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

    const genres = await GenresModel.getByBookId(book.id)
    const genresNames = genres.map((genre) => genre.name)
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
      },
      genres: genresNames,
    })
  })

  delete = asyncHandler(async (req, res) => {
    const bookId = Number(req.params.id)
    await BooksModel.delete(bookId)
    res.redirect('/books')
  })

  updateBook = asyncHandler(async (req, res) => {
    const bookId = Number(req.params.id)
    console.log(req.body)
    res.redirect(`/books/${bookId}`)
  })
}

export default new BooksController()
