import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { MessagesEnum } from '../../helpers/enums';

@Injectable()
class AuthCheckService implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: any, _: any, next: () => void) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(MessagesEnum.NotAuthorized);
    }

    const token = authHeader.split(' ')[1];
    try {
      req.user = this.jwtService.verify(token);
      next();
    } catch {
      throw new UnauthorizedException(MessagesEnum.InvalidToken);
    }
  }
}

export { AuthCheckService };
