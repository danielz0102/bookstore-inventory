import { Router } from 'express'
import BooksController from '../controllers/booksController.js'

export const booksRouter = Router()

booksRouter.get('/', BooksController.renderBooksPage)
booksRouter.get('/add', BooksController.renderAddBookPage)
booksRouter.post('/add', BooksController.postBook)
booksRouter.post('/delete/:id', BooksController.delete)
booksRouter.get('/:id', BooksController.renderBookDetailPage)
