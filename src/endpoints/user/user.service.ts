import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { MessagesEnum } from '../../helpers/enums';
import { CreateUserDto, UpdateUserDto, UserEntity } from './user.entity';
import database from '../../database/database';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    return this.prisma.user.findMany();
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(MessagesEnum.NotFound);
    }

    return user;
  }

  post(createUserDto: CreateUserDto) {
    const isAlreadyExist = database.usersData.find(
      (user) => user.login === createUserDto.login,
    );

    if (isAlreadyExist) {
      throw new ForbiddenException(MessagesEnum.UserAlreadyExists);
    }

    const user = new UserEntity(createUserDto.login, createUserDto.password);
    database.usersData.push(user);

    return user;
  }

  async put(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getById(id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException(MessagesEnum.InvalidPassword);
    }

    user.password = updateUserDto.newPassword;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
