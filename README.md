# Dzmitry Luzko (Dzmitry(@vilkasts)) repo

## Task 8: Home Library Service: Containerization, Docker and Database & ORM

A RESTful API for managing a personal library of Users, Artists, Albums, Tracks, and Favorites. This application is built with modularity in mind to later integrate with a database.

---

## Getting Started

1. Clone the repository.
2. Select the `feat/containerization-database-orm` branch and pull the latest changes using `git pull`
3. Create `.env` file
4. Use `npm install` to install dependencies
5. Run vulnerabilities scan `npm run audit`

---

## Running application with Docker

1. Install Docker Desktop application - [Link](https://docs.docker.com/engine/install/)
2. Run Docker Desktop application on your local machine
3. `npm run start:docker` - Run the project using Docker
4. Application is available on `localhost:4000` (list of available endpoints below)
5. Use `npm run test` to run all e2e test

---

## Usage

`npm run start` - Run the project

`npm run start:dev` - Run the project in `development` mode

`npm run start:debug` - Run the project in `debug` mode

`npm run start:prod` - Run the project in `production` mode

---

## Testing

`npm run test` - Run all tests

`npm run test:auth` - Run `auth` tests

`npm run test:refresh` - Run `refresh` tests

`npm run test:watch` - Run tests in `watch` mode

`npm run test:cov` - Run tests with coverage report

`npm run test:debug` - Run tests in `debug` mode

---

---

## Endpoints

### Users (`/user`)

- **GET /user** - Retrieve all users.
- **GET /user/:id** - Retrieve user by ID.
    - `400` if `userId` is invalid.
    - `404` if user not found.
- **POST /user** - Create a new user.
    - `201` with the created user.
    - `400` if required fields are missing.
- **PUT /user/:id** - Update user password.
    - `200` with updated user info.
    - `400` if `userId` is invalid.
    - `404` if user not found.
    - `403` if `oldPassword` is incorrect.
- **DELETE /user/:id** - Delete user by ID.
    - `204` on successful deletion.
    - `400` if `userId` is invalid.
    - `404` if user not found.

### Artists (`/artist`)

- **GET /artist** - Retrieve all artists.
- **GET /artist/:id** - Retrieve artist by ID.
    - `400` if `artistId` is invalid.
    - `404` if artist not found.
- **POST /artist** - Create a new artist.
    - `201` with the created artist.
    - `400` if required fields are missing.
- **PUT /artist/:id** - Update artist information.
    - `200` with updated artist info.
    - `400` if `artistId` is invalid.
    - `404` if artist not found.
- **DELETE /artist/:id** - Delete artist by ID.
    - `204` on successful deletion.
    - References in albums/tracks and favorites updated to `null`.
    - `400` if `artistId` is invalid.
    - `404` if artist not found.

### Albums (`/album`)

- **GET /album** - Retrieve all albums.
- **GET /album/:id** - Retrieve album by ID.
    - `400` if `albumId` is invalid.
    - `404` if album not found.
- **POST /album** - Create a new album.
    - `201` with the created album.
    - `400` if required fields are missing.
- **PUT /album/:id** - Update album information.
    - `200` with updated album info.
    - `400` if `albumId` is invalid.
    - `404` if album not found.
- **DELETE /album/:id** - Delete album by ID.
    - `204` on successful deletion.
    - References in favorites updated to `null`.
    - `400` if `albumId` is invalid.
    - `404` if album not found.

### Tracks (`/track`)

- **GET /track** - Retrieve all tracks.
- **GET /track/:id** - Retrieve track by ID.
    - `400` if `trackId` is invalid.
    - `404` if track not found.
- **POST /track** - Create a new track.
    - `201` with the created track.
    - `400` if required fields are missing.
- **PUT /track/:id** - Update track information.
    - `200` with updated track info.
    - `400` if `trackId` is invalid.
    - `404` if track not found.
- **DELETE /track/:id** - Delete track by ID.
    - `204` on successful deletion.
    - References in favorites updated to `null`.
    - `400` if `trackId` is invalid.
    - `404` if track not found.

### Favorites (`/favs`)

- **GET /favs** - Retrieve all favorites, structured by Artists, Albums, and Tracks.
- **POST /favs/track/:id** - Add a track to favorites.
    - `201` on success.
    - `400` if `trackId` is invalid.
    - `422` if track not found.
- **DELETE /favs/track/:id** - Remove a track from favorites.
    - `204` on successful removal.
    - `400` if `trackId` is invalid.
    - `404` if track is not in favorites.
- **POST /favs/album/:id** - Add an album to favorites.
    - `201` on success.
    - `400` if `albumId` is invalid.
    - `422` if album not found.
- **DELETE /favs/album/:id** - Remove an album from favorites.
    - `204` on successful removal.
    - `400` if `albumId` is invalid.
    - `404` if album is not in favorites.
- **POST /favs/artist/:id** - Add an artist to favorites.
    - `201` on success.
    - `400` if `artistId` is invalid.
    - `422` if artist not found.
- **DELETE /favs/artist/:id** - Remove an artist from favorites.
    - `204` on successful removal.
    - `400` if `artistId` is invalid.
    - `404` if artist is not in favorites.

---

## Data Models

### User
- **id**: `string` (UUID)
- **login**: `string`
- **password**: `string`
- **version**: `number` (Integer)
- **createdAt**: `number` (Timestamp)
- **updatedAt**: `number` (Timestamp)

### Artist
- **id**: `string` (UUID)
- **name**: `string`
- **grammy**: `boolean`

### Track
- **id**: `string` (UUID)
- **name**: `string`
- **artistId**: `string` (UUID) or `null`
- **albumId**: `string` (UUID) or `null`
- **duration**: `number` (Integer)

### Album
- **id**: `string` (UUID)
- **name**: `string`
- **year**: `number` (Integer)
- **artistId**: `string` (UUID) or `null`

### Favorites
- **artists**: `Array of strings (UUID)`
- **albums**: `Array of strings (UUID)`
- **tracks**: `Array of strings (UUID)`

---