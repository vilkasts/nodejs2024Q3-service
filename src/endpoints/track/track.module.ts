import { Module } from '@nestjs/common';

import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, AlbumService, ArtistService],
})
export class TrackModule {}
