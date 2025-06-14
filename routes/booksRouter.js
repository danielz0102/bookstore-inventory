import { Router } from 'express'
import { validateBook } from '../lib/validations/bookValidation.js'
import BooksController from '../controllers/booksController.js'

export const booksRouter = Router()

booksRouter.get('/', BooksController.renderBooksPage)
booksRouter.get('/add', BooksController.renderAddBookPage)
booksRouter.post('/delete/:id', BooksController.delete)
booksRouter.get('/:id', BooksController.renderBookDetailPage)
booksRouter.post('/update/:id', validateBook, BooksController.updateBook)
