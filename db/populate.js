import { Client } from 'pg'

const SQL = `
DROP TABLE IF EXISTS books_genres;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS books;

CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  author VARCHAR (255) NOT NULL,
  title VARCHAR (255) NOT NULL,
  description VARCHAR (255) NOT NULL,
  pages INTEGER NOT NULL,
  published_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS books_genres (
  book_id INTEGER NOT NULL REFERENCES books (id) ON DELETE CASCADE,
  genre_id INTEGER NOT NULL REFERENCES genres (id) ON DELETE CASCADE,
  PRIMARY KEY (book_id, genre_id)
);
`

async function main() {
  console.log('seeding...')
  const client = new Client({
    connectionString: process.argv[2],
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log('done')
}

main()
