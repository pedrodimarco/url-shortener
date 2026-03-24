# url-shortener

A simple URL shortener service built with Node.js, Express, and MongoDB.

## Features

- Shorten long URLs into compact links
- Redirect to original URLs
- Track click counts
- RESTful API

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd url-shortener
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=3001
   BASE=http://localhost:3001
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The server will run on `http://localhost:3001` (or the port specified in `.env`).

## API Endpoints

### Shorten a URL
- **POST** `/api/short`
- **Body**: `{ "origUrl": "https://example.com" }`
- **Response**: JSON object with the shortened URL details

### Redirect to Original URL
- **GET** `/api/:urlId`
- Redirects to the original URL and increments click count

### Get All URLs (Admin)
- **GET** `/api/`
- **Response**: JSON array of all shortened URLs

## Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- nanoid (for generating short IDs)
- CORS
- Morgan (logging)
- dotenv