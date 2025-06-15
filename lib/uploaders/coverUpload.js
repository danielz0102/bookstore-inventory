import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
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
