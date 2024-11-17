enum MessagesEnum {
  InvalidPassword = 'Incorrect old password',
  ArtistNotFound = "Artist with this identifier ({{id}}) doesn't exist",
  AlbumNotFound = "Album with this identifier ({{id}}) doesn't exist",
  TrackNotFound = "Track with this identifier ({{id}}) doesn't exist",
  UserNotFound = "User with this identifier ({{id}}) doesn't exist",
  NotFound = "An entity with this identifier doesn't exist",
  SuccessfullyAdded = 'Successfully added',
  UserAlreadyExists = 'User with the same login already exists',
}

export { MessagesEnum };
