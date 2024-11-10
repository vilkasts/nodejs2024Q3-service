import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import database from '../database/database';
import {
  ArtistEntity,
  UpdateArtistDto,
  CreateArtistDto,
} from './artist.entity';
import { MessagesEnum } from '../helpers/enums';

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
    if (!createArtistDto.name || typeof createArtistDto.grammy !== 'boolean') {
      throw new BadRequestException(MessagesEnum.NoRequiredFields);
    }

    const isAlreadyExist = database.artistsData.find(
      (artist) => artist.name === createArtistDto.name,
    );

    if (isAlreadyExist) {
      throw new ForbiddenException(MessagesEnum.AlreadyExists);
    }

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
