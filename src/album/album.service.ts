import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import database from '../database/database';
import { AlbumEntity, UpdateAlbumDto, CreateAlbumDto } from './album.entity';
import { MessagesEnum } from '../helpers/enums';

@Injectable()
class AlbumService {
  get() {
    return database.albumsData;
  }

  getById(id: string) {
    const album = database.albumsData.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  post(createAlbumDto: CreateAlbumDto) {
    if (!createAlbumDto.name || !createAlbumDto.year) {
      throw new BadRequestException(MessagesEnum.NoRequiredFields);
    }

    const isAlreadyExist = database.albumsData.find(
      (album) => album.name === createAlbumDto.name,
    );

    if (isAlreadyExist) {
      throw new ForbiddenException(MessagesEnum.AlreadyExists);
    }

    const album = new AlbumEntity(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );
    database.albumsData.push(album);

    return album;
  }

  put(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.getById(id);

    Object.assign(album, updateAlbumDto);

    return album;
  }

  delete(id: string) {
    const index = database.albumsData.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    database.albumsData.splice(index, 1);
  }
}

export { AlbumService };
