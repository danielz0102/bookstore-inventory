export function render404(req, res) {
  res.status(404).render('errors/404', {
    title: 'Page Not Found',
  })
}
