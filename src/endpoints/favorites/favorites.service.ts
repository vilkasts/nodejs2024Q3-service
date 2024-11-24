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
    const favoriteArtists = await this.prisma.favoriteArtists.findMany({
      include: { artist: true },
    });
    const favoriteAlbums = await this.prisma.favoriteAlbums.findMany({
      include: { album: true },
    });
    const favoriteTracks = await this.prisma.favoriteTracks.findMany({
      include: { track: true },
    });

    return {
      artists: favoriteArtists.map(
        (favorite: { artist: any }) => favorite.artist,
      ),
      albums: favoriteAlbums.map((favorite: { album: any }) => favorite.album),
      tracks: favoriteTracks.map((favorite: { track: any }) => favorite.track),
    };
  }

  async postTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new UnprocessableEntityException(MessagesEnum.NotFound);
    }

    const existingFavorite = await this.prisma.favoriteTracks.findUnique({
      where: { trackId: id },
    });

    if (existingFavorite) {
      throw new UnprocessableEntityException('@@@@');
    }

    await this.prisma.favoriteTracks.create({
      data: { trackId: id },
    });

    return MessagesEnum.SuccessfullyAdded;
  }

  async postArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new UnprocessableEntityException(MessagesEnum.NotFound);
    }

    const existingFavorite = await this.prisma.favoriteArtists.findUnique({
      where: { artistId: id },
    });

    if (existingFavorite) {
      throw new UnprocessableEntityException('@@@@@@@@@@');
    }

    await this.prisma.favoriteArtists.create({
      data: { artistId: id },
    });

    return MessagesEnum.SuccessfullyAdded;
  }

  async postAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new UnprocessableEntityException(MessagesEnum.NotFound);
    }

    const existingFavorite = await this.prisma.favoriteAlbums.findUnique({
      where: { albumId: id },
    });

    if (existingFavorite) {
      throw new UnprocessableEntityException('@@@@@@@');
    }

    await this.prisma.favoriteAlbums.create({
      data: { albumId: id },
    });

    return MessagesEnum.SuccessfullyAdded;
  }

  async deleteTrack(id: string) {
    const favorite = await this.prisma.favoriteTracks.findUnique({
      where: { trackId: id },
    });

    if (!favorite) {
      throw new NotFoundException(MessagesEnum.NotFound);
    }

    await this.prisma.favoriteTracks.delete({ where: { trackId: id } });
  }

  async deleteArtist(id: string) {
    const favorite = await this.prisma.favoriteArtists.findUnique({
      where: { artistId: id },
    });

    if (!favorite) {
      throw new NotFoundException(MessagesEnum.NotFound);
    }

    await this.prisma.favoriteArtists.delete({ where: { artistId: id } });
  }

  async deleteAlbum(id: string) {
    const favorite = await this.prisma.favoriteAlbums.findUnique({
      where: { albumId: id },
    });

    if (!favorite) {
      throw new NotFoundException(MessagesEnum.NotFound);
    }

    await this.prisma.favoriteAlbums.delete({ where: { albumId: id } });
  }
}

export { FavoritesService };
