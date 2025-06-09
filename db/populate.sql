INSERT INTO
  genres (name)
VALUES
  ('Fiction'),
  ('Science Fiction'),
  ('Fantasy'),
  ('Mystery'),
  ('Non-Fiction'),
  ('Biography'),
  ('History'),
  ('Romance'),
  ('Horror'),
  ('Young Adult');

INSERT INTO
  books (
    title,
    author,
    description,
    pages,
    published_date,
    isbn
  )
VALUES
  (
    'To Kill a Mockingbird',
    'Harper Lee',
    'A novel about racial injustice in the Deep South.',
    281,
    '1960-07-11',
    '9780061120084'
  ),
  (
    '1984',
    'George Orwell',
    'A dystopian novel set in a totalitarian society.',
    328,
    '1949-06-08',
    '9780451524935'
  ),
  (
    'The Hobbit',
    'J.R.R. Tolkien',
    'A fantasy adventure preceding The Lord of the Rings.',
    310,
    '1937-09-21',
    '9780547928227'
  ),
  (
    'The Da Vinci Code',
    'Dan Brown',
    'A mystery thriller involving secret societies.',
    454,
    '2003-03-18',
    '9780307474278'
  ),
  (
    'Sapiens',
    'Yuval Noah Harari',
    'A brief history of humankind.',
    443,
    '2011-01-01',
    '9780062316097'
  ),
  (
    'Steve Jobs',
    'Walter Isaacson',
    'Biography of Steve Jobs.',
    656,
    '2011-10-24',
    '9781451648539'
  ),
  (
    'The Diary of a Young Girl',
    'Anne Frank',
    'Diary of Anne Frank during WWII.',
    283,
    '1947-06-25',
    '9780553296983'
  ),
  (
    'Pride and Prejudice',
    'Jane Austen',
    'A classic romance novel.',
    279,
    '1813-01-28',
    '9780141439518'
  ),
  (
    'Dracula',
    'Bram Stoker',
    'A horror novel introducing Count Dracula.',
    418,
    '1897-05-26',
    '9780486411095'
  ),
  (
    'The Fault in Our Stars',
    'John Green',
    'A young adult romance about two teens with cancer.',
    313,
    '2012-01-10',
    '9780525478812'
  );

INSERT INTO
  books_genres (book_id, genre_id)
VALUES
  (1, 1),
  -- To Kill a Mockingbird - Fiction
  (2, 2),
  -- 1984 - Science Fiction
  (3, 3),
  -- The Hobbit - Fantasy
  (4, 4),
  -- The Da Vinci Code - Mystery
  (5, 5),
  -- Sapiens - Non-Fiction
  (6, 6),
  -- Steve Jobs - Biography
  (7, 7),
  -- The Diary of a Young Girl - History
  (8, 8),
  -- Pride and Prejudice - Romance
  (9, 9),
  -- Dracula - Horror
  (10, 10),
  -- The Fault in Our Stars - Young Adult
  (2, 1),
  -- 1984 - Fiction
  (3, 1),
  -- The Hobbit - Fiction
  (4, 1),
  -- The Da Vinci Code - Fiction
  (9, 1);

-- Dracula - Fiction
SELECT
  *
FROM
  books;

SELECT
  *
FROM
  genres;

SELECT
  *
FROM
  books_genres;