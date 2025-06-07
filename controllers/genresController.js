import GenresModel from '../models/genresModel.js'
import asyncHandler from 'express-async-handler'

class GenresController {
  renderGenresPage = asyncHandler(async (req, res) => {
    const genres = await GenresModel.getAll()
    res.render('genres', { genres })
  })
}

export default new GenresController()
