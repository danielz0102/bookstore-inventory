import { Router } from 'express'
import GenresController from '../controllers/genresController.js'

export const genresRouter = Router()

genresRouter.get('/', GenresController.renderGenresPage)
genresRouter.get('/add', GenresController.renderAddGenrePage)
genresRouter.post('/add', GenresController.postGenre)
genresRouter.post('/delete/:id', GenresController.delete)
genresRouter.get('/:id', GenresController.renderGenreDetailPage)
