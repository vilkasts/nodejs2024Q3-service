import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import {
  AlbumModule,
  ArtistModule,
  FavoritesModule,
  TrackModule,
  UserModule,
} from './endpoints';

@Module({
  imports: [
    AlbumModule,
    ArtistModule,
    FavoritesModule,
    PrismaModule,
    TrackModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
