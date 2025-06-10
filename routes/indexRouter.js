import { Router } from 'express'
import { renderIndexPage } from '../controllers/indexController.js'

export const indexRouter = Router()

indexRouter.get('/', renderIndexPage)
