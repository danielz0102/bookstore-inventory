import GenresModel from '../models/genresModel.js'
import asyncHandler from 'express-async-handler'

class GenresController {
  renderGenresPage = asyncHandler(async (req, res) => {
    const genres = await GenresModel.getAll()
    res.render('genres', { genres })
  })

  renderAddGenrePage = asyncHandler(async (req, res) => {
    res.render('addGenre')
  })

  postGenre = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
      return res.status(400).send('Genre name is required')
    }

    const id = await GenresModel.create(name)
    res.redirect(`/genres/${id}`)
  })

  renderGenreDetailPage = asyncHandler(async (req, res) => {
    const { id } = req.params
    const genre = await GenresModel.getById(id)
    res.render('genreDetail', { genre })
  })
}

export default new GenresController()
