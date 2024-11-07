enum UserMessagesEnum {
  NotFound = 'User not found',
  NoRequiredFields = "Request body doesn't contain required fields",
  AlreadyExists = 'User with the same login already exists',
  InvalidPassword = 'Previous password is incorrect',
}

export { UserMessagesEnum };
