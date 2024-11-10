import { Injectable, NotFoundException } from '@nestjs/common';

import database from '../database/database';
import { AlbumEntity, UpdateAlbumDto, CreateAlbumDto } from './album.entity';

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
