interface UserInterface {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

interface CreateUserDtoInterface {
  login: string;
  password: string;
}

interface UpdatePasswordDtoInterface {
  oldPassword: string;
  newPassword: string;
}

export type {
  CreateUserDtoInterface,
  UpdatePasswordDtoInterface,
  UserInterface,
};
