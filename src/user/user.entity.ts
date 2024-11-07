import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';

import {
  CreateUserDtoInterface,
  UpdatePasswordDtoInterface,
  UserInterface,
} from './user.model';

class UserEntity implements UserInterface {
  constructor(login: string, password: string) {
    this.id = v4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
  }

  @IsUUID(4)
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @Exclude()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  version: number;

  @IsNumber()
  createdAt: number;

  @IsNumber()
  updatedAt: number;
}

export class CreateUserDto implements CreateUserDtoInterface {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements UpdatePasswordDtoInterface
{
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export { UserEntity };
