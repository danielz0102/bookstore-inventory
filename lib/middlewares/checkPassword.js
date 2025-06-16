import asyncHandler from 'express-async-handler'
import { AuthenticationError } from '../errors/AuthenticationError.js'

export const checkPassword = asyncHandler((req, res, next) => {
  const { password } = req.body

  if (password !== process.env.SECRET) {
    throw new AuthenticationError('Invalid password provided')
  }

  delete req.body.password
  next()
})
