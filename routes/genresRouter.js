import { Router } from 'express'
import GenresController from '../controllers/genresController.js'
import { validateGenre } from '../lib/validations/genreValidation.js'
import { checkPassword } from '../lib/middlewares/checkPassword.js'

export const genresRouter = Router()

genresRouter.get('/', GenresController.renderGenresPage)
genresRouter.post('/add', validateGenre(['body']), GenresController.add)
genresRouter.post('/delete/:id', checkPassword, GenresController.delete)
genresRouter.get('/:id', GenresController.renderGenreDetailPage)
