class BooksController {
  renderBooksPage(req, res) {
    res.render('books')
  }
}

export default new BooksController()
