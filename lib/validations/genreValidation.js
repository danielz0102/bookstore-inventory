import { checkSchema } from 'express-validator'

export const validateGenre = (defaultLocations) =>
  checkSchema(
    {
      name: {
        trim: true,
        notEmpty: true,
        isLength: {
          options: { max: 255 },
          errorMessage: 'Name must be at most 255 characters long',
        },
      },
    },
    defaultLocations,
  )
