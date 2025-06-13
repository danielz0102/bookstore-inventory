import express from 'express'
import { booksRouter } from './routes/booksRouter.js'
import { genresRouter } from './routes/genresRouter.js'
import { indexRouter } from './routes/indexRouter.js'
import { handle404 } from './lib/middlewares/render404.js'
import { handleError } from './lib/middlewares/handleError.js'

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/', indexRouter)
app.use('/books', booksRouter)
app.use('/genres', genresRouter)
app.use(handle404, handleError)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
