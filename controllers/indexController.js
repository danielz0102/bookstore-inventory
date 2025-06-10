import asyncHandler from 'express-async-handler'
import BooksModel from '../models/booksModel.js'

export const renderIndexPage = asyncHandler(async (req, res) => {
  const lastBooks = await BooksModel.getLast(9)

  const lastBooksMapped = lastBooks.map((book) => ({
    id: book.id,
    imgSrc: book.cover_path,
    title: book.title,
    author: book.author,
  }))

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
