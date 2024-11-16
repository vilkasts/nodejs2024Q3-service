import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { MessagesEnum } from '../../helpers/enums';
import database from '../../database/database';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  get() {
    return {
      artists: database.favoritesData.artists
        .filter((id) => database.artistsData.some((artist) => artist.id === id))
        .map((id) => database.artistsData.find((artist) => artist.id === id)),
      albums: database.favoritesData.albums
        .filter((id) => database.albumsData.some((album) => album.id === id))
        .map((id) => database.albumsData.find((album) => album.id === id)),
      tracks: database.favoritesData.tracks
        .filter((id) => database.tracksData.some((track) => track.id === id))
        .map((id) => database.tracksData.find((track) => track.id === id)),
    };
  }

  postTrack(id: string) {
    const track = database.tracksData.find((track) => track.id === id);

    if (!track) {
      throw new UnprocessableEntityException(MessagesEnum.NotFound);
    }

    if (!database.favoritesData.tracks.includes(id)) {
      database.favoritesData.tracks.push(id);
    }

    return MessagesEnum.SuccessfullyAdded;
  }

  postArtist(id: string) {
    const artist = database.artistsData.find((artist) => artist.id === id);

    if (!artist) {
      throw new UnprocessableEntityException(MessagesEnum.NotFound);
    }

    if (!database.favoritesData.artists.includes(id)) {
      database.favoritesData.artists.push(id);
    }

    return MessagesEnum.SuccessfullyAdded;
  }

  postAlbum(id: string) {
    const album = database.albumsData.find((album) => album.id === id);

    if (!album) {
      throw new UnprocessableEntityException(MessagesEnum.NotFound);
    }

    if (!database.favoritesData.albums.includes(id)) {
      database.favoritesData.albums.push(id);
    }

    return MessagesEnum.SuccessfullyAdded;
  }

  deleteTrack(id: string) {
    const index = database.favoritesData.tracks.indexOf(id);

    if (index === -1) {
      throw new NotFoundException();
    }

    database.favoritesData.tracks.splice(index, 1);
  }

  deleteArtist(id: string) {
    const index = database.favoritesData.artists.indexOf(id);

    if (index === -1) {
      throw new NotFoundException();
    }

    database.favoritesData.artists.splice(index, 1);
  }

  deleteAlbum(id: string) {
    const index = database.favoritesData.albums.indexOf(id);

    if (index === -1) {
      throw new NotFoundException();
    }

    database.favoritesData.albums.splice(index, 1);
  }
}

export { FavoritesService };
