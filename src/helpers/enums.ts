enum MessagesEnum {
  AlreadyAdded = 'Already added',
  AlbumNotFound = "Album with this identifier ({{id}}) doesn't exist",
  ArtistNotFound = "Artist with this identifier ({{id}}) doesn't exist",
  InvalidOldPassword = 'Incorrect old password',
  InvalidPassword = 'Incorrect password',
  InvalidToken = 'Refresh token is invalid or expired',
  NotAuthorized = 'Not authorized',
  NotFound = "An entity with this identifier doesn't exist",
  NoToken = 'No refreshToken in request body',
  SuccessfullyAdded = 'Successfully added',
  TrackNotFound = "Track with this identifier ({{id}}) doesn't exist",
  UserAlreadyExists = 'User with the same login already exists',
  UsernameNotFound = "User with this username ({{username}}) doesn't exist",
  UserNotFound = "User with this identifier ({{id}}) doesn't exist",
}

enum TokenExpiryTimeEnum {
  accessToken = '15m',
  refreshToken = '1h',
}

export { MessagesEnum, TokenExpiryTimeEnum };
