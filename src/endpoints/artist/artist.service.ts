import { Injectable, NotFoundException } from '@nestjs/common';

import {
  ArtistEntity,
  UpdateArtistDto,
  CreateArtistDto,
} from './artist.entity';
import { MessagesEnum } from '../../helpers/enums';
import database from '../../database/database';

@Injectable()
class ArtistService {
  get() {
    return database.artistsData;
  }

  getById(id: string) {
    const artist = database.artistsData.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException(MessagesEnum.NotFound);
    }

    return artist;
  }

  post(createArtistDto: CreateArtistDto) {
    const artist = new ArtistEntity(
      createArtistDto.name,
      createArtistDto.grammy,
    );
    database.artistsData.push(artist);

    return artist;
  }

  put(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.getById(id);

    Object.assign(artist, updateArtistDto);

    return artist;
  }

  delete(id: string) {
    const index = database.artistsData.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new NotFoundException(MessagesEnum.NotFound);
    }

    database.artistsData.splice(index, 1);

    database.tracksData.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    database.albumsData.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    database.favoritesData.artists = database.favoritesData.artists.filter(
      (artist) => artist !== id,
    );
  }
}

export { ArtistService };
