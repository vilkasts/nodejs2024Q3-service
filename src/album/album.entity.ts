import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { v4 } from 'uuid';

import { PartialType } from '@nestjs/mapped-types';
import { AlbumInterface } from './album.model';

class AlbumEntity implements AlbumInterface {
  constructor(name: string, year: number, artistId: string | null) {
    this.id = v4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  @IsUUID(4)
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}

class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}

class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}

export { CreateAlbumDto, AlbumEntity, UpdateAlbumDto };
