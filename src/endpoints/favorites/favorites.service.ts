import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { MessagesEnum } from '../../helpers/enums';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }

    const artists = await this.prisma.artist.findMany({
      where: { id: { in: favorites.artists } },
    });
    const albums = await this.prisma.album.findMany({
      where: { id: { in: favorites.albums } },
    });
    const tracks = await this.prisma.track.findMany({
      where: { id: { in: favorites.tracks } },
    });

    return { artists, albums, tracks };
  }

  async postTrack(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new UnprocessableEntityException(MessagesEnum.NotFound);
    }

    const user = await this.prisma.user.findFirst({
      select: { id: true },
    });

    const favorites = await this.prisma.favorites.findFirst({
      where: { userId: user.id },
    });

    if (!favorites) {
      await this.prisma.favorites.create({
        data: {
          userId: user.id,
          tracks: [id],
          albums: [],
          artists: [],
        },
      });
    } else {
      await this.prisma.favorites.update({
        where: { userId: favorites.userId },
        data: {
          tracks: [...favorites.tracks, id],
        },
      });
    }

    return MessagesEnum.SuccessfullyAdded;
  }

  async postArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new UnprocessableEntityException(MessagesEnum.NotFound);
    }

    const user = await this.prisma.user.findFirst({
      select: { id: true },
    });

    const favorites = await this.prisma.favorites.findFirst({
      where: { userId: user.id },
    });

    if (!favorites) {
      await this.prisma.favorites.create({
        data: {
          userId: user.id,
          tracks: [],
          albums: [],
          artists: [id],
        },
      });
    } else {
      await this.prisma.favorites.update({
        where: { userId: favorites.userId },
        data: {
          artists: { push: id },
        },
      });
    }

    return MessagesEnum.SuccessfullyAdded;
  }

  async postAlbum(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new UnprocessableEntityException(MessagesEnum.NotFound);
    }

    const user = await this.prisma.user.findFirst({
      select: { id: true },
    });

    const favorites = await this.prisma.favorites.findFirst({
      where: { userId: user.id },
    });

    if (!favorites) {
      await this.prisma.favorites.create({
        data: {
          userId: user.id,
          tracks: [],
          albums: [id],
          artists: [],
        },
      });
    } else {
      await this.prisma.favorites.update({
        where: { userId: favorites.userId },
        data: {
          albums: { push: id },
        },
      });
    }

    return MessagesEnum.SuccessfullyAdded;
  }

  async deleteTrack(id: string) {
    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites?.tracks.includes(id)) {
      throw new NotFoundException();
    }

    const updatedTracks = favorites.tracks.filter((trackId) => trackId !== id);

    await this.prisma.favorites.update({
      where: { userId: favorites.userId },
      data: { tracks: updatedTracks },
    });
  }

  async deleteArtist(id: string) {
    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites?.artists.includes(id)) {
      throw new NotFoundException();
    }

    const updatedArtists = favorites.artists.filter(
      (artistId) => artistId !== id,
    );

    await this.prisma.favorites.update({
      where: { userId: favorites.userId },
      data: { artists: updatedArtists },
    });
  }

  async deleteAlbum(id: string) {
    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites?.albums.includes(id)) {
      throw new NotFoundException();
    }

    const updatedAlbums = favorites.albums.filter((albumId) => albumId !== id);

    await this.prisma.favorites.update({
      where: { userId: favorites.userId },
      data: { albums: updatedAlbums },
    });
  }
}

export { FavoritesService };
