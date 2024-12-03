import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

import { MessagesEnum } from '../../helpers/enums';

@Injectable()
export class AuthCheck extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const testRefreshToken = await this.jwtService.signAsync({});
    let authHeader = req.headers.authorization;

    if (req.url === '/auth/refresh') {
      authHeader = `Bearer ${testRefreshToken}`;
    }

    if (
      req.url === '/' ||
      req.url.startsWith('/auth/signup') ||
      req.url.startsWith('/auth/login') ||
      req.url.startsWith('/doc')
    ) {
      return true;
    }

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(MessagesEnum.NotAuthorized);
    }

    try {
      const token = authHeader.split(' ')[1];
      req.user = await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException(MessagesEnum.InvalidToken);
    }
    return true;
  }
}
