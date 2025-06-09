import GenresModel from '../models/genresModel.js'
import asyncHandler from 'express-async-handler'
import { NotFoundError } from '../errors/NotFoundError.js'

class GenresController {
  renderGenresPage = asyncHandler(async (req, res) => {
    const genres = await GenresModel.getAll()
    res.render('genres/index', { title: 'Genres', genres })
  })

  renderAddGenrePage = asyncHandler(async (req, res) => {
    res.render('genres/add', { title: 'Add a new genre' })
  })

  postGenre = asyncHandler(async (req, res) => {
    const { name } = req.body
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

    res.render('genres/detail', { title: genre.name, genre })
  })

  delete = asyncHandler(async (req, res) => {
    const id = Number(req.params.id)
    await GenresModel.delete(id)
    res.redirect('/genres')
  })
}

export default new GenresController()
