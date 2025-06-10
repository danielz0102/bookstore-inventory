import fs from 'node:fs/promises'
import asyncHandler from 'express-async-handler'
import BooksModel from '../models/booksModel.js'

export const renderIndexPage = asyncHandler(async (req, res) => {
  const lastBooks = await BooksModel.getLast(9)

  const lastBooksMapped = await Promise.all(
    lastBooks.map(async (book) => {
      const imgSrc = await fs.readFile(`uploads/${book.cover_path}`, {
        encoding: 'base64',
      })

      return {
        id: book.id,
        imgSrc,
        title: book.title,
        author: book.author,
      }
    }),
  )

  res.render('index', {
    title: 'Bookstore inventory',
    section: 'Last books added',
    books: lastBooksMapped,
    fallback: {
      description: 'There are no books yet',
      link: {
        href: '/books/add',
        call: 'Add a new book here',
      },
    },
  })
})
