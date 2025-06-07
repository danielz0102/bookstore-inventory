import express from 'express'
import { booksRouter } from './routes/booksRouter.js'
import { genresRouter } from './routes/genresRouter.js'

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})
app.use('/books', booksRouter)
app.use('/genres', genresRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
