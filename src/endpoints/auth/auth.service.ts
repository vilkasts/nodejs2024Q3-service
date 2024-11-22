import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(createUserDto: CreateUserDto) {
    return await this.userService.post(createUserDto);
  }
}
