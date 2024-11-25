import { PrismaClient } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';

import { TrackEntity, UpdateTrackDto, CreateTrackDto } from './track.entity';
import { MessagesEnum } from '../../helpers/enums';
import { PrismaService } from '../../prisma/prisma.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

const prisma = new PrismaClient();

@Injectable()
class TrackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly artist: ArtistService,
    private readonly album: AlbumService,
  ) {}

  async get() {
    return prisma.track.findMany();
  }

  async getById(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(
        MessagesEnum.TrackNotFound.replace('{{id}}', id),
      );
    }

    return track;
  }

  async post(createTrackDto: CreateTrackDto) {
    if (createTrackDto.artistId) {
      const isArtistExist = await this.artist.getById(createTrackDto.artistId);

      if (!isArtistExist) {
        return;
      }
    }

    if (createTrackDto.albumId) {
      const isAlbumExist = await this.album.getById(createTrackDto.albumId);

      if (!isAlbumExist) {
        return;
      }
    }

    const track = new TrackEntity(
      createTrackDto.name,
      createTrackDto.duration,
      createTrackDto.artistId ?? null,
      createTrackDto.albumId ?? null,
    );

    await this.prisma.track.create({
      data: track,
    });

    return track;
  }

  async put(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.getById(id);

    if (!track) {
      return;
    }

    if (updateTrackDto.artistId) {
      const isArtistExist = await this.artist.getById(updateTrackDto.artistId);

      if (!isArtistExist) {
        return;
      }
    }

    if (updateTrackDto.albumId) {
      const isAlbumExist = await this.album.getById(updateTrackDto.albumId);

      if (!isAlbumExist) {
        return;
      }
    }

    return this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
  }

  async delete(id: string) {
    const track = await this.getById(id);

    if (!track) {
      return;
    }

    await this.prisma.track.delete({
      where: { id },
    });
  }
}

export { TrackService };
