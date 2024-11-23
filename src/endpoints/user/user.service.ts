import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { MessagesEnum } from '../../helpers/enums';
import { CreateUserDto, UpdateUserDto, UserEntity } from './user.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { hashPassword, validatePassword } from '../../helpers/helpers';

@Injectable()
class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getById(id: string, withPassword = false) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
        password: withPassword,
      },
    });

    if (!user) {
      throw new NotFoundException(
        MessagesEnum.UserNotFound.replace('{{id}}', id),
      );
    }

    return user;
  }

  async validateUser({ login, password }: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { login: login },
    });

    if (!user) {
      throw new NotFoundException(
        MessagesEnum.UsernameNotFound.replace('{{username}}', login),
      );
    }

    if (!(await validatePassword(password, user.password))) {
      throw new ForbiddenException(MessagesEnum.InvalidPassword);
    }

    return user;
  }

  async post(createUserDto: CreateUserDto) {
    const users = await this.get();
    const isAlreadyExist = users.find(
      (user) => user.login === createUserDto.login,
    );

    if (isAlreadyExist) {
      throw new ForbiddenException(MessagesEnum.UserAlreadyExists);
    }

    const user = new UserEntity(
      createUserDto.login,
      await hashPassword(createUserDto.password),
    );

    await this.prisma.user.create({
      data: {
        ...user,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    });

    return user;
  }

  async put(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getById(id, true);

    if (!user) {
      return;
    }

    if (!(await validatePassword(updateUserDto.oldPassword, user.password))) {
      throw new ForbiddenException(MessagesEnum.InvalidOldPassword);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        password: await hashPassword(updateUserDto.newPassword),
        updatedAt: Date.now(),
        version: user.version + 1,
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: string) {
    const user = await this.getById(id);

    if (!user) {
      return;
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }
}

export { UserService };
