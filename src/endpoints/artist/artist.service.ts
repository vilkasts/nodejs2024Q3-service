import { Injectable, NotFoundException } from '@nestjs/common';

import {
  ArtistEntity,
  UpdateArtistDto,
  CreateArtistDto,
} from './artist.entity';
import { MessagesEnum } from '../../helpers/enums';
import database from '../../database/database';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    return this.prisma.artist.findMany();
  }

  async getById(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(
        MessagesEnum.ArtistNotFound.replace('{{id}}', id),
      );
    }

    return artist;
  }

  async post(createArtistDto: CreateArtistDto) {
    const artist = new ArtistEntity(
      createArtistDto.name,
      createArtistDto.grammy,
    );

    await this.prisma.artist.create({
      data: artist,
    });

    return artist;
  }

  async put(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.getById(id);

    if (!artist) {
      return;
    }

    return this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async delete(id: string) {
    const artist = await this.getById(id);

    if (!artist) {
      return;
    }

    await this.prisma.artist.delete({
      where: { id },
    });

    // TODO: add after
    database.tracksData.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    // TODO: add after
    database.favoritesData.artists = database.favoritesData.artists.filter(
      (artist) => artist !== id,
    );
  }
}

export { ArtistService };
