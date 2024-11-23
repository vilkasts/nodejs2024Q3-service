import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenExpiryTimeEnum } from '../../helpers/enums';

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
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
