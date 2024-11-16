import { Injectable, NotFoundException } from '@nestjs/common';

import { AlbumEntity, UpdateAlbumDto, CreateAlbumDto } from './album.entity';
import { MessagesEnum } from '../../helpers/enums';
import database from '../../database/database';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  get() {
    return this.prisma.album.findMany();
  }

  getById(id: string) {
    const album = database.albumsData.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException(MessagesEnum.NotFound);
    }

    return album;
  }

  post(createAlbumDto: CreateAlbumDto) {
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
      throw new NotFoundException(MessagesEnum.NotFound);
    }

    database.albumsData.splice(index, 1);

    database.tracksData.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    database.favoritesData.albums = database.favoritesData.albums.filter(
      (album) => album !== id,
    );
  }
}

export { AlbumService };
