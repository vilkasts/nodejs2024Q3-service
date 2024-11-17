import { Module } from '@nestjs/common';

import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { ArtistService } from '../artist/artist.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, ArtistService],
})
export class AlbumModule {}
