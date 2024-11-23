import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MessagesEnum, TokenExpiryTimeEnum } from '../../helpers/enums';

@Injectable()
class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return await this.userService.post(createUserDto);
  }

  async login(authLoginDto: CreateUserDto, isHashedPassword = false) {
    const user = await this.userService.validateUser(
      authLoginDto,
      isHashedPassword ?? false,
    );

    return {
      userId: user.id,
      accessToken: await this.jwtService.signAsync(
        {
          login: user.login,
          userId: user.id,
          password: user.password,
        },
        {
          expiresIn: TokenExpiryTimeEnum.accessToken,
        },
      ),
      refreshToken: await this.jwtService.signAsync(
        {
          login: user.login,
          userId: user.id,
          password: user.password,
        },
        {
          expiresIn: TokenExpiryTimeEnum.refreshToken,
        },
      ),
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException(MessagesEnum.NoToken);
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      return this.login(
        { login: payload.login, password: payload.password },
        true,
      );
    } catch {
      throw new ForbiddenException(MessagesEnum.InvalidToken);
    }
  }
}

export { AuthService };
