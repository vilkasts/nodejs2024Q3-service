enum MessagesEnum {
  InvalidOldPassword = 'Incorrect old password',
  InvalidPassword = 'Incorrect password',
  ArtistNotFound = "Artist with this identifier ({{id}}) doesn't exist",
  AlbumNotFound = "Album with this identifier ({{id}}) doesn't exist",
  TrackNotFound = "Track with this identifier ({{id}}) doesn't exist",
  UserNotFound = "User with this identifier ({{id}}) doesn't exist",
  UsernameNotFound = "User with this username ({{username}}) doesn't exist",
  NotFound = "An entity with this identifier doesn't exist",
  SuccessfullyAdded = 'Successfully added',
  UserAlreadyExists = 'User with the same login already exists',
  InvalidToken = 'Refresh token is invalid or expired',
  NoToken = 'No refreshToken in request body',
  NotAuthorized = 'Not authorized',
  AlreadyAdded = 'Already added',
}

enum TokenExpiryTimeEnum {
  accessToken = '15m',
  refreshToken = '1h',
}

export { MessagesEnum, TokenExpiryTimeEnum };
