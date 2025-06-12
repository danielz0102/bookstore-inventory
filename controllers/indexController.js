import asyncHandler from 'express-async-handler'
import BooksModel from '../models/booksModel.js'
import { booksFallbackOptions } from './lib/constants/booksFallbackOptions.js'
import { getBookCard } from './lib/mappers/getBookCard.js'

export const renderIndexPage = asyncHandler(async (req, res) => {
  const lastBooks = await BooksModel.getLast(9)
  const lastBooksMapped = lastBooks.map(getBookCard)

  res.render('index', {
    title: 'Bookstore inventory',
    section: 'Last books added',
    books: lastBooksMapped,
    fallback: booksFallbackOptions,
    stylesheet: 'index.css',
  })
})
