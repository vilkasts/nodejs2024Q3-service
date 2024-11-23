import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiryTimeEnum } from '../../helpers/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return await this.userService.post(createUserDto);
  }

  async login(authLoginDto: CreateUserDto) {
    const user = await this.userService.validateUser(authLoginDto);

    return {
      userId: user.id,
      accessToken: await this.jwtService.signAsync(user, {
        expiresIn: TokenExpiryTimeEnum.accessToken,
      }),
      refreshToken: await this.jwtService.signAsync(user, {
        expiresIn: TokenExpiryTimeEnum.refreshToken,
      }),
    };
  }
}
