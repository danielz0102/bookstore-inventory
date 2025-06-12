export function getBookCard(book) {
  return {
    id: book.id,
    imgSrc: book.cover_path,
    title: book.title,
    author: book.author,
  }
}
