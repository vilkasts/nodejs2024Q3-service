import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthCheck } from './tools/auth-check/auth-check';
import {
  AlbumModule,
  ArtistModule,
  AuthModule,
  FavoritesModule,
  TrackModule,
  UserModule,
} from './endpoints';

@Module({
  imports: [
    AlbumModule,
    ArtistModule,
    AuthModule,
    FavoritesModule,
    PrismaModule,
    TrackModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthCheck,
    },
  ],
})
export class AppModule {}
