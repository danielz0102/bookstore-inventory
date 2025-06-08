import { Router } from 'express'
import BooksController from '../controllers/booksController.js'

export const booksRouter = Router()

booksRouter.get('/', BooksController.renderBooksPage)
booksRouter.post('/add', BooksController.postBook)
