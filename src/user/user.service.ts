import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import database from '../database/database';
import { MessagesEnum } from '../helpers/enums';
import { CreateUserDto, UpdateUserDto, UserEntity } from './user.entity';

@Injectable()
class UserService {
  get() {
    return database.usersData;
  }

  getById(id: string) {
    const user = database.usersData.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(MessagesEnum.NotFound);
    }

    return user;
  }

  post(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException(MessagesEnum.NoRequiredFields);
    }

    const isAlreadyExist = database.usersData.find(
      (user) => user.login === createUserDto.login,
    );

    if (isAlreadyExist) {
      throw new ForbiddenException(MessagesEnum.AlreadyExists);
    }

    const user = new UserEntity(createUserDto.login, createUserDto.password);
    database.usersData.push(user);

    return user;
  }

  put(id: string, updateUserDto: UpdateUserDto) {
    const user = this.getById(id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException(MessagesEnum.InvalidPassword);
    }

    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version = user.version + 1;

    return user;
  }

  delete(id: string) {
    const index = database.usersData.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(MessagesEnum.NotFound);
    }

    database.usersData.splice(index, 1);
  }
}

export { UserService };
