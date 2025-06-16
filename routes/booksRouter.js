import { Router } from 'express'

import { validateBook } from '../lib/validations/bookValidation.js'
import { coverUpload } from '../lib/middlewares/coverUpload.js'
import { checkPassword } from '../lib/middlewares/checkPassword.js'
import BooksController from '../controllers/booksController.js'

export const booksRouter = Router()

booksRouter.get('/', BooksController.renderBooksPage)
booksRouter.post('/add', coverUpload, validateBook, BooksController.add)
booksRouter.post('/delete/:id', BooksController.delete)
booksRouter.get('/:id', BooksController.renderBookDetailPage)
booksRouter.post(
  '/update/:id',
  coverUpload,
  validateBook,
  checkPassword,
  BooksController.update,
)
