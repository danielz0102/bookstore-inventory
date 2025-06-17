import { validationResult, matchedData } from 'express-validator'
import asyncHandler from 'express-async-handler'

import GenresModel from '../models/genresModel.js'
import { NotFoundError } from '../lib/errors/NotFoundError.js'
import { ClientError } from '../lib/errors/ClientError.js'
import { getBookCard } from './lib/mappers/getBookCard.js'

class GenresController {
  renderGenresPage = asyncHandler(async (req, res) => {
    const genres = await GenresModel.getAll()
    res.render('genres/pages/index', { title: 'Genres', genres })
  })

  add = asyncHandler(async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      throw new ClientError(errors.array(), 'Genre form data is invalid')
    }

    const data = matchedData(req, { locations: ['body'] })
    const { name } = data
    const id = await GenresModel.create(name)
    res.redirect(`/genres/${id}`)
  })

  renderGenreDetailPage = asyncHandler(async (req, res) => {
    const { id } = req.params
    const genre = await GenresModel.getById(id)

    if (genre === false) {
      throw new NotFoundError(
        `Genre with id ${id} not found`,
        'Genre not found',
      )
    }

    const books = await GenresModel.getBooks(genre.id)
    genre.books = books.map(getBookCard)

    res.render('genres/pages/detail', { title: genre.name, genre })
  })

  delete = asyncHandler(async (req, res) => {
    const id = Number(req.params.id)
    await GenresModel.delete(id)
    res.redirect('/genres')
  })

  update = asyncHandler(async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      throw new ClientError(errors.array(), 'Genre form data is invalid')
    }

    const data = matchedData(req, { locations: ['body'] })
    const id = Number(req.params.id)
    const { name } = data

    await GenresModel.update(id, name)
    res.redirect(`/genres/${id}`)
  })
}

export default new GenresController()
