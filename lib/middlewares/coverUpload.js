import multer from 'multer'
import { ClientError } from '../errors/ClientError.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(
        new ClientError(
          'Invalid file type',
          'Please upload a valid image file.',
          400,
        ),
      )
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      return cb(
        new ClientError(
          'File too large',
          'Please upload an image smaller than 5MB.',
          400,
        ),
      )
    }

    cb(null, 'public/uploads/bookCovers/')
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop()
    cb(null, `${crypto.randomUUID()}.${fileExtension}`)
  },
})

export const coverUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
}).single('cover')
