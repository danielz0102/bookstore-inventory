//eslint-disable-next-line no-unused-vars
export function handleError(err, req, res, next) {
  console.error(err)
  const statusCode = err.statusCode || 500

  res.status(statusCode).render('error', {
    title: `Error ${statusCode}`,
    error: err.friendlyMessage || 'An unexpected error occurred',
    stylesheet: 'error.css',
  })
}
