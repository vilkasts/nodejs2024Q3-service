import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
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
  providers: [AppService],
})
export class AppModule {}
