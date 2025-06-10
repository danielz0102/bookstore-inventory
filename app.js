import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import { booksRouter } from './routes/booksRouter.js'
import { genresRouter } from './routes/genresRouter.js'
import { indexRouter } from './routes/indexRouter.js'

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(expressLayouts)
app.set('layout', 'layouts/main')

app.use('/', indexRouter)
app.use('/books', booksRouter)
app.use('/genres', genresRouter)

app.use((req, res) => {
  res.status(404).render('errors/404', {
    title: 'Page Not Found',
  })
})

//eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).render('errors/index', {
    title: 'Error',
    error: err.friendlyMessage || 'An unexpected error occurred',
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
