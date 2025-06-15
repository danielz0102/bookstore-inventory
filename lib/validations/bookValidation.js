import { body } from 'express-validator'

const REQUIRED_MESSAGE = 'is required'

export const validateBook = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage(`Title ${REQUIRED_MESSAGE}`)
    .isLength({ max: 255 })
    .withMessage('Title must be at most 255 characters long'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage(`Author ${REQUIRED_MESSAGE}`)
    .isLength({ max: 255 })
    .withMessage('Author must be at most 255 characters long'),
  body('description').optional({ values: 'falsy' }).trim().isString(),
  body('pages')
    .trim()
    .notEmpty()
    .withMessage(`Number of pages ${REQUIRED_MESSAGE}`)
    .isInt({ min: 1, max: 9999 })
    .withMessage('Pages must be a positive integer')
    .toInt(),
  body('publishedDate')
    .trim()
    .notEmpty()
    .withMessage(`Published date ${REQUIRED_MESSAGE}`)
    .isDate()
    .withMessage('Published date must be a valid date'),
  body('isbn')
    .trim()
    .optional({ values: 'falsy' })
    .trim()
    .isISBN()
    .withMessage('ISBN must be a valid ISBN number'),
  body('genres')
    .optional()
    .custom((value) => {
      return typeof value === 'string' || Array.isArray(value)
    })
    .withMessage('Genres must be a string or an array of strings'),
]
