export function handle404(req, res) {
  res.status(404).render('errors/index', {
    title: '404 - Page Not Found',
    error: 'The page you are looking for does not exist.',
  })
}
