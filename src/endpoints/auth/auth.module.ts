import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { TokenExpiryTimeEnum } from '../../helpers/enums';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: TokenExpiryTimeEnum.accessToken },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      signOptions: { expiresIn: TokenExpiryTimeEnum.refreshToken },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService],
})
export class AuthModule {}
