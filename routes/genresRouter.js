import { Router } from 'express'
import GenresController from '../controllers/genresController.js'

export const genresRouter = Router()

genresRouter.get('/', GenresController.renderGenresPage)
