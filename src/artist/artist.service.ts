import { Injectable, NotFoundException } from '@nestjs/common';

import database from '../database/database';
import {
  ArtistEntity,
  UpdateArtistDto,
  CreateArtistDto,
} from './artist.entity';

@Injectable()
class ArtistService {
  get() {
    return database.artistsData;
  }

  getById(id: string) {
    const artist = database.artistsData.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException();
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
      throw new NotFoundException();
    }

    database.artistsData.splice(index, 1);
  }
}

export { ArtistService };
