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

//eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  const statusCode = err.statusCode || 500
  const msg = statusCode === 500 ? 'Internal Error' : err.message
  res.status(statusCode || 500).render('error', { error: msg })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
