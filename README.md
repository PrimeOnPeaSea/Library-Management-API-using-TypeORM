# Library Management System API

## Setup Instructions

1. Clone the repository:

   ```bash
      git clone https://github.com/PrimeOnPeaSea/ts-api.git
   ```

2. Install dependencies:

   ```bash
      npm i
   ```

3. Update `data-source.ts` file to connect to Postgres SQL server.

4. Run simply the Server:

   ```bash
      npm start
   ```

   or to run in development environment:

   ```bash
      npm run nodemon
   ```

5. Use PostMan or similar Applications to the API.

## API Endpoints

### Books

- **POST** `/books` – Add a new book { "title": book_title, "published_date": book_published_date, "genre": book_genre, "author": book_author_id }
- **GET** `/books` – Get the list of all books
- **PUT** `/books/:id` – Edit a book’s information
- **DELETE** `/books/:id` – Delete a book (only if not rented)

### Authors

- **POST** `/authors` – Add a new author { "name": author_name, "birthdate": author_date, "country": author_country }
- **GET** `/authors` – Get the list of all authors
- **PUT** `/authors/:id` – Edit an author's details
- **DELETE** `/authors/:id` – Delete an author (only if no books)

### Rentals

- **POST** `/rentals` – Rent a book {book: book_id, user: renter_name}
- **PUT** `/rentals/:id/return` – Mark a rental as returned
- **GET** `/rentals` – Get the list of all rentals (active and completed)
- **DELETE** `/rentals/:id` - Delete a Rental Record

### Custom Query

- **GET** `/rental-books?startDate=yyyy-mm-dd&endDate=yyyy-mm-dd` – Fetch rentals within a date range

## Technologies Used

- **Node.js**
- **TypeORM**
- **PostgreSQL**
- **Express**
- **TypeScript**
