import { Injectable, NotFoundException } from '@nestjs/common';

import { AlbumEntity, CreateAlbumDto, UpdateAlbumDto } from './album.entity';
import { MessagesEnum } from '../../helpers/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArtistService } from '../artist/artist.service';

@Injectable()
class AlbumService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly artist: ArtistService,
  ) {}

  async get() {
    return this.prisma.album.findMany();
  }

  async getById(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(
        MessagesEnum.AlbumNotFound.replace('{{id}}', id),
      );
    }

    return album;
  }

  async post(createAlbumDto: CreateAlbumDto) {
    if (createAlbumDto.artistId) {
      const isArtistExist = await this.artist.getById(createAlbumDto.artistId);

      if (!isArtistExist) {
        return;
      }
    }

    const album = new AlbumEntity(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId ?? null,
    );

    await this.prisma.album.create({
      data: album,
    });

    return album;
  }

  async put(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.getById(id);

    if (!album) {
      return;
    }

    if (updateAlbumDto.artistId) {
      const isArtistExist = await this.artist.getById(updateAlbumDto.artistId);

      if (!isArtistExist) {
        return;
      }
    }

    return this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async delete(id: string) {
    const album = await this.getById(id);

    if (!album) {
      return;
    }

    await this.prisma.album.delete({
      where: { id },
    });

    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });
  }
}

export { AlbumService };
